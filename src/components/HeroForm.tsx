// Sazaan Heating & Air - Centered Hero Lead Form Section
import { motion } from "framer-motion";
import { LeadForm } from "@/components/LeadForm";
import { siteConfig } from "@/siteConfig";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function HeroForm() {
  const moonIconUrl = "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png";
  const smileyIconUrl = "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png";
  const legoIconUrl = "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png";
  const cursorIconUrl = "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png";

  return (
    <section id="quote-form" className="relative min-h-screen bg-transparent flex flex-col items-center justify-center py-20 px-5 sm:px-8 md:px-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -80, y: 0 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.1, duration: 0.9, ease: EASE }}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-0 select-none pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        >
          <img
            src={moonIconUrl}
            alt="Moon Icon"
            className="w-[100px] sm:w-[130px] md:w-[170px] h-auto object-contain opacity-90 drop-shadow-[0_10px_30px_rgba(30,136,168,0.2)]"
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 80, y: 0 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.15, duration: 0.9, ease: EASE }}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-0 select-none pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 10, 0], rotate: [0, -5, 5, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        >
          <img
            src={legoIconUrl}
            alt="Lego Icon"
            className="w-[100px] sm:w-[130px] md:w-[170px] h-auto object-contain opacity-90 drop-shadow-[0_10px_30px_rgba(182,0,168,0.2)]"
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -80, y: 0 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.25, duration: 0.9, ease: EASE }}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-0 select-none pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [0, -4, 4, 0] }}
          transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
        >
          <img
            src={smileyIconUrl}
            alt="Smiley Icon"
            className="w-[90px] sm:w-[120px] md:w-[150px] h-auto object-contain opacity-90 drop-shadow-[0_10px_30px_rgba(182,0,168,0.2)]"
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 80, y: 0 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.3, duration: 0.9, ease: EASE }}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-0 select-none pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 8, 0], rotate: [0, 4, -4, 0] }}
          transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }}
        >
          <img
            src={cursorIconUrl}
            alt="Cursor Icon"
            className="w-[100px] sm:w-[130px] md:w-[170px] h-auto object-contain opacity-90 drop-shadow-[0_10px_30px_rgba(30,136,168,0.2)]"
          />
        </motion.div>
      </motion.div>

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
          className="text-xs font-bold uppercase tracking-[0.25em] text-white/50 mb-3 font-kanit"
        >
          {siteConfig.brandName}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: EASE }}
          className="hero-heading font-kanit font-black uppercase text-center tracking-tight leading-none mb-8 select-none"
          style={{ fontSize: "clamp(2.5rem, 8vw, 90px)" }}
        >
          Comfort Control
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: EASE }}
          className="w-full"
        >
          <LeadForm />
        </motion.div>
      </div>
    </section>
  );
}
