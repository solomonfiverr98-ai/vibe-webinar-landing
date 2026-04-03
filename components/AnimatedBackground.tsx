"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#0A0A0A]">
      {/* Primary Glow */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] animate-pulse-slow"
        style={{ animationDuration: "15s" }}
      />
      
      {/* Secondary Glow */}
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-[150px] animate-pulse-slow"
        style={{ animationDuration: "20s", animationDelay: "2s" }}
      />

      {/* Accent Glow 1 */}
      <div 
        className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-[#FF0088]/5 blur-[100px] animate-pulse-slow"
        style={{ animationDuration: "18s", animationDelay: "5s" }}
      />

      {/* Accent Glow 2 */}
      <div 
        className="absolute bottom-[20%] left-[10%] w-[35%] h-[35%] rounded-full bg-[#0088FF]/5 blur-[130px] animate-pulse-slow"
        style={{ animationDuration: "22s", animationDelay: "1s" }}
      />

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}
