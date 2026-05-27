'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track page scroll globally to synchronize with ScrollyCanvas
  const { scrollYProgress } = useScroll();

  // Section 1: Center "ABHISHEK CHOUDHARY" & "STUDENT & ENTREPRENEUR"
  // Map relative coordinates to total global scroll timeline
  // Appears at 10% of Hero scroll (0.05 global). Stays active until Hero end (0.50 global).
  const opacity1 = useTransform(scrollYProgress, [0, 0.04, 0.05, 0.45, 0.50], [0, 0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0.05, 0.15, 0.45], [0, 0, -280]);

  // Section 2: "BUILDING IMPOSSIBLE THINGS"
  // Shows up at 30% of Hero scroll (0.15 global). Disappears by 60% of Hero scroll (0.30 global).
  const opacity2 = useTransform(scrollYProgress, [0.12, 0.15, 0.28, 0.30], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.12, 0.15, 0.28, 0.30], [50, 0, 0, -50]);

  // Section 3: "Experiments. Businesses. Experiences. Systems."
  // Shows up at 70% of Hero scroll (0.35 global). Stays visible until Hero end (0.50 global).
  const opacity3 = useTransform(scrollYProgress, [0.32, 0.35, 0.45, 0.50], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.32, 0.35, 0.45], [80, 0, 0]);

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full h-[500vh] z-10 pointer-events-none">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center px-8 md:px-24">
        
        <motion.div 
          style={{ opacity: opacity1, y: y1 }}
          className="absolute inset-0 flex items-center justify-center text-center"
        >
          <div>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tighter mb-4 text-[#92e8ee]">Abhishek Choudhary</h1>
            <p className="text-xl md:text-2xl font-display font-bold text-[#92e8ee] tracking-wide">Student & Entrepreneur</p>
          </div>
        </motion.div>

        <motion.div 
          style={{ opacity: opacity2, y: y2 }}
          className="absolute left-8 md:left-24 top-1/2 -translate-y-1/2"
        >
          <h2 className="text-4xl md:text-6xl font-display font-extrabold leading-tight text-[#92e8ee]">
            Building <br/>
            impossible things.
          </h2>
        </motion.div>

        <motion.div 
          style={{ opacity: opacity3, y: y3 }}
          className="absolute left-8 md:left-24 top-1/2 -translate-y-1/2"
        >
          <h2 className="text-4xl md:text-6xl font-display font-extrabold leading-tight text-[#92e8ee]">
            Experiments. <br/>
            Businesses. <br/>
            Experiences. <br/>
            Systems.
          </h2>
        </motion.div>

      </div>
    </div>
  );
}
