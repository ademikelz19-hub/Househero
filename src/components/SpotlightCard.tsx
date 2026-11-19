'use client';

import React, { useRef, useState, useCallback } from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  enableTilt?: boolean;
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(245, 158, 11, 0.15)',
  enableTilt = true,
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPosition({ x, y });

      if (enableTilt) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        // Subtle tilt limit
        const tiltX = ((y - centerY) / centerY) * -4;
        const tiltY = ((x - centerX) / centerX) * 4;
        setTilt({ x: tiltX, y: tiltY });
      }
    },
    [enableTilt]
  );

  const handleMouseEnter = useCallback(() => {
    setOpacity(1);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: enableTilt
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : undefined,
        transition: 'transform 0.25s cubic-bezier(0.2, 0, 0.2, 1), box-shadow 0.25s ease'
      }}
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
      {...props}
    >
      {/* Spotlight Radial Glow Follower */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 50%)`,
        }}
      />
      {children}
    </div>
  );
}
