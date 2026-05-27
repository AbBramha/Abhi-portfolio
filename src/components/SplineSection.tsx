'use client';

import { motion } from 'framer-motion';

export default function SplineSection() {
  return (
    <section id="about-me" className="h-screen w-full bg-[#121212] z-20 relative border-t border-white/[0.05] overflow-hidden scroll-mt-12">
      {/* Background Video */}
      <video
        src="/videos/About me.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none filter brightness-90"
      />

      {/* Floating About Me overlay */}
      <div className="absolute inset-0 z-20 flex items-center justify-center p-4 md:p-12 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl w-full max-h-[85vh] overflow-y-auto md:overflow-visible bg-[#121212]/35 backdrop-blur-md border-2 border-white/[0.15] p-5 md:p-12 rounded-3xl pointer-events-auto shadow-2xl space-y-6 md:space-y-8 select-text"
        >
          {/* Headline */}
          <div>
            <h2 className="text-2xl md:text-6xl font-display font-extrabold tracking-widest text-[#92e8ee] uppercase leading-none">
              BEYOND THE INTERFACE
            </h2>
          </div>

          {/* Core Narrative */}
          <div className="space-y-4 md:space-y-6 text-sm md:text-lg text-white font-sans font-light leading-relaxed">
            <p className="text-base md:text-3xl font-light text-white/90 leading-snug">
              I don't see <span className="text-[#92e8ee] font-semibold">business</span>, <span className="text-[#92e8ee] font-semibold">AI</span> and <span className="text-[#92e8ee] font-semibold">creativity</span> as separate worlds.
            </p>

            {/* Tools Callout */}
            <div className="py-2 md:py-3 border-l-2 border-[#92e8ee] pl-3 md:pl-4 my-3 md:my-4">
              <span className="text-xl md:text-4xl font-display font-extrabold text-[#92e8ee] block mb-1 md:mb-2 tracking-wider">
                I SEE TOOLS.
              </span>
              <div className="space-y-1 font-mono text-xs md:text-lg text-white">
                <div><span className="text-[#92e8ee] font-bold">→</span> Ways to build.</div>
                <div><span className="text-[#92e8ee] font-bold">→</span> Ways to experiment.</div>
                <div><span className="text-[#92e8ee] font-bold">→</span> Ways to turn ideas into systems.</div>
              </div>
            </div>

            <p className="text-sm md:text-lg text-white">
              Most of my work starts with curiosity:
            </p>

            {/* Pull Quote */}
            <blockquote className="text-base md:text-2xl italic text-[#92e8ee] font-medium font-display tracking-wide bg-white/[0.01] border border-white/[0.04] px-3 py-2 md:px-4 md:py-3 rounded-xl w-fit my-3 md:my-4">
              "What happens if this is built differently?"
            </blockquote>

            <p className="text-xs md:text-lg text-white">
              That question has taken me across industries — from businesses to AI products, cinematic experiences and systems designed to solve problems or create entirely new ones.
            </p>

            <p className="text-white/95 font-medium pt-1 md:pt-2 text-sm md:text-2xl">
              I build because I'm curious about what becomes possible when <span className="text-[#92e8ee] font-bold underline decoration-2 underline-offset-4">worlds collide</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
