'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
});

export default function EcosystemSpline() {
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const currentSection = sectionRef.current;
    if (!currentSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.01,
        rootMargin: '200px 0px 200px 0px', // Load 200px early for a smooth transition
      }
    );

    observer.observe(currentSection);

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="h-screen w-full bg-[#0a0a0a] z-20 relative border-t border-white/[0.05] overflow-hidden">
      {/* Premium Glassmorphic Loading Screen */}
      {!loaded && (
        <div className="absolute inset-0 z-35 flex flex-col items-center justify-center bg-[#0a0a0a] transition-opacity duration-500">
          <div className="relative flex items-center justify-center mb-6">
            {/* Outer Glow Ring */}
            <div className="absolute w-12 h-12 border-2 border-[#92e8ee]/10 rounded-full"></div>
            {/* Spinning Indicator with Cyan glow */}
            <div className="w-12 h-12 border-t-2 border-[#92e8ee] rounded-full animate-spin shadow-[0_0_15px_rgba(146,232,238,0.4)]"></div>
          </div>
          <p className="text-sm text-[#92e8ee] font-mono tracking-widest uppercase animate-pulse">
            Loading Interactive Scene...
          </p>
        </div>
      )}

      {/* Spline Canvas Component */}
      <div className="w-full h-full relative z-20">
        {mounted && isVisible && (
          <Spline 
            scene="https://prod.spline.design/qH9HmJW8Y9UMoeAh/scene.splinecode" 
            onLoad={() => setLoaded(true)}
          />
        )}
      </div>

      {/* Floating CTA Overlay */}
      {loaded && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-start pt-[12vh] md:pt-[15vh] p-6 pointer-events-none select-none text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="space-y-4 max-w-5xl"
          >
            <h2 className="text-4xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-[#e2fafc] to-[#92e8ee] drop-shadow-[0_0_30px_rgba(146,232,238,0.45)] leading-none uppercase">
              LET'S BUILD SOMETHING IMPOSSIBLE.
            </h2>
          </motion.div>
        </div>
      )}
    </section>
  );
}
