'use client';

import { motion } from 'framer-motion';

const projects = [
  { id: 1, title: 'Quantum Dynamics', role: 'Frontend & 3D', year: '2025' },
  { id: 2, title: 'Nexus Architecture', role: 'UI/UX Design', year: '2024' },
  { id: 3, title: 'Aura Sync', role: 'Fullstack Dev', year: '2024' },
  { id: 4, title: 'Neon Pulse', role: 'Creative Direction', year: '2023' },
];

export default function Projects() {
  return (
    <section className="min-h-screen bg-[#121212] py-32 px-8 md:px-24 z-20 relative border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">Selected Works</h2>
          <p className="text-xl text-gray-400 font-light">A showcase of recent digital products.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Glassmorphism Background */}
              <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-3xl border border-white/[0.08] transition-colors duration-500 group-hover:bg-white/[0.04] z-10 rounded-2xl"></div>
              
              {/* Content */}
              <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                <div className="flex justify-between items-end mb-4">
                  <h3 className="text-3xl font-semibold text-white/90 group-hover:text-white transition-colors duration-300">
                    {p.title}
                  </h3>
                  <span className="text-sm font-mono text-gray-500">{p.year}</span>
                </div>
                <div className="h-[1px] w-full bg-white/10 mb-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <p className="text-gray-400 font-medium tracking-wide text-sm uppercase">{p.role}</p>
              </div>

              {/* Hover Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-500/20 to-white/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
