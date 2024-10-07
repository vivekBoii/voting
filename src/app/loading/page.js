"use client";
import React, { useEffect } from "react";

const loading = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/";
    }, 15000);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-indigo-900">
      <div className="text-center">
        <video
          className="mx-auto rounded-lg shadow-lg w-[300px] h-[300px]"
          src="https://cdnl.iconscout.com/lottie/premium/preview-watermark/voting-box-12611180-10282448.mp4"
          autoPlay
          loop
          muted
        >
          Your browser does not support the video tag.
        </video>
        <p className="mt-4 text-white text-lg font-semibold shadow-lg">
          Polling Vote ...
        </p>
      </div>
    </div>
  );
};

export default loading;
