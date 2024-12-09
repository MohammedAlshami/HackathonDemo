"use client";

import { ArrowLeft, PersonStanding, Send, Upload } from "lucide-react";
import React, { useRef, useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Tensor, InferenceSession } from "onnxruntime-web";
import clsx from "clsx";

import labels from "@/utils/model-labels.json";
import { downloadBuffer } from "@/utils/model-download";
import { detectImage } from "@/utils/model-detect";
import ImageComponent from "./ImageComponent";
interface DetectionResultProps {
  label: number;
  confidence: number;
  bbox: number[]; // [x, y, width, height]
}

const MODEL_URL = "./model/best.onnx";
const MODEL_URL_2 = "./model/nms-yolov8.onnx";
const MODEL_SHAPES = [1, 3, 640, 640];

const Page = () => {
  const router = useRouter();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [renderedImage, setRenderedImage] = useState<string | null>(null); // State for rendered image
  const [session, setSession] = useState<{
    net: InferenceSession;
    nms: InferenceSession;
  } | null>(null);
  const [detectionResult, setDetectionResult] = useState<
    DetectionResultProps[] | null
  >(null);
  const [cameraOpen, setCameraOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!session) loadModel();
  }, [session]);

  useEffect(() => {
    if (cameraOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [cameraOpen]);

  useEffect(() => {
    if (image && detectionResult && canvasRef.current && containerRef.current) {
      drawDetectionResults(image, detectionResult);
    }
  }, [detectionResult, image]);

  async function loadModel() {
    try {
      const arrBufNet = await downloadBuffer(MODEL_URL);
      const yolov8 = await InferenceSession.create(arrBufNet);

      const arrBufNMS = await downloadBuffer(MODEL_URL_2);
      const nms = await InferenceSession.create(arrBufNMS, {
        executionProviders: ["wasm"],
      });

      const tensor = new Tensor(
        "float32",
        new Float32Array(MODEL_SHAPES.reduce((a, b) => a * b)),
        MODEL_SHAPES
      );
      await yolov8.run({ images: tensor });

      setSession({ net: yolov8, nms });
      console.log("Model loaded successfully");
    } catch (error) {
      console.error("Error loading model:", error);
      alert(`Error loading model: ${error}`);
    }
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      const intervalId = setInterval(async () => {
        if (videoRef.current && canvasRef.current && session) {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");

          if (!ctx) return;

          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;

          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

          const img = new Image();
          img.src = canvas.toDataURL("image/png");
          img.onload = async () => {
            try {
              const results = await detectImage(img, session);
              setDetectionResult(results);
              setImage(img);
            } catch (error) {
              console.error("Error detecting image:", error);
              alert(`Error detecting image: ${error}`);
            }
          };
        }
      }, 1000);

      videoRef.current.dataset.intervalId = String(intervalId);
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert(`Error accessing camera: ${error}`);
      setCameraOpen(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
      videoRef.current.srcObject = null;

      const intervalId = videoRef.current.dataset.intervalId;
      if (intervalId) {
        clearInterval(Number(intervalId));
      }
    }
  };

  const drawDetectionResults = async (
    img: HTMLImageElement | null,
    results: DetectionResultProps[] | null
  ) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const video = videoRef.current;
    const container = containerRef.current;

    if (!ctx || !canvas || !video || !container) return;

    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    let canvasWidth = containerWidth;
    let canvasHeight =
      containerWidth /
      (img
        ? img.naturalWidth / img.naturalHeight
        : video.videoWidth / video.videoHeight);

    if (canvasHeight > containerHeight) {
      canvasHeight = containerHeight;
      canvasWidth =
        containerHeight *
        (img
          ? img.naturalWidth / img.naturalHeight
          : video.videoWidth / video.videoHeight);
    }

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const scaleX = canvasWidth / (img ? img.naturalWidth : video.videoWidth);
    const scaleY = canvasHeight / (img ? img.naturalHeight : video.videoHeight);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the original image
    if (img) {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    } else if (video) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }

    if (results) {
      // First, draw a semi-transparent black overlay on the entire canvas
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Then cut out the detection areas by restoring the original image in those regions
      results.forEach((detection) => {
        const [x, y, width, height] = detection.bbox;

        // Clear the black overlay in the detection box area
        ctx.save();
        ctx.beginPath();
        ctx.rect(x * scaleX, y * scaleY, width * scaleX, height * scaleY);
        ctx.clip();
        ctx.drawImage(
          img || video,
          0,
          0,
          img ? img.naturalWidth : video.videoWidth,
          img ? img.naturalHeight : video.videoHeight,
          0,
          0,
          canvas.width,
          canvas.height
        );
        ctx.restore();

        // Draw bounding box outline
        ctx.beginPath();
        ctx.rect(x * scaleX, y * scaleY, width * scaleX, height * scaleY);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "red";
        ctx.stroke();

        // Draw label text
        const text = `${labels[detection.label]} (${(
          detection.confidence * 100
        ).toFixed(2)}%)`;
        ctx.font = "32px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(text, x * scaleX + 5, y * scaleY - 10);
      });
    }

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/png");
    });

    if (blob) {
      const url = URL.createObjectURL(blob);
      setRenderedImage(url);
    }
  };
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = async () => {
      setImage(img);
      if (session) {
        try {
          const results = await detectImage(img, session);
          setDetectionResult(results);
          console.log("Results:", results);
        } catch (error) {
          console.error("Error detecting image:", error);
          alert(`Error detecting image: ${error}`);
        }
      }
    };
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-teal-700 w-full h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundImage: "url('/loginbg.svg')" }}

    >
      <div
        className={` ${
          renderedImage ? "w-9/12" : "5/12"
        } text-white flex flex-col items-center justify-center gap-12`}
      >
        {!renderedImage && (
          <>
            <img src="/undraw_the_search_s0xf.svg" alt="" className="h-96 " />
            <h2 className="font-bold text-3xl text-center">
              Start Detecting by click the button
            </h2>
          </>
        )}

        {renderedImage && <ImageComponent imageURL={renderedImage} />}
        <div className="flex w-full gap-4">
          <label className="text-xl bg-teal-500 text-white rounded-xl py-2 px-4 flex flex-row-reverse justify-center font-boold items-center gap-2 cursor-pointer z-50 w-full">
            <Upload size={24} />
            <span className="font-bold">Upload</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
          {renderedImage && (
            <label className="text-xl bg-teal-500 text-white rounded-xl py-2 px-4 flex flex-row-reverse justify-center font-boold items-center gap-2 cursor-pointer z-50 w-full">
              <Send size={24} />
              <span className="font-bold">Send</span>
            </label>
          )}
        </div>
      </div>

      <video
        ref={videoRef}
        className="absolute z-0 w-full h-full object-cover hidden"
        playsInline
        muted
      ></video>
      <canvas
        ref={canvasRef}
        className="hidden z-10 pointer-events-none w-full h-full object-cover"
        style={{ objectFit: "cover" }}
      />

      {/* Render the image generated from the canvas */}

      <div
        className="absolute top-4 left-4 z-50 bg-teal-500 p-2 rounded-full flex items-center justify-center cursor-pointer"
        onClick={() => router.back()}
      >
        <ArrowLeft size={24} className="text-white" />
      </div>
    </div>
  );
};

export default Page;
