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
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const splineAppRef = useRef<any>(null);
  
  // Camera controller state
  const [cameras, setCameras] = useState<any[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>('');
  const [showController, setShowController] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cameraProps, setCameraProps] = useState<CameraProps>({
    posX: 0,
    posY: 0,
    posZ: 0,
    rotX: 0,
    rotY: 0,
    rotZ: 0,
  });

  // Track initial values for resetting
  const initialPropsRef = useRef<{ [name: string]: CameraProps }>({});
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

  const handleLoad = (splineApp: any) => {
    splineAppRef.current = splineApp;
    setLoaded(true);

    // Find all camera-like objects in the scene
    const allObjects = splineApp.getAllObjects();
    const foundCameras = allObjects.filter((o: any) => 
      o.name.toLowerCase().includes('camera') || o.type === 'camera'
    );

    setCameras(foundCameras);

    // Save initial camera values
    foundCameras.forEach((cam: any) => {
      initialPropsRef.current[cam.name] = {
        posX: cam.position.x || 0,
        posY: cam.position.y || 0,
        posZ: cam.position.z || 0,
        rotX: cam.rotation.x || 0,
        rotY: cam.rotation.y || 0,
        rotZ: cam.rotation.z || 0,
      };
    });

    // Default to the first found camera, prioritizing 'personal camera' or 'Play Camera'
    if (foundCameras.length > 0) {
      const defaultCam = foundCameras.find((c: any) => 
        c.name.toLowerCase().includes('personal') || c.name.toLowerCase().includes('play')
      ) || foundCameras[0];
      
      setSelectedCamera(defaultCam.name);
      setCameraProps(initialPropsRef.current[defaultCam.name]);
    }
  };

  const handleCameraChange = (name: string) => {
    setSelectedCamera(name);
    if (splineAppRef.current) {
      const cam = splineAppRef.current.findObjectByName(name);
      if (cam) {
        setCameraProps({
          posX: cam.position.x || 0,
          posY: cam.position.y || 0,
          posZ: cam.position.z || 0,
          rotX: cam.rotation.x || 0,
          rotY: cam.rotation.y || 0,
          rotZ: cam.rotation.z || 0,
        });
      }
    }
  };

  const handlePropChange = (prop: keyof CameraProps, val: number) => {
    setCameraProps((prev) => {
      const next = { ...prev, [prop]: val };
      if (splineAppRef.current && selectedCamera) {
        const cam = splineAppRef.current.findObjectByName(selectedCamera);
        if (cam) {
          switch (prop) {
            case 'posX': cam.position.x = val; break;
            case 'posY': cam.position.y = val; break;
            case 'posZ': cam.position.z = val; break;
            case 'rotX': cam.rotation.x = val; break;
            case 'rotY': cam.rotation.y = val; break;
            case 'rotZ': cam.rotation.z = val; break;
          }
        }
      }
      return next;
    });
  };

  const handleReset = () => {
    if (selectedCamera && initialPropsRef.current[selectedCamera]) {
      const initial = initialPropsRef.current[selectedCamera];
      setCameraProps(initial);
      if (splineAppRef.current) {
        const cam = splineAppRef.current.findObjectByName(selectedCamera);
        if (cam) {
          cam.position.x = initial.posX;
          cam.position.y = initial.posY;
          cam.position.z = initial.posZ;
          cam.rotation.x = initial.rotX;
          cam.rotation.y = initial.rotY;
          cam.rotation.z = initial.rotZ;
        }
      }
    }
  };

  const handleCopyCode = () => {
    const code = `// Apply camera configuration in handleLoad:
const camera = splineApp.findObjectByName('${selectedCamera}');
if (camera) {
  camera.position.x = ${cameraProps.posX};
  camera.position.y = ${cameraProps.posY};
  camera.position.z = ${cameraProps.posZ};
  camera.rotation.x = ${Number(cameraProps.rotX.toFixed(4))};
  camera.rotation.y = ${Number(cameraProps.rotY.toFixed(4))};
  camera.rotation.z = ${Number(cameraProps.rotZ.toFixed(4))};
}`;
    
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section ref={sectionRef} className="min-h-screen w-full bg-[#121212] z-20 relative border-t border-white/[0.05] overflow-visible py-32 px-8 md:px-24">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-65"
        style={{ backgroundImage: "url('/images/my project background.png')" }}
      />

      {/* Premium Glassmorphic Loading Screen */}
      {!loaded && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#121212] transition-opacity duration-500">
          <div className="relative flex items-center justify-center mb-6">
            <div className="absolute w-12 h-12 border-2 border-white/10 rounded-full"></div>
            <div className="w-12 h-12 border-t-2 border-white rounded-full animate-spin"></div>
          </div>
          <p className="text-sm text-gray-400 font-mono tracking-widest uppercase animate-pulse">
            Loading Interactive Space...
          </p>
        </div>
      )}

      {/* Full screen Spline Canvas Component in the background (z-10, fixed/absolute overlay background) */}
      <div className="absolute inset-0 w-full h-full z-10 pointer-events-none md:pointer-events-auto">
        {mounted && isVisible && (
          <Spline 
            scene="https://prod.spline.design/LvUXuCQCFy7lJqIK/scene.splinecode" 
            onLoad={handleLoad}
          />
        )}
      </div>

      {/* Floating showcase grid of projects - Placed AFTER canvas in DOM with higher z-30 z-index */}
      {loaded && (
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
                  {/* Layer 1: Glassmorphic Background Card (z-0, blurs the Spline room behind the card) */}
                  <div className="absolute inset-0 bg-[#121212]/45 backdrop-blur-md border-2 border-white/[0.1] transition-all duration-500 group-hover:bg-[#121212]/55 group-hover:border-[#92e8ee]/40 z-0 rounded-2xl shadow-xl"></div>
                  
                  {/* Layer 2: Looping Video Background if present (z-10, in front of the blur so it's super crisp!) */}
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

                  {/* Layer 2: Image Background if present (z-10, in front of the blur so it's super crisp!) */}
                  {p.image && !p.video && (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover z-10 opacity-40 group-hover:opacity-85 transition-opacity duration-500 rounded-2xl"
                    />
                  )}

                  {/* Layer 3: Dark Vignette Gradient Overlay (z-15, ensures perfect contrast for white text on bright media) */}
                  {(p.video || p.image) && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5 z-15 rounded-2xl transition-opacity duration-500 group-hover:opacity-90"></div>
                  )}
                  
                  {/* Layer 4: Content & Typography (z-20) */}
                  <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                    <div className="flex justify-between items-end mb-4">
                      <h3 className="text-2xl md:text-3xl font-display font-bold text-white/95 group-hover:text-[#92e8ee] transition-colors duration-300">
                        {p.title}
                      </h3>
                    </div>
                    <div className="h-[1px] w-full bg-white/10 mb-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    <p className="text-gray-400 font-medium tracking-wide text-xs uppercase">{p.role}</p>
                  </div>

                  {/* Hover Glow (z-neg-10) */}
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
      )}

      {/* Controller Toggle Button */}
      {loaded && (
        <button
          onClick={() => setShowController(!showController)}
          className={`absolute top-8 right-8 z-40 p-3 rounded-full border transition-all duration-300 shadow-lg ${
            showController 
              ? 'bg-[#92e8ee] border-[#92e8ee] text-black scale-110 shadow-[#92e8ee]/20' 
              : 'bg-black/40 border-white/10 text-white hover:border-[#92e8ee] hover:text-[#92e8ee]'
          }`}
          title="Customize Camera Position"
        >
          {showController ? <FiX size={20} /> : <FiSliders size={20} />}
        </button>
      )}

      {/* Interactive Camera Controller Panel */}
      {loaded && showController && (
        <div className="absolute top-24 right-8 z-40 w-80 md:w-96 bg-black/75 backdrop-blur-xl border border-white/10 rounded-2xl p-5 md:p-6 shadow-2xl text-white flex flex-col max-h-[80vh] overflow-y-auto animate-fade-in">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
            <FiCamera className="text-[#92e8ee]" size={18} />
            <h4 className="font-display font-semibold tracking-wide text-sm uppercase">
              Camera Tuning Panel
            </h4>
          </div>

          {/* Camera Selection */}
          <div className="space-y-1 mb-4">
            <label className="text-xs font-mono text-gray-400 uppercase tracking-wider block">
              Active Camera Object
            </label>
            <select
              value={selectedCamera}
              onChange={(e) => handleCameraChange(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#92e8ee] transition-colors"
            >
              {cameras.map((cam) => (
                <option key={cam.name} value={cam.name} className="bg-[#121212] text-white">
                  {cam.name} ({cam.type})
                </option>
              ))}
            </select>
          </div>

          {/* Sliders Container */}
          <div className="space-y-4 flex-1">
            {/* Position X */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-gray-400">
                <span>Position X</span>
                <span className="text-white font-medium">{cameraProps.posX.toFixed(0)}</span>
              </div>
              <input
                type="range"
                min="-2000"
                max="2000"
                step="1"
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#92e8ee]"
                value={cameraProps.posX}
                onChange={(e) => handlePropChange('posX', parseFloat(e.target.value))}
              />
            </div>

            {/* Position Y */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-gray-400">
                <span>Position Y</span>
                <span className="text-white font-medium">{cameraProps.posY.toFixed(0)}</span>
              </div>
              <input
                type="range"
                min="-2000"
                max="2000"
                step="1"
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#92e8ee]"
                value={cameraProps.posY}
                onChange={(e) => handlePropChange('posY', parseFloat(e.target.value))}
              />
            </div>

            {/* Position Z */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-gray-400">
                <span>Position Z</span>
                <span className="text-white font-medium">{cameraProps.posZ.toFixed(0)}</span>
              </div>
              <input
                type="range"
                min="-2000"
                max="2000"
                step="1"
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#92e8ee]"
                value={cameraProps.posZ}
                onChange={(e) => handlePropChange('posZ', parseFloat(e.target.value))}
              />
            </div>

            {/* Rotation X */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-gray-400">
                <span>Rotation X (Tilt)</span>
                <span className="text-white font-medium">
                  {cameraProps.rotX.toFixed(2)} rad ({(cameraProps.rotX * 180 / Math.PI).toFixed(0)}°)
                </span>
              </div>
              <input
                type="range"
                min="-3.14"
                max="3.14"
                step="0.01"
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#92e8ee]"
                value={cameraProps.rotX}
                onChange={(e) => handlePropChange('rotX', parseFloat(e.target.value))}
              />
            </div>

            {/* Rotation Y */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-gray-400">
                <span>Rotation Y (Pan)</span>
                <span className="text-white font-medium">
                  {cameraProps.rotY.toFixed(2)} rad ({(cameraProps.rotY * 180 / Math.PI).toFixed(0)}°)
                </span>
              </div>
              <input
                type="range"
                min="-3.14"
                max="3.14"
                step="0.01"
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#92e8ee]"
                value={cameraProps.rotY}
                onChange={(e) => handlePropChange('rotY', parseFloat(e.target.value))}
              />
            </div>

            {/* Rotation Z */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-gray-400">
                <span>Rotation Z (Roll)</span>
                <span className="text-white font-medium">
                  {cameraProps.rotZ.toFixed(2)} rad ({(cameraProps.rotZ * 180 / Math.PI).toFixed(0)}°)
                </span>
              </div>
              <input
                type="range"
                min="-3.14"
                max="3.14"
                step="0.01"
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#92e8ee]"
                value={cameraProps.rotZ}
                onChange={(e) => handlePropChange('rotZ', parseFloat(e.target.value))}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6 pt-4 border-t border-white/10">
            <button
              onClick={handleReset}
              className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-2.5 px-4 rounded-xl text-xs font-semibold font-mono tracking-wider transition-colors uppercase"
            >
              <FiRefreshCw size={13} />
              Reset
            </button>
            <button
              onClick={handleCopyCode}
              className="flex-1 flex items-center justify-center gap-2 bg-[#92e8ee] hover:bg-[#92e8ee]/90 text-black py-2.5 px-4 rounded-xl text-xs font-semibold font-mono tracking-wider transition-all uppercase shadow-md shadow-[#92e8ee]/10"
            >
              {copied ? <FiCheck size={14} /> : <FiCopy size={13} />}
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
