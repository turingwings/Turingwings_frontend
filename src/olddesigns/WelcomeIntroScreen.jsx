import React, { useRef, useEffect } from "react";

export default function WelcomeIntroScreen({ onComplete }) {
  const videoRef = useRef(null);

  // New Cloudinary Intro Video URL
  const introVideoUrl = "https://res.cloudinary.com/dihdjq2u4/video/upload/v1784775263/pcloud_552088188_3_202607_1_vrw-20260723105334-2401336-80c94-result_xigktk.mp4";

  useEffect(() => {
    if (videoRef.current) {
      // Set playback speed to 1.25x
      videoRef.current.playbackRate = 1.25;
      videoRef.current.play().catch((err) => {
        console.warn("Autoplay prevented or interrupted:", err);
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        src={introVideoUrl}
        autoPlay
        muted
        playsInline
        onEnded={onComplete}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
