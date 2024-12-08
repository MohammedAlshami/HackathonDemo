"use client";

import { ArrowLeft, Upload, Camera } from "lucide-react";
import React, { useRef, useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Tensor, InferenceSession } from "onnxruntime-web";
import clsx from "clsx";

import labels from "@/utils/model-labels.json";
import { downloadBuffer } from "@/utils/model-download";
import { detectImage } from "@/utils/model-detect";

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
  const [session, setSession] = useState<{
    net: InferenceSession;
    nms: InferenceSession;
  } | null>(null);
  const [detectionResult, setDetectionResult] = useState<DetectionResultProps[] | null>(null);
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

      const tensor = new Tensor("float32", new Float32Array(MODEL_SHAPES.reduce((a, b) => a * b)), MODEL_SHAPES);
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

          // Capture the current frame
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
      }, 1000); // Process one frame per second

      // Store the interval ID in the videoRef for cleanup
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

      // Clear the interval if it exists
      const intervalId = videoRef.current.dataset.intervalId;
      if (intervalId) {
        clearInterval(Number(intervalId));
      }
    }
  };

  const drawDetectionResults = (img: HTMLImageElement | null, results: DetectionResultProps[] | null) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const video = videoRef.current;
    const container = containerRef.current;

    if (!ctx || !canvas || !video || !container) return;

    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    let canvasWidth = containerWidth;
    let canvasHeight = containerWidth / (img ? img.naturalWidth / img.naturalHeight : video.videoWidth / video.videoHeight);

    // If canvasHeight exceeds the container, adjust the canvas size to fit
    if (canvasHeight > containerHeight) {
      canvasHeight = containerHeight;
      canvasWidth = containerHeight * (img ? img.naturalWidth / img.naturalHeight : video.videoWidth / video.videoHeight);
    }

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const scaleX = canvasWidth / (img ? img.naturalWidth : video.videoWidth);
    const scaleY = canvasHeight / (img ? img.naturalHeight : video.videoHeight);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (img) {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    } else if (video) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }

    // Draw the detection results if available
    if (results) {
      results.forEach((detection) => {
        const [x, y, width, height] = detection.bbox;

        // Draw semi-transparent background over the detection box
        ctx.globalAlpha = 0.4; // Set transparency to 20%
        ctx.fillStyle = "black";
        ctx.fillRect(x * scaleX, y * scaleY, width * scaleX, height * scaleY);
        ctx.globalAlpha = 1.0; // Reset transparency

        // Draw the bounding box
        ctx.beginPath();
        ctx.rect(x * scaleX, y * scaleY, width * scaleX, height * scaleY);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "red";
        ctx.stroke();

        // Draw text label inside the box
        const text = `${labels[detection.label]} (${(detection.confidence * 100).toFixed(2)}%)`;
        ctx.font = "16px Arial"; // Adjust font size to fit inside the box
        ctx.fillStyle = "white"; // Ensure the text is visible
        ctx.fillText(text, x * scaleX + 5, y * scaleY + 20); // Add padding inside the box
      });
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
    <div ref={containerRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <div className="w-full h-full bg-white"></div>
      <video
        ref={videoRef}
        className="absolute z-0 w-full h-full object-cover hidden"
        playsInline
        muted
      ></video>
      <canvas
        ref={canvasRef}
        className="absolute z-10 pointer-events-none w-full h-full object-cover"
        style={{ objectFit: "cover" }}
      />

      {/* Back Button */}
      <div
        className="absolute top-4 left-4 z-50 bg-teal-500 p-2 rounded-full flex items-center justify-center cursor-pointer"
        onClick={() => router.back()}
      >
        <ArrowLeft size={24} className="text-white" />
      </div>

      {/* Upload Button */}
      <label className="absolute bottom-4 right-4 bg-teal-500 text-white rounded-xl py-2 px-4 flex items-center gap-2 cursor-pointer z-50">
        <Upload size={24} />
        Upload
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />
      </label>
    </div>
  );
};

export default Page;
