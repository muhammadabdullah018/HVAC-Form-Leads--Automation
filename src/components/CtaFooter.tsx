// Sazaan Heating & Air - Pre-Footer CTA Section
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Zap } from "lucide-react";
import { siteConfig } from "@/siteConfig";

const CtaFooter = () => {
  const handleScrollToForm = () => {
    const element = document.getElementById("quote-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-24 px-6 md:px-16 lg:px-24 text-center overflow-hidden bg-transparent z-10 font-kanit">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[250px] bg-gradient-to-tr from-purple-900/30 via-pink-600/10 to-amber-500/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative max-w-4xl mx-auto rounded-3xl bg-[#121212]/50 border border-white/10 backdrop-blur-2xl px-8 py-14 md:py-20 flex flex-col items-center shadow-[0_32px_100px_rgba(0,0,0,0.8)]"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 text-xs tracking-widest uppercase font-semibold text-purple-300 backdrop-blur-md">
          <Zap className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
          <span>Next-Gen Climate Control</span>
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-heading italic text-white tracking-tight leading-[0.9] max-w-2xl mx-auto mb-6 drop-shadow-md">
          Atmosphere, <span className="not-italic font-black font-kanit bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">Redefined.</span>
        </h2>

        <p className="text-white/70 font-body font-light text-base md:text-lg max-w-lg mx-auto mb-10 leading-relaxed">
          Precision thermal engineering meets instantaneous dispatch. Upgrade your environment to liquid perfection—quiet, efficient, and relentless.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button 
            onClick={handleScrollToForm}
            className="group relative w-full sm:w-auto overflow-hidden rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
              boxShadow: "0px 4px 15px rgba(181, 1, 167, 0.4), 2px 2px 10px #7721B1 inset",
              outline: "2px solid rgba(255,255,255,0.8)",
              outlineOffset: "-3px",
            }}
          >
            <span className="flex items-center justify-center gap-2">
              Dispatch a Tech Now
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </button>

          <a 
            href={siteConfig.phoneHref}
            className="w-full sm:w-auto rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Call {siteConfig.phoneDisplay}</span>
            <ArrowUpRight className="h-4 w-4 text-white/70" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default CtaFooter;
