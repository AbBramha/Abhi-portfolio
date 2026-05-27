'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { FiSliders, FiCamera, FiCopy, FiCheck, FiX, FiRefreshCw } from 'react-icons/fi';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
});

interface CameraProps {
  posX: number;
  posY: number;
  posZ: number;
  rotX: number;
  rotY: number;
  rotZ: number;
}

const projects = [
  { id: 1, title: 'FLYPRO Website', role: 'Frontend & 3D Development', video: '/videos/FLYPRO final site view.mp4', link: 'https://flypro-ten.vercel.app/' },
  { id: 2, title: 'Luxury Restaurant', role: 'Creative Direction & Design', video: '/videos/luxury restarant video 1.mp4', link: 'https://luxury-restaurant-gold.vercel.app/' },
  { id: 3, title: 'Futuristic Real Estate', role: 'Fullstack & Interactive Systems', video: '/videos/futuristic real estate 2.mp4', link: 'https://futuristic-real-estate.vercel.app/' },
  { id: 4, title: 'AI Waiter', role: 'Interactive Dining Assistant', image: '/images/Spline - Brave 25-05-2026 22_12_33.png', link: 'https://app.marvion.tech/webhook/8ac7f8d2-d6c0-4b79-a0ac-66fb2c921dc3/chat' },
  { id: 5, title: '3D Walkthrough', role: 'Real Estate', video: '/videos/Apartment catalogue.mp4' },
  { id: 6, title: 'Voice Calling Agent', role: 'AI voice calling agent', image: '/images/Spline - Brave 25-05-2026 22_12_33.png' },
];

export default function Next3DSection() {
  return (
    <section className="min-h-screen w-full bg-[#121212] z-20 relative border-t border-white/[0.05] overflow-visible py-32 px-8 md:px-24">
      {/* Background Image Layer (Primary static background) */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-100"
        style={{ backgroundImage: "url('/images/my project background.png')" }}
      />

      {/* Floating showcase grid of projects */}
      <div className="max-w-7xl mx-auto w-full relative z-30 select-text text-left pointer-events-none">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 pointer-events-auto"
        >
          <h2 className="text-4xl md:text-6xl font-display font-extrabold tracking-widest text-[#92e8ee] uppercase leading-none mb-4">
            WORKS I'VE BUILT
          </h2>
          <p className="text-xl text-gray-400 font-light font-sans leading-relaxed">
            A showcase of recent digital products, interactive designs, and systems.
          </p>
        </motion.div>

        {/* Grid of Projects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((p, i) => {
            const cardContent = (
              <div className="h-full w-full relative">
                {/* Layer 1: Glassmorphic Background Card */}
                <div className="absolute inset-0 bg-[#121212]/45 backdrop-blur-md border-2 border-white/[0.1] transition-all duration-500 group-hover:bg-[#121212]/55 group-hover:border-[#92e8ee]/40 z-0 rounded-2xl shadow-xl"></div>
                
                {/* Layer 2: Looping Video Background if present */}
                {p.video && (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-10 opacity-40 group-hover:opacity-85 transition-opacity duration-500 rounded-2xl"
                  >
                    <source src={p.video} type="video/mp4" />
                  </video>
                )}

                {/* Layer 2: Image Background if present */}
                {p.image && !p.video && (
                  <img
                    src={p.image}
                    alt={p.title}
                    className="absolute inset-0 w-full h-full object-cover z-10 opacity-40 group-hover:opacity-85 transition-opacity duration-500 rounded-2xl"
                  />
                )}

                {/* Layer 3: Dark Vignette Gradient Overlay */}
                {(p.video || p.image) && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5 z-15 rounded-2xl transition-opacity duration-500 group-hover:opacity-90"></div>
                )}
                
                {/* Layer 4: Content & Typography */}
                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                  <div className="flex justify-between items-end mb-4">
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white/95 group-hover:text-[#92e8ee] transition-colors duration-300">
                      {p.title}
                    </h3>
                  </div>
                  <div className="h-[1px] w-full bg-white/10 mb-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  <p className="text-gray-400 font-medium tracking-wide text-xs uppercase">{p.role}</p>
                </div>

                {/* Hover Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#92e8ee]/25 to-white/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 rounded-2xl"></div>
              </div>
            );

            return p.link ? (
              <motion.a 
                key={p.id}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative h-[350px] rounded-2xl overflow-hidden cursor-pointer pointer-events-auto shadow-2xl block"
              >
                {cardContent}
              </motion.a>
            ) : (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative h-[350px] rounded-2xl overflow-hidden cursor-default pointer-events-auto shadow-2xl block"
              >
                {cardContent}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
