import ScrollyCanvas from '@/components/ScrollyCanvas';
import Overlay from '@/components/Overlay';
import SplineSection from '@/components/SplineSection';
import Featured3D from '@/components/Featured3D';
import Next3DSection from '@/components/Next3DSection';
import Ecosystem from '@/components/Ecosystem';
import EcosystemSpline from '@/components/EcosystemSpline';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen text-white relative font-sans selection:bg-white selection:text-black">
      <ScrollyCanvas />
      <Overlay />
      <SplineSection />
      <Featured3D />
      <Next3DSection />
      <Ecosystem />
      <EcosystemSpline />
      <Footer />
    </main>
  );
}
