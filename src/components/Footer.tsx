'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="h-[55vh] md:h-[50vh] w-full relative overflow-hidden bg-[#0a0a0a] border-t border-white/[0.05]">
      {/* Background Video */}
      <video 
        src="/videos/footer.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none filter brightness-95"
      />

      {/* Clear dark tint overlay without blur for pristine video visibility */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Footer Content */}
      <div className="relative z-20 w-full h-full max-w-[95vw] mx-auto flex flex-col justify-between pt-12 pb-8 px-4 md:px-8 lg:px-12 select-text text-left">
        
        {/* Upper Layout: Brand, Centerpiece, and Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 items-start w-full pt-4">
          
          {/* LEFT: Branded Logo (Top Left) & Navigation underneath */}
          <div className="flex flex-col items-start space-y-4 md:space-y-8 pl-0 md:-ml-4 lg:-ml-8">
            {/* Bigger Logo Container with Link */}
            <a 
              href="https://abchindustries.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="border-2 border-[#92e8ee]/40 bg-black/70 backdrop-blur-md px-3 py-1.5 md:px-5 md:py-2.5 rounded-xl md:rounded-2xl shadow-[0_0_15px_rgba(146,232,238,0.25)] hover:shadow-[0_0_25px_rgba(146,232,238,0.55)] hover:border-white transition-all duration-300 flex items-center justify-center hover:scale-105 block"
            >
              <img 
                src="/images/abch_logo.png" 
                className="h-6 md:h-12 w-auto object-contain filter brightness-105 select-none" 
                alt="ABCH Industries Logo Link" 
              />
            </a>
            
            {/* Expanded Navigate Section */}
            <div className="space-y-2 md:space-y-4">
              <h4 className="text-xs md:text-base lg:text-lg font-mono tracking-widest text-[#92e8ee] uppercase font-bold">
                Navigate
              </h4>
              <ul className="flex flex-row md:flex-col gap-4 md:gap-3 text-xs md:text-base lg:text-lg text-white/70 font-sans font-light">
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">Home</a>
                </li>
                <li>
                  <a href="#ecosystem" className="hover:text-white transition-colors duration-200">Ecosystem</a>
                </li>
                <li>
                  <a href="#about-me" className="hover:text-white transition-colors duration-200">About Me</a>
                </li>
              </ul>
            </div>
          </div>

          {/* CENTRE: Huge Title & Subtitle in One Line */}
          <div className="flex flex-col items-center justify-center text-center space-y-1 md:space-y-2 md:mt-8">
            <h2 className="text-3xl md:text-7xl lg:text-8xl font-display font-black tracking-widest text-[#92e8ee] drop-shadow-[0_0_25px_rgba(146,232,238,0.35)] leading-none select-none whitespace-nowrap">
              THE END
            </h2>
            <p className="text-[10px] md:text-sm text-white/80 font-sans tracking-wide italic">
              Or maybe just the beginning.
            </p>
          </div>

          {/* RIGHT: Social links list */}
          <div className="flex flex-row flex-wrap md:flex-col md:items-end justify-start gap-3 md:gap-4 font-mono text-[10px] md:text-sm tracking-widest uppercase md:text-right pr-0 md:-mr-4 lg:-mr-8">
            <span className="w-full text-xs md:text-base lg:text-lg text-[#92e8ee]/60 tracking-[0.2em] font-bold block mb-1 md:text-right">
              CONNECT
            </span>
            <a href="https://www.linkedin.com/in/-abhishek-choudhary" target="_blank" rel="noopener noreferrer" className="text-xs md:text-base lg:text-lg text-white/70 hover:text-[#92e8ee] hover:drop-shadow-[0_0_8px_rgba(146,232,238,0.5)] transition-all duration-200">
              LinkedIn
            </a>
            <a href="https://x.com/Abhishe35011609" target="_blank" rel="noopener noreferrer" className="text-xs md:text-base lg:text-lg text-white/70 hover:text-[#92e8ee] hover:drop-shadow-[0_0_8px_rgba(146,232,238,0.5)] transition-all duration-200">
              X
            </a>
            <a href="https://www.threads.net/@ab.ch.nerd" target="_blank" rel="noopener noreferrer" className="text-xs md:text-base lg:text-lg text-white/70 hover:text-[#92e8ee] hover:drop-shadow-[0_0_8px_rgba(146,232,238,0.5)] transition-all duration-200">
              Threads
            </a>
            <a href="https://wa.me/message/KXY2F45NPC22L1" target="_blank" rel="noopener noreferrer" className="text-xs md:text-base lg:text-lg text-white/70 hover:text-[#92e8ee] hover:drop-shadow-[0_0_8px_rgba(146,232,238,0.5)] transition-all duration-200">
              WhatsApp
            </a>
            <a href="mailto:admin@abchindustries.com" className="text-xs md:text-base lg:text-lg text-white/70 hover:text-[#92e8ee] hover:drop-shadow-[0_0_8px_rgba(146,232,238,0.5)] transition-all duration-200 normal-case">
              admin@abchindustries.com
            </a>
            <a href="mailto:abchofficial@gmail.com" className="text-xs md:text-base lg:text-lg text-white/70 hover:text-[#92e8ee] hover:drop-shadow-[0_0_8px_rgba(146,232,238,0.5)] transition-all duration-200 normal-case">
              abchofficial@gmail.com
            </a>
          </div>

        </div>

        {/* Lower Layout: Copyright, Tagline, and Signature shifted to the bottom-right */}
        <div className="border-t border-white/[0.08] pt-4 md:pt-6 flex flex-col md:flex-row justify-between items-center md:items-end gap-4 md:gap-6 w-full select-text">
          {/* Left branding */}
          <div className="text-left font-mono text-[10px] text-white/45 pb-1">
            ABCH Industries Ecosystem
          </div>

          {/* Right aligned copyright block & signature */}
          <div className="flex flex-col items-center md:items-end space-y-2 md:space-y-4 pr-0 md:-mr-4 lg:-mr-8">
            {/* Enlarged copyright and tagline block */}
            <div className="flex flex-col items-center md:items-end space-y-1.5">
              <div className="text-sm md:text-base lg:text-lg font-mono font-bold uppercase tracking-widest text-[#92e8ee] drop-shadow-[0_0_8px_rgba(146,232,238,0.2)]">
                © 2026 ABCH
              </div>
              <div className="text-[10px] md:text-sm font-sans font-light italic text-white/70">
                Building across worlds.
              </div>
            </div>
            
            {/* Designer Signature Bar */}
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/45 pt-1.5 border-t border-white/[0.05] w-full md:w-auto justify-center md:justify-end">
              <span>Designed with curiosity</span>
              <span className="text-[#92e8ee] animate-pulse">●</span>
              <span>Abhishek Choudhary</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
