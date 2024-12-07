"use client";

import { ArrowLeft, Fullscreen, Send } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraOpen, setCameraOpen] = useState<boolean>(false);

  useEffect(() => {
    if (cameraOpen) {
      openCamera();
    } else {
      closeCamera();
    }
    return () => closeCamera(); // Cleanup on unmount
  }, [cameraOpen]);

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Could not access the camera.");
      setCameraOpen(false);
    }
  };

  const closeCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Camera Feed */}
      {cameraOpen && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          playsInline // Prevents fullscreen behavior on mobile
        />
      )}
      {!cameraOpen && (
        <img
          src="/bg.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}

      {/* Back Button */}
      <div
        className="absolute top-4 left-4 z-50 bg-teal-500 p-2 rounded-full flex items-center justify-center cursor-pointer"
        onClick={() => router.back()}
      >
        <ArrowLeft size={24} className="text-white" />
      </div>

      {/* Action Buttons */}
      <div className="border-4 border-teal-500 absolute bottom-4 right-4 z-50 bg-white p-2 rounded-3xl flex items-center justify-center cursor-pointer gap-6">
        <div
          className="bg-teal-500 rounded-xl py-2 px-4 flex gap-2 font-bold text-white"
          onClick={() => setCameraOpen(true)}
        >
          <Fullscreen size={24} />
          <h2>Detect</h2>
        </div>
        <div className="bg-teal-500 rounded-xl py-2 px-4 flex gap-2 font-bold text-white">
          <Send size={24} />
          <h2>Send</h2>
        </div>
      </div>
    </div>
  );
};

export default Page;
