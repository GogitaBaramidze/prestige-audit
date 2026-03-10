"use client";

import { useState, useEffect, useRef, JSX } from "react";
import { useTranslations } from "next-intl";

const SLIDES = ["/bg2.jpg", "/b3.jpg", "/b4.jpg"];

type CalcState = {
  display: string;
  prevValue: string | null;
  operator: string | null;
  waitingForOperand: boolean;
};

export default function HeroSection(): JSX.Element {
  const t = useTranslations("main");
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  const [calc, setCalc] = useState<CalcState>({
    display: "0",
    prevValue: null,
    operator: null,
    waitingForOperand: false,
  });

  const handleNumber = (num: string) => {
    setCalc((c) => {
      if (c.waitingForOperand) {
        return { ...c, display: num, waitingForOperand: false };
      }
      return {
        ...c,
        display: c.display === "0" ? num : c.display + num,
      };
    });
  };

  const handleDecimal = () => {
    setCalc((c) => {
      if (c.waitingForOperand)
        return { ...c, display: "0.", waitingForOperand: false };
      if (c.display.includes(".")) return c;
      return { ...c, display: c.display + "." };
    });
  };

  const handleOperator = (op: string) => {
    setCalc((c) => {
      if (c.operator && !c.waitingForOperand) {
        const result = calculate(c.prevValue!, c.display, c.operator);
        return {
          display: formatResult(result),
          prevValue: formatResult(result),
          operator: op,
          waitingForOperand: true,
        };
      }
      return {
        ...c,
        prevValue: c.display,
        operator: op,
        waitingForOperand: true,
      };
    });
  };

  const handleEquals = () => {
    setCalc((c) => {
      if (!c.operator || !c.prevValue) return c;
      const result = calculate(c.prevValue, c.display, c.operator);
      return {
        display: formatResult(result),
        prevValue: null,
        operator: null,
        waitingForOperand: true,
      };
    });
  };

  const handleClear = () => {
    setCalc({
      display: "0",
      prevValue: null,
      operator: null,
      waitingForOperand: false,
    });
  };

  const handleToggleSign = () => {
    setCalc((c) => ({
      ...c,
      display: c.display.startsWith("-") ? c.display.slice(1) : "-" + c.display,
    }));
  };

  const handlePercent = () => {
    setCalc((c) => ({
      ...c,
      display: formatResult(parseFloat(c.display) / 100),
    }));
  };

  const calculate = (a: string, b: string, op: string): number => {
    const fa = parseFloat(a);
    const fb = parseFloat(b);
    switch (op) {
      case "+":
        return fa + fb;
      case "−":
        return fa - fb;
      case "×":
        return fa * fb;
      case "÷":
        return fb !== 0 ? fa / fb : 0;
      default:
        return fb;
    }
  };

  const formatResult = (n: number): string => {
    if (isNaN(n)) return "Error";
    const s = parseFloat(n.toPrecision(10)).toString();
    return s.length > 12 ? n.toExponential(4) : s;
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (calcRef.current && !calcRef.current.contains(e.target as Node)) {
        setIsLocked(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((p) => {
        setPrev(p);
        return (p + 1) % SLIDES.length;
      });
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const calcRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glare: { x: 50, y: 50 } });
  const [isHoveringCalc, setIsHoveringCalc] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const handleCalcMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isLocked) return;
    const el = calcRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const rotateY = dx * 12;
    const rotateX = -dy * 12;
    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;
    setTilt({ x: rotateX, y: rotateY, glare: { x: glareX, y: glareY } });
  };

  const handleCalcMouseLeave = () => {
    if (isLocked) return;
    setIsHoveringCalc(false);
    setTilt({ x: 0, y: 0, glare: { x: 50, y: 50 } });
  };

  const isOperator = (btn: string) => ["÷", "×", "−", "+"].includes(btn);
  const isTop = (btn: string) => ["AC", "+/-", "%"].includes(btn);
  const activeOp = calc.operator;

  // Last row: 0 (normal), . (normal), = (blue) — all equal width in 3-col grid
  const buttons = [
    ["AC", "+/-", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "−"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ];

  const handleBtn = (btn: string) => {
    if (btn === "AC") return handleClear();
    if (btn === "+/-") return handleToggleSign();
    if (btn === "%") return handlePercent();
    if (btn === "=") return handleEquals();
    if (btn === ".") return handleDecimal();
    if (isOperator(btn)) return handleOperator(btn);
    handleNumber(btn);
  };

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
        .calc-btn {
          transition: all 0.12s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }
        .calc-btn:active {
          transform: scale(0.93);
        }
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

      {/* ── Content Wrapper ── */}
      <div
        className="relative z-20 w-full max-w-[2400px] mx-auto
        px-6 sm:px-10 md:px-16 lg:px-20 2xl:px-32 3xl:px-44 4xl:px-56 5xl:px-72
        py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40 3xl:py-52 4xl:py-60 5xl:py-72
        flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20"
      >
        {/* ── Left Side: Content ── */}
        <div className="flex-1 space-y-10 md:space-y-12 lg:space-y-16 3xl:space-y-20 4xl:space-y-24 5xl:space-y-32">
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

          {/* Headline */}
          <h1
            className="anim-2 text-white font-normal leading-snug tracking-widest
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl
            3xl:text-7xl 4xl:text-8xl 5xl:text-9xl"
          >
            <span className="block">{t("heroTitleLine1")}</span>
            <span className="block text-blue-400 font-semibold">
              {t("heroTitleHighlight")}
            </span>
            <span className="block">{t("heroTitleLine2")}</span>
          </h1>

          {/* CTA button */}
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
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span className="relative z-10">{t("heroCta")}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 27.7 18"
                className="relative z-10 fill-current transition-transform duration-300 group-hover:translate-x-1
                  w-5 h-3.5 3xl:w-6 3xl:h-4 4xl:w-7 4xl:h-[18px] 5xl:w-8 5xl:h-5"
              >
                <path d="M12.1,18V10.6H0V7.4H12.1V0L27.7,9Z" />
              </svg>
            </a>
          </div>
        </div>

        {/* ── Right Side: Calculator ── */}
        <div
          className="hidden lg:block flex-shrink-0 w-[300px] 3xl:w-[360px] 4xl:w-[420px] 5xl:w-[520px] anim-3"
          style={{ perspective: "1000px" }}
          ref={calcRef}
          onMouseMove={(e) => {
            if (!isLocked) {
              setIsHoveringCalc(true);
              handleCalcMouseMove(e);
            }
          }}
          onMouseLeave={handleCalcMouseLeave}
          onMouseDown={() => {
            setIsLocked(true);
            setIsHoveringCalc(false);
            setTilt({ x: 0, y: 0, glare: { x: 50, y: 50 } });
          }}
        >
          <div
            className="relative rounded-[2.5rem] overflow-hidden border border-white/10"
            style={{
              background:
                "linear-gradient(145deg, rgba(30,30,40,0.95) 0%, rgba(15,15,25,0.98) 100%)",
              boxShadow: isHoveringCalc
                ? `0 48px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.12)`
                : "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.1)",
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
              transition: isHoveringCalc
                ? "transform 0.08s ease-out, box-shadow 0.3s ease"
                : "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.6s ease",
              willChange: "transform",
            }}
          >
            {/* Glare overlay */}
            {isHoveringCalc && (
              <div
                className="absolute inset-0 z-20 pointer-events-none rounded-[2.5rem]"
                style={{
                  background: `radial-gradient(circle at ${tilt.glare.x}% ${tilt.glare.y}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
                }}
              />
            )}
            {/* Top brand strip */}
            <div className="flex items-center justify-between px-6 pt-5 pb-2">
              <span className="text-[10px] 3xl:text-xs font-semibold tracking-[0.2em] uppercase text-white/20">
                Calculator
              </span>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
              </div>
            </div>

            {/* Display */}
            <div className="px-5 pt-1 pb-3">
              <div
                className="rounded-2xl px-5 py-4 3xl:py-5 text-right relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(10,10,20,0.7) 100%)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div className="text-white/30 text-xs 3xl:text-sm font-light tracking-wide min-h-[18px] mb-1 truncate">
                  {calc.prevValue && calc.operator
                    ? `${calc.prevValue} ${calc.operator}`
                    : "\u00A0"}
                </div>
                <div
                  className="text-white font-light leading-none tracking-tight truncate"
                  style={{
                    fontSize:
                      calc.display.length > 9
                        ? "1.6rem"
                        : calc.display.length > 6
                          ? "2rem"
                          : "2.8rem",
                  }}
                >
                  {calc.display}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="px-4 pb-4 3xl:px-5 3xl:pb-5 space-y-2 3xl:space-y-2.5">
              {buttons.map((row, ri) => (
                <div
                  key={ri}
                  className={`grid gap-2 3xl:gap-2.5 ${
                    row.length === 3 ? "grid-cols-3" : "grid-cols-4"
                  }`}
                >
                  {row.map((btn) => {
                    const isEq = btn === "=";
                    const isOp = isOperator(btn);
                    const isTopBtn = isTop(btn);
                    const isActiveOp =
                      isOp && activeOp === btn && calc.waitingForOperand;

                    return (
                      <button
                        key={btn}
                        onClick={() => handleBtn(btn)}
                        className={`calc-btn relative flex items-center justify-center font-medium select-none
                          h-[52px] 3xl:h-[60px] 4xl:h-[68px] 5xl:h-[80px]
                          text-base 3xl:text-lg 4xl:text-xl 5xl:text-2xl
                          rounded-xl 3xl:rounded-2xl
                          ${
                            isEq
                              ? "text-white"
                              : isActiveOp
                                ? "text-[#1a1a2e]"
                                : isOp
                                  ? "text-[#60a5fa]"
                                  : isTopBtn
                                    ? "text-white/70"
                                    : "text-white"
                          }
                        `}
                        style={{
                          background: isEq
                            ? "linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)"
                            : isActiveOp
                              ? "rgba(96,165,250,1)"
                              : isOp
                                ? "rgba(96,165,250,0.12)"
                                : isTopBtn
                                  ? "rgba(255,255,255,0.07)"
                                  : "rgba(255,255,255,0.06)",
                          border: isEq
                            ? "1px solid rgba(99,102,241,0.5)"
                            : isOp
                              ? "1px solid rgba(96,165,250,0.2)"
                              : "1px solid rgba(255,255,255,0.06)",
                          boxShadow: isEq
                            ? "0 4px 20px rgba(59,130,246,0.35), inset 0 1px 0 rgba(255,255,255,0.2)"
                            : isActiveOp
                              ? "0 2px 12px rgba(96,165,250,0.4)"
                              : "inset 0 1px 0 rgba(255,255,255,0.05)",
                        }}
                      >
                        <span
                          className="absolute inset-0 rounded-xl 3xl:rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-200"
                          style={{ background: "rgba(255,255,255,0.04)" }}
                        />
                        <span className="relative z-10">{btn}</span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Slide indicators ── */}
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
            className="group relative transition-all duration-500 cursor-pointer
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
