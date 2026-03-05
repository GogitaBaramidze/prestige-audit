"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

const lineColors = [
  "#2563eb",
  "#0891b2",
  "#059669",
  "#d97706",
  "#dc2626",
  "#7c3aed",
];

const cardThemes = [
  {
    cardBg: "from-blue-50 via-indigo-50 to-white",
    iconBg: "bg-blue-600",
    border: "hover:border-blue-200",
    learnMoreGradient: "from-blue-600 to-indigo-600",
    learnMoreShadow: "hover:shadow-blue-200/60",
    learnMoreText: "text-blue-700",
    learnMoreBg: "from-blue-50 to-indigo-50",
    learnMoreBorder: "border-blue-200/80",
    glowColor: "rgba(37,99,235,0.15)",
    accent: "#2563eb",
  },
  {
    cardBg: "from-cyan-50 via-sky-50 to-white",
    iconBg: "bg-cyan-600",
    border: "hover:border-cyan-200",
    learnMoreGradient: "from-cyan-500 to-sky-600",
    learnMoreShadow: "hover:shadow-cyan-200/60",
    learnMoreText: "text-cyan-700",
    learnMoreBg: "from-cyan-50 to-sky-50",
    learnMoreBorder: "border-cyan-200/80",
    glowColor: "rgba(8,145,178,0.15)",
    accent: "#0891b2",
  },
  {
    cardBg: "from-emerald-50 via-teal-50 to-white",
    iconBg: "bg-emerald-600",
    border: "hover:border-emerald-200",
    learnMoreGradient: "from-emerald-500 to-teal-600",
    learnMoreShadow: "hover:shadow-emerald-200/60",
    learnMoreText: "text-emerald-700",
    learnMoreBg: "from-emerald-50 to-teal-50",
    learnMoreBorder: "border-emerald-200/80",
    glowColor: "rgba(5,150,105,0.15)",
    accent: "#059669",
  },
  {
    cardBg: "from-amber-50 via-yellow-50 to-white",
    iconBg: "bg-amber-500",
    border: "hover:border-amber-200",
    learnMoreGradient: "from-amber-500 to-orange-500",
    learnMoreShadow: "hover:shadow-amber-200/60",
    learnMoreText: "text-amber-700",
    learnMoreBg: "from-amber-50 to-orange-50",
    learnMoreBorder: "border-amber-200/80",
    glowColor: "rgba(217,119,6,0.15)",
    accent: "#d97706",
  },
  {
    cardBg: "from-rose-50 via-pink-50 to-white",
    iconBg: "bg-rose-600",
    border: "hover:border-rose-200",
    learnMoreGradient: "from-rose-500 to-pink-600",
    learnMoreShadow: "hover:shadow-rose-200/60",
    learnMoreText: "text-rose-700",
    learnMoreBg: "from-rose-50 to-pink-50",
    learnMoreBorder: "border-rose-200/80",
    glowColor: "rgba(220,38,38,0.15)",
    accent: "#dc2626",
  },
  {
    cardBg: "from-violet-50 via-purple-50 to-white",
    iconBg: "bg-violet-600",
    border: "hover:border-violet-200",
    learnMoreGradient: "from-violet-600 to-purple-600",
    learnMoreShadow: "hover:shadow-violet-200/60",
    learnMoreText: "text-violet-700",
    learnMoreBg: "from-violet-50 to-purple-50",
    learnMoreBorder: "border-violet-200/80",
    glowColor: "rgba(124,58,237,0.15)",
    accent: "#7c3aed",
  },
];

const deptHrefs = [
  "/team?team=financial-audit",
  "/team?team=tax-services",
  "/team?team=accounting-services",
  "/team?team=valuation-services",
  "/team?team=legal-support",
  "/team?team=business-consulting",
];

function DeptCard({
  dept,
  theme,
  cardRef,
  index,
  isInView,
  enterFrom = "bottom",
  mobileDelay,
}: {
  dept: { label: string; href: string; cta: string };
  theme: (typeof cardThemes)[0];
  cardRef: React.Ref<HTMLDivElement>;
  index: number;
  isInView: boolean;
  enterFrom?: "left" | "right" | "bottom";
  mobileDelay?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const initialX =
    enterFrom === "left" ? -100 : enterFrom === "right" ? 100 : 0;
  const initialY = enterFrom === "bottom" ? 80 : 0;
  const delay =
    mobileDelay ??
    (enterFrom === "left"
      ? 0.7
      : enterFrom === "right"
        ? 0.85
        : 1.1 + (index - 2) * 0.15);

  return (
    <motion.div
      ref={cardRef}
      className="w-full"
      initial={{ opacity: 0, x: initialX, y: initialY, scale: 0.85 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0, scale: 1 } : {}}
      transition={{ duration: 1.2, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Link href={dept.href} className="group block">
        <div
          className={`relative overflow-hidden my-4 bg-gradient-to-br ${theme.cardBg} rounded-[2rem] mx-6 md:mx-0 p-6 border border-transparent transition-all duration-700 hover:shadow-2xl ${theme.border} group-hover:-translate-y-2`}
          style={{
            boxShadow: hovered
              ? `0 25px 70px ${theme.glowColor}, 0 0 0 1px ${theme.accent}25`
              : "0 4px 15px rgba(0,0,0,0.04)",
          }}
        >
          <motion.div
            className={`absolute -top-8 -right-8 w-28 h-28 my-1 rounded-full ${theme.iconBg} blur-2xl`}
            animate={
              hovered
                ? { scale: 1.8, opacity: 0.4 }
                : { scale: 1, opacity: 0.15 }
            }
            transition={{ duration: 0.6 }}
          />
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ x: "-100%", opacity: 0 }}
            animate={
              hovered ? { x: "200%", opacity: 0.4 } : { x: "-100%", opacity: 0 }
            }
            transition={{ duration: 0.8 }}
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.6) 50%, transparent 60%)",
            }}
          />
          <div className="flex flex-col items-center text-center gap-4 relative z-10">
            <motion.div
              className={`p-4 rounded-2xl ${theme.iconBg} text-white shadow-lg`}
              initial={{ scale: 0, rotate: -30 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 18,
                delay: delay + 0.3,
              }}
            >
              <Users size={24} />
            </motion.div>
            <div>
              <motion.h4
                className="text-slate-800 mb-3 font-semibold text-base"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: delay + 0.45 }}
              >
                {dept.label}
              </motion.h4>
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: delay + 0.55 }}
                className={`inline-flex items-center gap-2 relative overflow-hidden px-4 py-2 rounded-full border ${theme.learnMoreBorder} bg-gradient-to-r ${theme.learnMoreBg} ${theme.learnMoreText} text-xs font-semibold shadow-sm transition-all duration-500`}
              >
                <span
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${theme.learnMoreGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                <span className="relative z-10 group-hover:text-white transition-colors duration-400">
                  {dept.cta}
                </span>
                <motion.div
                  className="relative z-10"
                  animate={hovered ? { x: 4 } : { x: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <ArrowRight size={12} />
                </motion.div>
              </motion.span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function MobileCarousel({ isInView }: { isInView: boolean }) {
  const t = useTranslations("main");
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const departments = [
    { label: t("teamDept1Label"), href: deptHrefs[0], cta: t("teamDept1Cta") },
    { label: t("teamDept2Label"), href: deptHrefs[1], cta: t("teamDept2Cta") },
    { label: t("teamDept3Label"), href: deptHrefs[2], cta: t("teamDept3Cta") },
    { label: t("teamDept4Label"), href: deptHrefs[3], cta: t("teamDept4Cta") },
    { label: t("teamDept5Label"), href: deptHrefs[4], cta: t("teamDept5Cta") },
    { label: t("teamDept6Label"), href: deptHrefs[5], cta: t("teamDept6Cta") },
  ];

  const goTo = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(index, departments.length - 1));
      setCurrent(next);
      trackRef.current?.children[next]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    },
    [departments.length],
  );

  // Touch swipe support
  const touchStartX = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  };

  return (
    <div className="w-full opacity-100">
      <div className="relative">
        <button
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-30"
          style={{
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.7)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          }}
        >
          <ChevronLeft size={16} className="text-slate-600" />
        </button>

        <button
          onClick={() => goTo(current + 1)}
          disabled={current === departments.length - 1}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-30"
          style={{
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.7)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          }}
        >
          <ChevronRight size={16} className="text-slate-600" />
        </button>

        <div
          ref={trackRef}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onScroll={(e) => {
            const el = e.currentTarget;
            const index = Math.round(el.scrollLeft / el.offsetWidth);
            setCurrent(index);
          }}
        >
          {departments.map((dept, i) => (
            <div key={i} className="w-full flex-shrink-0 snap-center">
              <DeptCard
                dept={dept}
                theme={cardThemes[i]}
                cardRef={() => {}}
                index={i}
                isInView={isInView}
                enterFrom="bottom"
                mobileDelay={0}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {departments.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="transition-all duration-500 rounded-full"
            style={{
              width: current === i ? "28px" : "8px",
              height: "8px",
              background: current === i ? cardThemes[i].accent : "#cbd5e1",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function TeamSection() {
  const t = useTranslations("main");
  const containerRef = useRef<HTMLDivElement>(null);
  const mainDotRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [paths, setPaths] = useState<string[]>([]);
  const [imagePath, setImagePath] = useState<string>("");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const departments = [
    { label: t("teamDept1Label"), href: deptHrefs[0], cta: t("teamDept1Cta") },
    { label: t("teamDept2Label"), href: deptHrefs[1], cta: t("teamDept2Cta") },
    { label: t("teamDept3Label"), href: deptHrefs[2], cta: t("teamDept3Cta") },
    { label: t("teamDept4Label"), href: deptHrefs[3], cta: t("teamDept4Cta") },
    { label: t("teamDept5Label"), href: deptHrefs[4], cta: t("teamDept5Cta") },
    { label: t("teamDept6Label"), href: deptHrefs[5], cta: t("teamDept6Cta") },
  ];

  const computePaths = useCallback(() => {
    const container = containerRef.current;
    const mainDot = mainDotRef.current;
    if (!container || !mainDot) return;
    const cRect = container.getBoundingClientRect();
    const dotRect = mainDot.getBoundingClientRect();
    const startX = dotRect.left + dotRect.width / 2 - cRect.left;
    const startY = dotRect.top + dotRect.height / 2 - cRect.top;
    if (imageRef.current) {
      const imgRect = imageRef.current.getBoundingClientRect();
      setImagePath(
        `M ${imgRect.left + imgRect.width / 2 - cRect.left} ${imgRect.bottom - cRect.top} V ${startY}`,
      );
    }
    const newPaths = cardRefs.current.map((card, i) => {
      if (!card) return "";
      const r = card.getBoundingClientRect();
      const cardMidX = r.left + r.width / 2 - cRect.left;
      const cardTopY = r.top - cRect.top;
      const cardSideY = r.top + r.height / 2 - cRect.top;
      if (i === 0)
        return `M ${startX} ${startY} H ${r.right - cRect.left} V ${cardSideY}`;
      if (i === 1)
        return `M ${startX} ${startY} H ${r.left - cRect.left} V ${cardSideY}`;
      const midY = startY + 60;
      return `M ${startX} ${startY} V ${midY} H ${cardMidX} V ${cardTopY}`;
    });
    setPaths(newPaths);
  }, []);

  useEffect(() => {
    computePaths();
    window.addEventListener("resize", computePaths);
    const timer = setTimeout(computePaths, 500);
    return () => {
      window.removeEventListener("resize", computePaths);
      clearTimeout(timer);
    };
  }, [computePaths]);

  return (
    <section
      ref={sectionRef}
      className="bg-[#f3f5f4] py-20 overflow-hidden min-h-screen"
    >
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(37,99,235,0.3), 0 0 0 0 rgba(37,99,235,0.2); }
          50%       { box-shadow: 0 0 40px rgba(37,99,235,0.6), 0 0 25px 12px rgba(37,99,235,0.15); }
        }
        .trunk-dot { width: 22px; height: 22px; border-radius: 50%; background: #2563eb; border: 4px solid #fff; animation: pulseGlow 2.5s ease-in-out infinite; z-index: 30; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>

      <div className="lg:hidden flex flex-col items-center px-0 gap-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-0.5 w-10 bg-[#2563eb]" />
            <span className="text-gray-500 text-base font-medium  md:text-lg tracking-widest uppercase">
              {t("teamSectionLabel")}
            </span>
            <div className="h-0.5 w-10 bg-[#2563eb]" />
          </div>
        </div>

        <div
          className="relative rounded-[40px] overflow-hidden shadow-2xl w-[320px]"
          style={{
            boxShadow:
              "0 25px 60px rgba(0,0,0,0.25), 0 8px 25px rgba(37,99,235,0.15)",
          }}
        >
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src="/team/maia-pheikrishvili.png"
              alt={t("teamCeoName")}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
            <h3 className="text-white mb-1 font-bold text-lg">
              {t("teamCeoName")}
            </h3>
            <p className="text-blue-400 text-sm">{t("teamCeoTitle")}</p>
          </div>
        </div>

        <MobileCarousel isInView={isInView} />
      </div>

      <div className="hidden lg:block">
        <motion.div
          className="max-w-7xl mx-auto mb-16 flex flex-col items-center text-center px-6"
          initial={{ opacity: 0, y: -40, filter: "blur(15px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              className="h-0.5 bg-[#2563eb]"
              initial={{ width: 0 }}
              animate={isInView ? { width: "3rem" } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            <motion.span
              className="text-gray-500 text-sm md:text-xl font-medium tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {t("teamSectionLabel")}
            </motion.span>
            <motion.div
              className="h-0.5 bg-[#2563eb]"
              initial={{ width: 0 }}
              animate={isInView ? { width: "3rem" } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </div>
        </motion.div>

        <div
          ref={containerRef}
          className="relative w-full max-w-7xl mx-auto px-6"
        >
          <div className="flex flex-row items-center justify-between gap-4 mb-20">
            <div className="w-[250px] z-20">
              <DeptCard
                dept={departments[0]}
                theme={cardThemes[0]}
                cardRef={(el: HTMLDivElement | null) => {
                  cardRefs.current[0] = el;
                }}
                index={0}
                isInView={isInView}
                enterFrom="left"
              />
            </div>

            <motion.div
              className="relative flex flex-col items-center z-10"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{
                duration: 1.4,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div
                ref={imageRef}
                className="relative group rounded-[50px] overflow-hidden w-[340px]"
                style={{
                  boxShadow:
                    "0 30px 80px rgba(0,0,0,0.3), 0 10px 30px rgba(37,99,235,0.2), 0 0 0 1px rgba(255,255,255,0.08)",
                }}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src="/team/maia-pheikrishvili.avif"
                    alt={t("teamCeoName")}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                  <motion.h3
                    className="text-white mb-2 font-bold text-xl"
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1.1 }}
                  >
                    {t("teamCeoName")}
                  </motion.h3>
                  <motion.p
                    className="text-blue-400 text-sm"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 1.3 }}
                  >
                    {t("teamCeoTitleFull")}
                  </motion.p>
                </div>
              </div>
              <div className="h-8" />
              <motion.div
                ref={mainDotRef}
                className="relative"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.9,
                }}
              >
                <div className="trunk-dot" />
              </motion.div>
            </motion.div>

            <div className="w-[250px] z-20">
              <DeptCard
                dept={departments[1]}
                theme={cardThemes[1]}
                cardRef={(el: HTMLDivElement | null) => {
                  cardRefs.current[1] = el;
                }}
                index={1}
                isInView={isInView}
                enterFrom="right"
              />
            </div>
          </div>

          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
          >
            {imagePath && (
              <motion.path
                d={imagePath}
                fill="none"
                stroke="#2563eb"
                strokeWidth="2.5"
                strokeOpacity="0.4"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
              />
            )}
            {paths.map((d, i) =>
              d ? (
                <motion.path
                  key={i}
                  d={d}
                  fill="none"
                  stroke={lineColors[i]}
                  strokeWidth="2.5"
                  strokeOpacity="0.6"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{
                    duration: 1.8,
                    delay: 1.8 + i * 0.1,
                    ease: "easeInOut",
                  }}
                />
              ) : null,
            )}
          </svg>

          <div className="grid grid-cols-4 gap-6 mx-6 z-20 relative">
            {departments.slice(2).map((dept, i) => (
              <DeptCard
                key={i}
                dept={dept}
                theme={cardThemes[i + 2]}
                cardRef={(el: HTMLDivElement | null) => {
                  cardRefs.current[i + 2] = el;
                }}
                index={i + 2}
                isInView={isInView}
                enterFrom="bottom"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
