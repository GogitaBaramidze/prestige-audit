"use client";

import { useRef } from "react";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

export default function AboutParallax() {
  const t = useTranslations("main");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgYMotion = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  // On mobile we pass a static value — no scroll tracking cost
  const bgY = isDesktop ? bgYMotion : "0%";

  const stats = [
    { value: t("aboutStat1Value"), label: t("aboutStat1Label") },
    { value: t("aboutStat2Value"), label: t("aboutStat2Label") },
    { value: t("aboutStat3Value"), label: t("aboutStat3Label") },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#f3f5f4]"
    >
      <div className="absolute top-0 left-0 w-full h-20 z-20 pointer-events-none">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <polygon points="0,0 1440,0 1440,0 720,80 0,0" fill="#f3f5f4" />
        </svg>
      </div>

      <div className="relative overflow-hidden bg-[#f3f5f4] min-h-[600px] md:min-h-[800px]">
        <motion.div
          style={{
            y: bgY,
            backgroundImage: `url('/bg1.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            contain: "strict",
          }}
          className="absolute inset-[-12%] will-change-transform"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-900/35 to-slate-950/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />

        <div className="relative z-10 flex items-center min-h-[600px] md:min-h-[800px] py-28 md:py-36">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-24 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="text-white">
                <motion.div
                  {...fadeUp(0)}
                  className="flex items-center gap-3 mb-5"
                >
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="text-blue-300 text-sm font-medium tracking-widest uppercase">
                    {t("aboutLabel")}
                  </span>
                  <span className="flex-1 max-w-[60px] h-px bg-blue-400/40" />
                </motion.div>

                <motion.h2
                  {...fadeUp(0.12)}
                  className="mb-7 text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
                >
                  {t("aboutHeadingRegular")}{" "}
                  <span className="italic text-blue-300">
                    {t("aboutHeadingItalic")}
                  </span>{" "}
                  {t("aboutHeadingSuffix")}
                </motion.h2>

                <motion.p
                  {...fadeUp(0.22)}
                  className="text-white/70 mb-10 max-w-[480px] text-base md:text-lg leading-relaxed"
                >
                  {t("aboutBody")}
                </motion.p>

                <motion.div {...fadeUp(0.32)}>
                  <a
                    href="/about"
                    className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full px-8 py-4 md:px-12 md:py-5 text-white text-base font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 shadow-lg shadow-blue-600/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-1 active:scale-95"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10">{t("aboutCta")}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 27.7 18"
                      className="relative z-10 w-5 h-3.5 fill-current transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path d="M12.1,18V10.6H0V7.4H12.1V0L27.7,9Z" />
                    </svg>
                  </a>
                </motion.div>
              </div>

              <div className="hidden lg:flex justify-center">
                <div className="relative group">
                  <div
                    className="relative px-12 py-14 border border-white/20 rounded-sm bg-white/[0.07] shadow-2xl shadow-black/50 overflow-hidden"
                    style={{
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 z-20 pointer-events-none"
                      style={{ background: "rgba(10,26,63,0.9)" }}
                      initial={{ opacity: 1 }}
                      whileInView={{ opacity: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: 0.18,
                        ease: "easeOut" as const,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                    <div className="flex justify-center mb-8">
                      <Image
                        src="/PrestigeLogo.png"
                        alt="Prestige Audit Logo"
                        width={200}
                        height={60}
                        style={{ objectFit: "contain" }}
                        priority
                      />
                    </div>

                    <div className="flex items-center gap-3 my-5 justify-center">
                      <span className="h-px w-12 bg-blue-400/30" />
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      <span className="h-px w-12 bg-blue-400/30" />
                    </div>

                    <div className="text-center text-white/60 mb-10 text-sm tracking-wide">
                      {t("aboutLocation")}
                    </div>

                    <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                      {stats.map((stat, i) => (
                        <motion.div
                          key={stat.label}
                          className="text-center"
                          initial={{ opacity: 0, y: 14 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.4,
                            delay: 0.3 + i * 0.1,
                            ease: "easeOut" as const,
                          }}
                        >
                          <div className="text-blue-300 mb-1 text-2xl font-bold">
                            {stat.value}
                          </div>
                          <div className="text-white/40 text-xs uppercase tracking-wider">
                            {stat.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-20 z-20 pointer-events-none">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <polygon points="0,80 720,0 1440,80 1440,80 0,80" fill="#f3f5f4" />
        </svg>
      </div>
    </section>
  );
}
