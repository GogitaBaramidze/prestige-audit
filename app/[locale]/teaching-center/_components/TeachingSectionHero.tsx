"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";

export default function TeachingCenterHeroSection() {
  const t = useTranslations("teaching");

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
        className="absolute top-1/4 left-1/4 rounded-full bg-blue-500/30 blur-[100px] pointer-events-none
          w-[500px] h-[500px]
          3xl:w-[680px] 3xl:h-[680px]
          4xl:w-[840px] 4xl:h-[840px]
          5xl:w-[1040px] 5xl:h-[1040px]"
      />
      <div
        className="absolute bottom-0 right-1/4 rounded-full bg-cyan-400/20 blur-[80px] pointer-events-none
          w-[400px] h-[400px]
          3xl:w-[540px] 3xl:h-[540px]
          4xl:w-[680px] 4xl:h-[680px]
          5xl:w-[840px] 5xl:h-[840px]"
      />

      <div
        className="mx-auto relative z-10
        px-6 md:px-5 2xl:px-10 max-w-[2400px]
        3xl:px-12
        4xl:px-16
        5xl:px-20"
      >
        <motion.div
          className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-md text-blue-200 font-bold uppercase tracking-widest
            gap-2 px-4 py-2 text-md md:text-lg mb-8
            3xl:gap-3 3xl:px-6 3xl:py-3 3xl:text-lg 3xl:mb-10
            4xl:gap-3.5 4xl:px-7 4xl:py-3.5 4xl:text-xl 4xl:mb-12
            5xl:gap-4 5xl:px-8 5xl:py-4 5xl:text-2xl 5xl:mb-14"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GraduationCap className="w-3.5 h-3.5 3xl:w-5 3xl:h-5 4xl:w-6 4xl:h-6 5xl:w-7 5xl:h-7" />
          {t("academySectionLabel")}
        </motion.div>
      </div>
    </motion.section>
  );
}
