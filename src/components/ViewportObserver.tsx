'use client';

import React, { useState, useEffect, useRef } from 'react';

interface ViewportObserverProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
}

export default function ViewportObserver({
  children,
  fallback = null,
  threshold = 0.01, // Trigger as soon as 1% is visible
  rootMargin = '150px 0px 150px 0px', // Pre-load 150px before entering viewport for a seamless transition
  className = 'w-full h-full relative',
}: ViewportObserverProps) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(currentContainer);

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, [threshold, rootMargin]);

  return (
    <div ref={containerRef} className={className}>
      {isIntersecting ? children : fallback}
    </div>
  );
}
