"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Info, Users } from "lucide-react";
import { useTranslations } from "next-intl";

function useIsMobile(bp = 768) {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${bp - 1}px)`);
    setM(mq.matches);
    const h = (e: MediaQueryListEvent) => setM(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, [bp]);
  return m;
}

export default function TeamHeroMotion() {
  const isMobile = useIsMobile();
  const t = useTranslations("team");
  if (isMobile) {
    return (
      <section className="relative w-full bg-[#0a1a3f] overflow-hidden text-center pt-40 pb-40 px-5">
        <div
          className="absolute inset-0 z-0 opacity-40 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url('/background.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute top-1/4 left-0 rounded-full bg-blue-500/20 pointer-events-none blur-[80px] w-64 h-64" />
        <div className="relative z-10 mx-auto px-6 max-w-7xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-blue-200 text-md md:text-xl font-bold uppercase tracking-widest animate-fadeInUp">
            <Users size={14} />
            {t("ui.meetTheExperts")}
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      className="relative w-full bg-[#0a1a3f] pt-40 pb-32 md:pb-40 px-5 overflow-hidden text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="absolute inset-0 z-0 opacity-40 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url('/background.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
      />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-400/20 rounded-full blur-[80px] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10 px-6">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2  rounded-full bg-white/10 backdrop-blur-md text-blue-200 text-md md:text-base font-bold uppercase tracking-widest mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Info size={14} /> {t("ui.meetTheExperts")}
        </motion.div>
      </div>
    </motion.section>
  );
}
