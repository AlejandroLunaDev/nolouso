import React from 'react';

export default function Hero() {
  return (
    <div className="relative w-full h-[70dvh] overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/herovideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 flex justify-center items-center w-full h-full">
        <h1 className="text-white text-4xl font-bold">Hero</h1>
      </div>
    </div>
  );
}
