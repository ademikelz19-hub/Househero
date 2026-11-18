'use client';

import React, { useState, useRef, useCallback } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'BEFORE',
  afterLabel = 'AFTER',
  className = ''
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let position = (x / rect.width) * 100;
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    setSliderPosition(position);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden rounded-3xl shadow-xl shadow-amber-500/10 cursor-ew-resize aspect-video border border-amber-200/60 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
    >
      {/* After Image (Full background) */}
      <img
        src={afterImage}
        alt="After project completion"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <div className="absolute top-4 right-4 bg-emerald-600/90 backdrop-blur-md text-white font-extrabold text-[11px] tracking-wider px-3.5 py-1 rounded-full shadow-md z-10 border border-emerald-400/50">
        {afterLabel}
      </div>

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt="Before project treatment"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none max-w-none"
          style={{
            width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%',
            height: '100%'
          }}
        />
        <div className="absolute top-4 left-4 bg-stone-900/90 backdrop-blur-md text-amber-400 font-extrabold text-[11px] tracking-wider px-3.5 py-1 rounded-full shadow-md z-10 border border-amber-400/50">
          {beforeLabel}
        </div>
      </div>

      {/* Vertical Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl pointer-events-none"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      >
        {/* Handle pill in golden white */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-9 h-9 rounded-full bg-white text-amber-600 shadow-xl shadow-amber-500/30 flex items-center justify-center font-bold text-xs border-2 border-amber-400">
          ↔
        </div>
      </div>
    </div>
  );
}
