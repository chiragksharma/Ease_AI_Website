"use client";

import { Parallax } from "react-scroll-parallax";
import React, { useState } from "react";

const silverBorder = {
  border: "1px solid #6B7280", // Slate-600 color
  borderRadius: "15px",
  boxShadow: "0 0 0 1px #6B7280", // Slate-600 color border shadow
};

const videoFrameStyle = {
  borderRadius: "15px",
  boxShadow: "0 0 0 1px #6B7280", // Slate-600 color border shadow
};

export default function parallaxComponent() {
  return (
    <Parallax scale={[0.8, 1]}>
      <div className="h-full w-full rounded-lg border" style={silverBorder}>
        <video
          className="h-full w-full"
          src="/Easeai_Demo.mp4"
          style={videoFrameStyle}
          muted
          loop
          autoPlay
          playsInline
        ></video>
      </div>
    </Parallax>
  );
}
