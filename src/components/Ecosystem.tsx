'use client';

import { motion } from 'framer-motion';

export default function Ecosystem() {
  return (
    <section id="ecosystem" className="h-[145vh] w-full relative overflow-hidden border-t border-white/[0.05] bg-[#0a0a0a] scroll-mt-12">
      {/* Neon Blinking Outline Animation Style */}
      <style>{`
        @keyframes neonFlicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            border-color: rgba(146, 232, 238, 0.95);
            box-shadow: 
              0 0 10px rgba(146, 232, 238, 0.7), 
              0 0 20px rgba(146, 232, 238, 0.4),
              inset 0 0 8px rgba(146, 232, 238, 0.4);
          }
          20%, 24%, 55% {
            border-color: rgba(146, 232, 238, 0.25);
            box-shadow: 
              0 0 2px rgba(146, 232, 238, 0.1), 
              0 0 4px rgba(146, 232, 238, 0.05),
              inset 0 0 2px rgba(146, 232, 238, 0.1);
          }
        }
        .neon-blink-outline {
          animation: neonFlicker 3s linear infinite;
        }
      `}</style>

      {/* ABCH Industries Logo Top-Left Floating Container */}
      <div className="absolute top-8 md:top-24 left-4 md:left-12 z-30 pointer-events-auto">
        <a 
          href="https://abchindustries.com/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="neon-blink-outline border-2 border-[#92e8ee] bg-black/75 backdrop-blur-md px-3 py-1.5 md:px-5 md:py-2.5 rounded-xl md:rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(146,232,238,0.4)] hover:shadow-[0_0_25px_rgba(146,232,238,0.65)] hover:border-white transition-all duration-300 block"
        >
          <img 
            src="/images/abch_logo.png" 
            className="h-6 md:h-12 w-auto object-contain select-none filter brightness-105" 
            alt="ABCH Industries Logo" 
          />
        </a>
      </div>

      {/* Ecosystem Section Title Top-Right Floating Container */}
      <div className="absolute top-9 md:top-[6.5rem] right-4 md:right-12 z-30 pointer-events-auto">
        <h2 className="text-sm md:text-5xl font-display font-extrabold tracking-widest text-[#92e8ee] uppercase leading-none select-none drop-shadow-[0_0_15px_rgba(146,232,238,0.35)]">
          THE ABCH ECOSYSTEM
        </h2>
      </div>

      {/* Static Background Images (Vertical columns stacked horizontally on mobile, stacked landscape rows on desktop) */}
      <div className="absolute inset-0 z-0 flex flex-col md:flex-col w-full h-full pointer-events-none select-none">
        <div className="flex flex-col md:flex-col w-full h-full">
          <img src="/images/media__1779729566251.jpg" className="w-full h-[20%] md:h-[20%] object-cover" alt="Ecosystem Panel 1" />
          <img src="/images/media__1779729573570.jpg" className="w-full h-[20%] md:h-[20%] object-cover" alt="Ecosystem Panel 2" />
          <img src="/images/media__1779729577301.jpg" className="w-full h-[20%] md:h-[20%] object-cover" alt="Ecosystem Panel 3" />
          <img src="/images/media__1779729580815.jpg" className="w-full h-[20%] md:h-[20%] object-cover" alt="Ecosystem Panel 4" />
          <img src="/images/ecosystem_bg_5.jpg" className="w-full h-[20%] md:h-[20%] object-cover" alt="Ecosystem Panel 5" />
        </div>
      </div>

      {/* 4-Sector Stack (Each horizontal block left-aligned and styled with expanded +2 size) */}
      <div className="absolute inset-0 z-20 flex flex-col w-full h-full pt-16 md:pt-28 pb-4 md:pb-8 px-4 md:px-12 pointer-events-none">
        <div className="grid grid-rows-5 h-full w-full gap-2 md:gap-6 pointer-events-none select-text text-left max-w-[95vw] md:max-w-[90vw] mx-auto ml-0 md:pl-12 lg:pl-16">
          
          {/* Row 1: Empty Spacer (Dedicated to ABCH Logo & Title) */}
          <div className="w-full h-full"></div>
          
          {/* Sector 1 Row: Marvion Technologies (Aligned with Background Row 2) */}
          <div className="flex items-center justify-start w-full h-full">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#0a0a0a]/85 backdrop-blur-xl border border-white/[0.12] p-4 md:p-8 lg:p-10 rounded-xl md:rounded-2xl flex flex-row gap-3 md:gap-8 lg:gap-10 items-center shadow-2xl hover:border-[#92e8ee]/40 transition-all duration-300 pointer-events-auto w-full md:max-w-[60vw] lg:max-w-[65vw]"
            >
              <a 
                href="https://www.marvion.xyz/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-shrink-0 w-12 h-12 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-xl md:rounded-2xl overflow-hidden border border-[#92e8ee]/30 shadow-[0_0_15px_rgba(146,232,238,0.25)] bg-[#050505] flex items-center justify-center p-1 md:p-2.5 hover:scale-105 hover:border-[#92e8ee]/70 transition-all duration-300 block"
              >
                <img 
                  src="/images/marvion_tech.png" 
                  className="w-full h-full object-contain rounded-lg md:rounded-xl select-none" 
                  alt="Marvion Technologies Link" 
                />
              </a>
              <div className="space-y-1">
                <a 
                  href="https://abchindustries.com/marvion-technologies-an-industrial-innovation" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block group"
                >
                  <h3 className="text-sm md:text-2xl lg:text-3xl font-display font-bold text-[#92e8ee] tracking-wide leading-snug group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(146,232,238,0.6)] transition-all duration-300">
                    🤖 Marvion Technologies
                  </h3>
                </a>
                <p className="text-[10px] md:text-base lg:text-lg text-white/85 font-sans font-light leading-relaxed line-clamp-3 md:line-clamp-none">
                  The innovation arm of ABCH Industries, focused on AI-driven automation systems designed to improve operational efficiency across industries.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Sector 2 Row: Global Trade (Aligned with Background Row 3) */}
          <div className="flex items-center justify-start w-full h-full">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#0a0a0a]/85 backdrop-blur-xl border border-white/[0.12] p-4 md:p-8 lg:p-10 rounded-xl md:rounded-2xl flex flex-row gap-3 md:gap-8 lg:gap-10 items-center shadow-2xl hover:border-[#92e8ee]/40 transition-all duration-300 pointer-events-auto w-full md:max-w-[60vw] lg:max-w-[65vw]"
            >
              <a 
                href="https://abchindustries.com/global-trade-division" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-shrink-0 w-12 h-12 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-xl md:rounded-2xl overflow-hidden border border-[#92e8ee]/30 shadow-[0_0_15px_rgba(146,232,238,0.25)] bg-[#050505] hover:scale-105 hover:border-[#92e8ee]/70 transition-all duration-300 block"
              >
                <img 
                  src="/images/global_trade.jpg" 
                  className="w-full h-full object-cover select-none rounded-lg md:rounded-xl" 
                  alt="Global Trade" 
                />
              </a>
              <div className="space-y-1">
                <a 
                  href="https://abchindustries.com/global-trade-division" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block group"
                >
                  <h3 className="text-sm md:text-2xl lg:text-3xl font-display font-bold text-[#92e8ee] tracking-wide leading-snug group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(146,232,238,0.6)] transition-all duration-300">
                    🌍 Global Trade
                  </h3>
                </a>
                <p className="text-[10px] md:text-base lg:text-lg text-white/85 font-sans font-light leading-relaxed line-clamp-3 md:line-clamp-none">
                  Structured import and export operations connecting Indian and international markets through reliable sourcing and distribution systems.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Sector 3 Row: Manufacturing (Aligned with Background Row 4) */}
          <div className="flex items-center justify-start w-full h-full">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#0a0a0a]/85 backdrop-blur-xl border border-white/[0.12] p-4 md:p-8 lg:p-10 rounded-xl md:rounded-2xl flex flex-row gap-3 md:gap-8 lg:gap-10 items-center shadow-2xl hover:border-[#92e8ee]/40 transition-all duration-300 pointer-events-auto w-full md:max-w-[60vw] lg:max-w-[65vw]"
            >
              <a 
                href="https://abchindustries.com/manufacturing-division" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-shrink-0 w-12 h-12 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-xl md:rounded-2xl overflow-hidden border border-[#92e8ee]/30 shadow-[0_0_15px_rgba(146,232,238,0.25)] bg-[#050505] hover:scale-105 hover:border-[#92e8ee]/70 transition-all duration-300 block"
              >
                <img 
                  src="/images/manufacturing.png" 
                  className="w-full h-full object-cover select-none rounded-lg md:rounded-xl" 
                  alt="Manufacturing" 
                />
              </a>
              <div className="space-y-1">
                <a 
                  href="https://abchindustries.com/manufacturing-division" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block group"
                >
                  <h3 className="text-sm md:text-2xl lg:text-3xl font-display font-bold text-[#92e8ee] tracking-wide leading-snug group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(146,232,238,0.6)] transition-all duration-300">
                    🎨 Manufacturing
                  </h3>
                </a>
                <p className="text-[10px] md:text-base lg:text-lg text-white/85 font-sans font-light leading-relaxed line-clamp-3 md:line-clamp-none">
                  Artisan-driven production networks delivering high-quality handcrafted goods for domestic and global markets.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Sector 4 Row: Energy & Commodities (Aligned with Background Row 5) */}
          <div className="flex items-center justify-start w-full h-full">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#0a0a0a]/85 backdrop-blur-xl border border-white/[0.12] p-4 md:p-8 lg:p-10 rounded-xl md:rounded-2xl flex flex-row gap-3 md:gap-8 lg:gap-10 items-center shadow-2xl hover:border-[#92e8ee]/40 transition-all duration-300 pointer-events-auto w-full md:max-w-[60vw] lg:max-w-[65vw]"
            >
              <a 
                href="https://abchindustries.com/coal-supply-and-energy-commodities-division" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-shrink-0 w-12 h-12 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-xl md:rounded-2xl overflow-hidden border border-[#92e8ee]/30 shadow-[0_0_15px_rgba(146,232,238,0.25)] bg-[#050505] hover:scale-105 hover:border-[#92e8ee]/70 transition-all duration-300 block"
              >
                <img 
                  src="/images/energy_commodities.jpg" 
                  className="w-full h-full object-cover select-none rounded-lg md:rounded-xl" 
                  alt="Energy & Commodities" 
                />
              </a>
              <div className="space-y-1">
                <a 
                  href="https://abchindustries.com/coal-supply-and-energy-commodities-division" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block group"
                >
                  <h3 className="text-sm md:text-2xl lg:text-3xl font-display font-bold text-[#92e8ee] tracking-wide leading-snug group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(146,232,238,0.6)] transition-all duration-300">
                    ⚡ Energy & Commodities
                  </h3>
                </a>
                <p className="text-[10px] md:text-base lg:text-lg text-white/85 font-sans font-light leading-relaxed line-clamp-3 md:line-clamp-none">
                  Bulk energy supply and coal trading supported by structured procurement and logistics systems.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
