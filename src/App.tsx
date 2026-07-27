// Sazaan Heating & Air - Landing Page Application Root
import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { HeroForm } from "@/components/HeroForm";
import CtaFooter from "@/components/CtaFooter";
import { TapeFooter } from "@/components/ui/footer-taped-design";

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const src = "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0C0C0C] text-white">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-50"
      />
      <div className="fixed inset-0 bg-black/45 z-[1] pointer-events-none" />
      <div className="relative z-10 flex flex-col min-h-screen">
        <HeroForm />
        <CtaFooter />
        <TapeFooter />
      </div>
    </div>
  );
}

export default App;
