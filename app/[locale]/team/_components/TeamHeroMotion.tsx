"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

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

export default function TeamHeroMotion({ badgeLabel }: { badgeLabel: string }) {
  const isMobile = useIsMobile();

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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-blue-200 text-xs font-bold uppercase tracking-widest animate-fadeInUp">
            <Users size={14} />
            {badgeLabel}
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      className="relative w-full bg-[#0a1a3f] overflow-hidden text-center
        pt-40 pb-32 px-5
        3xl:pt-48 3xl:pb-48
        4xl:pt-56 4xl:pb-56
        5xl:pt-64 5xl:pb-64"
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
        w-[500px] h-[500px]
        3xl:w-[620px] 3xl:h-[620px]
        4xl:w-[720px] 4xl:h-[720px]
        5xl:w-[880px] 5xl:h-[880px]"
      />
      <div
        className="absolute bottom-0 right-1/4 rounded-full bg-cyan-400/20 pointer-events-none blur-[80px]
        w-[400px] h-[400px]
        3xl:w-[500px] 3xl:h-[500px]
        4xl:w-[600px] 4xl:h-[600px]
        5xl:w-[720px] 5xl:h-[720px]"
      />

      <div className="relative z-10 mx-auto px-6 3xl:px-10 4xl:px-14 5xl:px-20 max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[1800px] 5xl:max-w-[2100px]">
        <motion.div
          className="inline-flex items-center backdrop-blur-md bg-white/10 text-blue-200 font-bold uppercase tracking-widest rounded-full
            gap-2 px-4 py-2 text-sm md:text-base mb-8
            3xl:gap-3 3xl:px-6 3xl:py-3 3xl:text-lg 3xl:mb-10
            4xl:gap-3.5 4xl:px-7 4xl:py-3.5 4xl:text-xl 4xl:mb-12
            5xl:gap-4 5xl:px-8 5xl:py-4 5xl:text-2xl 5xl:mb-14"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Users className="w-3.5 h-3.5 3xl:w-4 3xl:h-4 4xl:w-5 4xl:h-5 5xl:w-6 5xl:h-6" />
          {badgeLabel}
        </motion.div>
      </div>
    </motion.section>
  );
}
