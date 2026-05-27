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

export default function Featured3D() {
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
    <section ref={sectionRef} className="h-screen w-full bg-[#121212] z-20 relative border-t border-white/[0.05] overflow-hidden">
      {/* Background Image Layer (Primary static background) */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-100"
        style={{ 
          backgroundImage: "url('/images/my pholosophy background.png')"
        }}
      />

      {/* Floating Principles overlay */}
      <div className="absolute inset-0 z-30 flex items-center justify-center p-4 md:p-12 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl w-full max-h-[85vh] overflow-y-auto md:overflow-visible bg-[#121212]/45 backdrop-blur-md border-2 border-white/[0.15] p-5 md:p-12 rounded-3xl pointer-events-auto shadow-2xl space-y-6 md:space-y-8 select-text text-left"
        >
          {/* Headline */}
          <div>
            <h2 className="text-2xl md:text-6xl font-display font-extrabold tracking-widest text-[#92e8ee] uppercase leading-none">
              PRINCIPLES I BUILD BY
            </h2>
          </div>

          {/* Core Narrative */}
          <div className="space-y-4 md:space-y-6 text-sm md:text-lg text-white font-sans font-light leading-relaxed">
            
            {/* Principle 1 */}
            <p className="text-base md:text-3xl font-light text-white/90 leading-snug">
              I don't believe <span className="text-[#92e8ee] font-semibold">industries</span> should stay separate.
            </p>

            {/* Principle 1 Detail - Styled like the Quote box in About Me */}
            <div className="py-2 md:py-3 border-l-2 border-[#92e8ee] pl-3 md:pl-4 my-3 md:my-4">
              <span className="text-sm md:text-2xl italic text-[#92e8ee] font-medium font-display tracking-wide block">
                "The interesting things happen where business, AI and creativity collide."
              </span>
            </div>

            {/* Principle 2 - Styled like the Tools list in About Me */}
            <div className="py-2 md:py-3 border-l-2 border-white/20 pl-3 md:pl-4 my-3 md:my-4 font-mono text-xs md:text-lg text-white">
              <div className="flex items-start gap-2">
                <span className="text-[#92e8ee] font-bold">→</span>
                <span>
                  Technology is only valuable if it expands what <span className="text-[#92e8ee] font-semibold underline decoration-2 underline-offset-4">humans can imagine</span>.
                </span>
              </div>
            </div>

            {/* Principle 3 - Concluding strong highlight matching About Me */}
            <p className="text-white/95 font-medium pt-1 md:pt-2 text-sm md:text-2xl leading-snug">
              The future belongs to people willing to <span className="text-[#92e8ee] font-bold underline decoration-2 underline-offset-4">experiment before they feel ready</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
