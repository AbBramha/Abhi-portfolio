'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

const frameCount = 152;

const currentFrame = (index: number) => 
  `/sequence/frame_${index.toString().padStart(3, '0')}.gif`;

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          // Initial draw
          if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx && loadedImages[0]) {
              drawImageCover(ctx, loadedImages[0]);
            }
          }
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
    
    // Resize handler
    const handleResize = () => {
      if (canvasRef.current && loadedImages[0]) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          // Re-draw current frame
          const currentIdx = Math.min(
            frameCount - 1,
            Math.max(0, Math.floor(scrollYProgress.get() * frameCount))
          );
          drawImageCover(ctx, loadedImages[currentIdx] || loadedImages[0]);
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial size
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update canvas on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (images.length !== frameCount || !canvasRef.current) return;
    
    const frameIndex = Math.min(
      frameCount - 1,
      Math.max(0, Math.floor(latest * frameCount))
    );
    
    requestAnimationFrame(() => {
      const ctx = canvasRef.current!.getContext('2d');
      if (ctx && images[frameIndex]) {
        drawImageCover(ctx, images[frameIndex]);
      }
    });
  });

  // Helper for object-fit: cover logic
  const drawImageCover = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
    const canvas = ctx.canvas;
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0, 0, img.width, img.height,
      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
    );
  };

  return (
    <div ref={containerRef} className="h-[500vh] w-full relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas 
          ref={canvasRef} 
          className="absolute top-0 left-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-[#121212]/20 z-0 mix-blend-multiply"></div> 
      </div>
    </div>
  );
}
