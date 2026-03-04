"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function VideoSection() {
  const t = useTranslations("main");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    setIsTouch(!window.matchMedia("(hover: hover)").matches);

    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative bg-[#f3f5f4] py-16 md:py-24 overflow-hidden">
      <div className="max-w-[2000px] mx-auto px-0 md:px-16 lg:px-20 2xl:px-32 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
          {/* Left: Video */}
          <motion.div
            className="w-full lg:w-[55%]"
            initial={{ opacity: 0, y: isTouch ? 20 : 0, x: isTouch ? 0 : -40 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className="relative md:rounded-[2.5rem] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.08)] border-y md:border-3 border-white">
              <div className="absolute -inset-4 bg-blue-600/5 rounded-[3rem] blur-2xl -z-10 hidden md:block" />
              <video
                ref={videoRef}
                src="/Video.mp4"
                poster="/Video.png"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover aspect-video md:aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            className="w-full lg:w-[45%] flex flex-col justify-center px-6 sm:px-10 md:px-0"
            initial={{ opacity: 0, y: isTouch ? 20 : 0, x: isTouch ? 0 : 40 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.12 }}
          >
            <div className="flex items-end gap-4 mb-6">
              {/* Large number — no animation on bg-clip-text, just fade in */}
              <motion.span
                className="text-7xl md:text-8xl lg:text-[9rem] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-500 select-none tracking-tighter"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.22 }}
              >
                25
              </motion.span>
              <div className="mb-4 md:mb-6">
                <p className="text-blue-700 mb-1 text-[11px] font-extrabold uppercase tracking-[0.2em]">
                  {t("videoSectionYearsLabel")}
                </p>
                <p className="text-slate-900 text-base md:text-lg font-bold">
                  {t("videoSectionExcellence")}
                </p>
              </div>
            </div>

            <div className="w-16 h-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 mb-8" />

            <motion.h2
              className="text-slate-900 mb-6 text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.28 }}
            >
              {t("videoSectionHeading1")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-bold italic">
                {t("videoSectionHeadingHighlight")}
              </span>{" "}
              {t("videoSectionHeading2")}
            </motion.h2>

            <motion.p
              className="text-slate-600 mb-10 max-w-md text-base leading-relaxed font-medium"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.36 }}
            >
              {t("videoSectionBody")}
            </motion.p>

            <div className="flex gap-10 md:gap-12">
              {[
                { value: "videoStat1Value", label: "videoStat1Label" },
                { value: "videoStat2Value", label: "videoStat2Label" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.42 + i * 0.09 }}
                >
                  <span className="text-slate-900 text-2xl md:text-3xl font-bold">
                    {t(stat.value)}
                  </span>
                  <span className="text-slate-500 mt-1 text-[11px] font-extrabold uppercase tracking-widest">
                    {t(stat.label)}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
