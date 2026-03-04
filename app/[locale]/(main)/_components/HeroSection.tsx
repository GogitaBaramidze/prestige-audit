"use client";

import { useState, useEffect, JSX } from "react";
import { useTranslations } from "next-intl";

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
        .slide-in { animation: fadeIn 0.9s ease-in-out forwards; }
        .slide-out { animation: fadeIn 0.9s ease-in-out reverse forwards; }
        .anim-1 { animation: slideUp 0.5s ease-out 0.1s both; }
        .anim-2 { animation: slideUp 0.5s ease-out 0.25s both; }
        .anim-3 { animation: slideUp 0.5s ease-out 0.45s both; }
      `}</style>

      {/* Background slides */}
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

      {/* Content */}
      <div className="relative z-20 w-full px-6 sm:px-10 md:px-16 lg:px-20 2xl:px-32 max-w-[2000px] mx-auto py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40">
        <div className="space-y-10 md:space-y-12 lg:space-y-16">
          <div className="anim-1 flex items-center gap-3">
            <div className="flex items-center">
              <div className="rounded-full bg-white w-1 h-1" />
              <div className="bg-white/40 w-8 md:w-10 h-px" />
            </div>
            <span className="text-white text-sm font-medium tracking-widest uppercase">
              {t("heroBrand")}
            </span>
            <div className="flex items-center">
              <div className="bg-white/40 w-8 md:w-10 h-px" />
              <div className="rounded-full bg-white w-1 h-1" />
            </div>
          </div>

          <h1 className="anim-2 text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-snug tracking-widest">
            <span className="block">{t("heroTitleLine1")}</span>
            <span className="block text-blue-400 font-semibold">
              {t("heroTitleHighlight")}
            </span>
            <span className="block">{t("heroTitleLine2")}</span>
          </h1>

          <div className="anim-3">
            <a
              href="/contact"
              className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full px-9 py-5 md:px-12 md:py-6 text-white text-base font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 shadow-lg shadow-blue-600/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-1 active:scale-95"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span className="relative z-10">{t("heroCta")}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 27.7 18"
                className="relative z-10 w-5 h-3.5 fill-current transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M12.1,18V10.6H0V7.4H12.1V0L27.7,9Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-4">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setPrev(current);
              setCurrent(i);
            }}
            className="group relative h-2 transition-all duration-500"
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
