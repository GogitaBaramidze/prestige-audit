"use client";

import { useState, useEffect, JSX } from "react";
import { useTranslations } from "next-intl";

/**
 * Breakpoint scale (matches globals.css):
 *  3xl → 1440px+
 *  4xl → 1600px+
 *  5xl → 1920px+
 */

const SLIDES = ["/bg2.jpg", "/b3.jpg", "/b4.jpg"];

export default function HeroSection(): JSX.Element {
  const t = useTranslations("main");
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((p) => {
        setPrev(p);
        return (p + 1) % SLIDES.length;
      });
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-[#F3F5F4]">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .slide-in  { animation: fadeIn 0.9s ease-in-out forwards; }
        .slide-out { animation: fadeIn 0.9s ease-in-out reverse forwards; }
        .anim-1 { animation: slideUp 0.5s ease-out 0.10s both; }
        .anim-2 { animation: slideUp 0.5s ease-out 0.25s both; }
        .anim-3 { animation: slideUp 0.5s ease-out 0.45s both; }
      `}</style>

      {/* ── Background slideshow ── */}
      <div className="absolute inset-0 z-0">
        {prev !== null && (
          <div
            key={`prev-${prev}`}
            className="absolute inset-0 slide-out"
            style={{
              backgroundImage: `url("${SLIDES[prev]}")`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="absolute inset-0 bg-black/60" />
          </div>
        )}
        <div
          key={`curr-${current}`}
          className="absolute inset-0 slide-in"
          style={{
            backgroundImage: `url("${SLIDES[current]}")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
      </div>

      {/* ── Content ──
          Horizontal padding:  px-6  sm:px-10  md:px-16  lg:px-20  2xl:px-32  3xl:px-44  4xl:px-56  5xl:px-72
          Vertical padding:    py-16 sm:py-20  md:py-24  lg:py-32  xl:py-40   3xl:py-52  4xl:py-60  5xl:py-72
      */}
      <div
        className="relative z-20 w-full max-w-[2400px] mx-auto
        px-6 sm:px-10 md:px-16 lg:px-20 2xl:px-32 3xl:px-44 4xl:px-56 5xl:px-72
        py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40 3xl:py-52 4xl:py-60 5xl:py-72"
      >
        {/* ── Stack spacing:  gap-10 → 3xl:20 → 4xl:24 → 5xl:32 ── */}
        <div className="space-y-10 md:space-y-12 lg:space-y-16 3xl:space-y-20 4xl:space-y-24 5xl:space-y-32">
          {/* Brand label */}
          <div className="anim-1 flex items-center gap-3 3xl:gap-4 4xl:gap-5 5xl:gap-7">
            <div className="flex items-center">
              <div className="rounded-full bg-white w-1 h-1 3xl:w-1.5 3xl:h-1.5 4xl:w-2 4xl:h-2 5xl:w-2.5 5xl:h-2.5" />
              <div className="bg-white/40 h-px w-8 md:w-10 3xl:w-14 4xl:w-18 5xl:w-24" />
            </div>
            <span
              className="text-white font-medium tracking-widest uppercase
              text-sm 3xl:text-base 4xl:text-lg 5xl:text-2xl"
            >
              {t("heroBrand")}
            </span>
            <div className="flex items-center">
              <div className="bg-white/40 h-px w-8 md:w-10 3xl:w-14 4xl:w-18 5xl:w-24" />
              <div className="rounded-full bg-white w-1 h-1 3xl:w-1.5 3xl:h-1.5 4xl:w-2 4xl:h-2 5xl:w-2.5 5xl:h-2.5" />
            </div>
          </div>

          {/* Headline
              text: 3xl → 4xl → 5xl → 6xl → 3xl:7xl → 4xl:8xl → 5xl:9xl
          */}
          <h1
            className="anim-2 text-white font-normal leading-snug tracking-widest
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl
            3xl:text-7xl
            4xl:text-8xl
            5xl:text-9xl"
          >
            <span className="block">{t("heroTitleLine1")}</span>
            <span className="block text-blue-400 font-semibold">
              {t("heroTitleHighlight")}
            </span>
            <span className="block">{t("heroTitleLine2")}</span>
          </h1>

          {/* CTA button
              padding:  px-9 py-5  →  md:px-12 py-6  →  3xl:px-14 py-7  →  4xl:px-16 py-8  →  5xl:px-20 py-10
              text:     base  →  3xl:lg  →  4xl:xl  →  5xl:2xl
              gap:      gap-4  →  3xl:gap-5  →  4xl:gap-6  →  5xl:gap-7
          */}
          <div className="anim-3">
            <a
              href="/contact"
              className="group relative inline-flex items-center overflow-hidden rounded-full text-white font-semibold
                bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700
                shadow-lg shadow-blue-600/30
                transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-1 active:scale-95
                gap-4 px-9 py-5 text-base
                md:px-12 md:py-6
                3xl:gap-5 3xl:px-14 3xl:py-7 3xl:text-lg
                4xl:gap-6 4xl:px-16 4xl:py-8 4xl:text-xl
                5xl:gap-7 5xl:px-20 5xl:py-10 5xl:text-2xl"
            >
              {/* Shimmer */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span className="relative z-10">{t("heroCta")}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 27.7 18"
                className="relative z-10 fill-current transition-transform duration-300 group-hover:translate-x-1
                  w-5 h-3.5
                  3xl:w-6 3xl:h-4
                  4xl:w-7 4xl:h-[18px]
                  5xl:w-8 5xl:h-5"
              >
                <path d="M12.1,18V10.6H0V7.4H12.1V0L27.7,9Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* ── Slide indicators ──
          bottom:  bottom-12  →  3xl:bottom-14  →  4xl:bottom-16  →  5xl:bottom-20
          gap:     gap-4      →  3xl:gap-5      →  4xl:gap-6      →  5xl:gap-7
          height:  h-2        →  3xl:h-2.5      →  4xl:h-3        →  5xl:h-3.5
      */}
      <div
        className="absolute left-1/2 -translate-x-1/2 z-30 flex
        bottom-12 gap-4
        3xl:bottom-14 3xl:gap-5
        4xl:bottom-16 4xl:gap-6
        5xl:bottom-20 5xl:gap-7"
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setPrev(current);
              setCurrent(i);
            }}
            className="group relative transition-all duration-500
              h-2 3xl:h-2.5 4xl:h-3 5xl:h-3.5"
            style={{ width: current === i ? "40px" : "12px" }}
          >
            <div
              className={`absolute inset-0 rounded-full transition-all duration-300 ${
                current === i
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600"
                  : "bg-white/30 group-hover:bg-white/60"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
