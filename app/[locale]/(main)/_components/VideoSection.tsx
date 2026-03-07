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
    <section
      className="relative bg-[#f3f5f4] overflow-hidden
      py-16 md:py-24
      3xl:py-28
      4xl:py-32
      5xl:py-40"
    >
      <div className="relative z-10 mx-auto px-0 md:px-16 lg:px-20 2xl:px-32 3xl:px-44 4xl:px-56 5xl:px-72 max-w-[2000px] 3xl:max-w-[2200px]">
        <div
          className="flex flex-col lg:flex-row items-center
          gap-10 lg:gap-20
          3xl:gap-24
          4xl:gap-28
          5xl:gap-36"
        >
          <motion.div
            className="w-full lg:w-[55%]"
            initial={{ opacity: 0, y: isTouch ? 20 : 0, x: isTouch ? 0 : -40 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div
              className="relative overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.08)] border-y md:border-3 border-white
              md:rounded-[2.5rem]
              3xl:rounded-[3rem]
              4xl:rounded-[3.5rem]
              5xl:rounded-[4rem]"
            >
              <div
                className="absolute -inset-4 bg-blue-600/5 blur-2xl -z-10 hidden md:block
                rounded-[3rem]
                3xl:rounded-[3.5rem]
                4xl:rounded-[4rem]
                5xl:rounded-[4.5rem]"
              />
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

          <motion.div
            className="w-full lg:w-[45%] flex flex-col justify-center px-6 sm:px-10 md:px-0"
            initial={{ opacity: 0, y: isTouch ? 20 : 0, x: isTouch ? 0 : 40 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.12 }}
          >
            <div
              className="flex items-end gap-4 3xl:gap-5 4xl:gap-6 5xl:gap-7
              mb-6 3xl:mb-7 4xl:mb-8 5xl:mb-10"
            >
              <motion.span
                className="font-bold leading-none text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-500 select-none tracking-tighter
                  text-7xl md:text-8xl lg:text-[9rem]
                  3xl:text-[11rem]
                  4xl:text-[13rem]
                  5xl:text-[15rem]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.22 }}
              >
                25
              </motion.span>
              <div className="mb-4 md:mb-6 3xl:mb-8 4xl:mb-10 5xl:mb-12">
                <p
                  className="text-blue-700 font-extrabold uppercase tracking-[0.2em] mb-1
                  text-[11px]
                  3xl:text-sm
                  4xl:text-base
                  5xl:text-lg"
                >
                  {t("videoSectionYearsLabel")}
                </p>
                <p
                  className="text-slate-900 font-bold
                  text-base md:text-lg
                  3xl:text-xl
                  4xl:text-2xl
                  5xl:text-3xl"
                >
                  {t("videoSectionExcellence")}
                </p>
              </div>
            </div>

            <div
              className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-500
              w-16 h-1.5
              3xl:w-20 3xl:h-2
              4xl:w-24 4xl:h-2
              5xl:w-28 5xl:h-2.5
              mb-8 3xl:mb-10 4xl:mb-12 5xl:mb-14"
            />

            <motion.h2
              className="text-slate-900 font-bold mx-2 my-2 leading-12 tracking-tight
                mb-6 3xl:mb-7 4xl:mb-8 5xl:mb-10
                text-2xl md:text-3xl lg:text-4xl
                3xl:text-5xl
                4xl:text-6xl
                5xl:text-7xl"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.28 }}
            >
              {t("videoSectionHeading1")}{" "}
              <span className="   text-blue mx-2  ">
                {t("videoSectionHeadingHighlight")}
              </span>{" "}
              {t("videoSectionHeading2")}
            </motion.h2>

            <motion.p
              className="text-slate-600 font-medium leading-relaxed
                mb-10 3xl:mb-12 4xl:mb-14 5xl:mb-16
                text-base max-w-md
                3xl:text-lg 3xl:max-w-lg
                4xl:text-xl 4xl:max-w-xl
                5xl:text-2xl 5xl:max-w-2xl"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.36 }}
            >
              {t("videoSectionBody")}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
