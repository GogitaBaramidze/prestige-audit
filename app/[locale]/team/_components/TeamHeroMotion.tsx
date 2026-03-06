"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-blue-200 text-xl md:text-xl font-bold uppercase tracking-widest animate-fadeInUp">
            <Users size={14} />
            {t("ui.meetTheExperts")}
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      className="relative w-full bg-[#0a1a3f] overflow-hidden text-center
           pt-40 pb-32 px-5
        3xl:pt-52 3xl:pb-40
        4xl:pt-64 4xl:pb-58
        5xl:pt-80 5xl:pb-72"
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
      <div
        className="absolute top-1/4 left-1/4 rounded-full bg-blue-500/30 pointer-events-none blur-[100px]
        w-[420px] h-[420px]
        3xl:w-[560px] 3xl:h-[560px]
        4xl:w-[720px] 4xl:h-[720px]
        5xl:w-[880px] 5xl:h-[880px]"
      />
      <div
        className="absolute bottom-0 right-1/4 rounded-full bg-cyan-400/20 pointer-events-none blur-[80px]
        w-[340px] h-[340px]
        3xl:w-[460px] 3xl:h-[460px]
        4xl:w-[600px] 4xl:h-[600px]
        5xl:w-[720px] 5xl:h-[720px]"
      />

      <div className="relative z-10 mx-auto px-6 3xl:px-10 4xl:px-14 5xl:px-20 max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[1800px] 5xl:max-w-[2100px]">
        <motion.div
          className="inline-flex items-center backdrop-blur-md bg-white/10 text-blue-200 text-md md:text-base font-bold uppercase tracking-widest rounded-full
            gap-2 px-4 py-2  mb-7
            3xl:gap-2.5 3xl:px-5 3xl:py-2.5 3xl:text-base 3xl:mb-9
            4xl:gap-3.5 4xl:px-7 4xl:py-3.5 4xl:text-xl 4xl:mb-12
            5xl:gap-4 5xl:px-8 5xl:py-4 5xl:text-2xl 5xl:mb-14"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Users className="w-3 h-3 3xl:w-3.5 3xl:h-3.5 4xl:w-5 4xl:h-5 5xl:w-6 5xl:h-6" />
          {t("ui.meetTheExperts")}
        </motion.div>
      </div>
    </motion.section>
  );
}
