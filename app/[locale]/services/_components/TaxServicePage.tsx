"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowLeft,
  ChevronRight,
  Calculator,
  FileText,
  Globe,
  Shield,
  TrendingDown,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

// ── same token approach as ServicesSection emerald card ──
const emerald = {
  bg: "from-emerald-50 via-teal-50 to-white",
  iconBg: "bg-emerald-600",
  iconShadow: "shadow-emerald-100",
  check: "text-emerald-600",
  border: "hover:border-emerald-200",
  gradient: "from-emerald-500 to-teal-600",
  hoverShadow: "hover:shadow-emerald-200/60",
  text: "text-emerald-700",
  lightBg: "from-emerald-50 to-teal-50",
  lightBorder: "border-emerald-200/80",
};

const taxServiceIcons = [
  FileText,
  Calculator,
  TrendingDown,
  Globe,
  Shield,
  Users,
];

// ── Service card ──
function TaxServiceCard({
  iconIndex,
  index,
}: {
  iconIndex: number;
  index: number;
}) {
  const t = useTranslations("taxServices");
  const Icon = taxServiceIcons[iconIndex];
  const n = iconIndex + 1;

  return (
    <motion.div
      className={`group relative rounded-[28px] bg-gradient-to-br ${emerald.bg} border border-transparent ${emerald.border} p-6 shadow-sm hover:shadow-xl ${emerald.hoverShadow} transition-all duration-500 overflow-hidden`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-20 blur-2xl bg-emerald-600" />
      <div
        className={`relative z-10 w-11 h-11 p-2.5 ${emerald.iconBg} text-white rounded-xl shadow-lg ${emerald.iconShadow} mb-4 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="relative z-10 text-[16px] font-bold text-gray-900 mb-1.5">
        {t(`service${n}Title`)}
      </h3>
      <p className="relative z-10 text-gray-500 text-sm leading-relaxed">
        {t(`service${n}Desc`)}
      </p>
    </motion.div>
  );
}

// ── Page ──
export default function TaxServicesPage() {
  const t = useTranslations("taxServices");
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const checklist = [
    t("checklist1"),
    t("checklist2"),
    t("checklist3"),
    t("checklist4"),
    t("checklist5"),
    t("checklist6"),
    t("checklist7"),
    t("checklist8"),
  ];

  return (
    <div className="min-h-screen bg-[#f3f5f4] font-sans">
      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative w-full bg-[#0c2340] overflow-hidden min-h-[88vh] flex items-center"
      >
        <motion.div
          className="absolute inset-0 z-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1800&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            y: heroY,
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-teal-400/10 rounded-full blur-[80px] pointer-events-none" />
        <div
          className="absolute inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-32 w-full"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-emerald-300/80 hover:text-emerald-200 text-sm font-medium transition-colors mb-10 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              {t("heroBackLink")}
            </Link>
          </motion.div>

          <div className="max-w-2xl">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-bold uppercase tracking-widest mb-6"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Calculator size={12} /> {t("heroBadge")}
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl font-extrabold text-white leading-[1.05] mb-6"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t("heroHeading")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200">
                {t("heroHeadingHighlight")}
              </span>{" "}
              {t("heroHeadingSuffix")}
            </motion.h1>

            <motion.p
              className="text-emerald-100/60 text-lg leading-relaxed mb-10 max-w-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t("heroBody")}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-[1.03]"
              >
                {t("heroCta")} <ChevronRight size={16} />
              </Link>
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all duration-300 backdrop-blur-sm"
              >
                {t("heroExplore")}
              </a>
            </motion.div>
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,80 C360,20 1080,20 1440,80 L1440,80 L0,80 Z"
              fill="#f3f5f4"
            />
          </svg>
        </div>
      </section>

      {/* ── WHY IT MATTERS + CHECKLIST ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-emerald-600" />
              <span className="text-xs font-bold uppercase tracking-[2px] text-gray-500">
                {t("whyLabel")}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-5">
              {t("whyHeading")}
            </h2>
            <p className="text-gray-600 text-[15px] leading-relaxed mb-4">
              {t("whyBody1")}
            </p>
            <p className="text-gray-600 text-[15px] leading-relaxed mb-4">
              {t("whyBody2")}
            </p>
            <p className="text-gray-600 text-[15px] leading-relaxed mb-6">
              {t("whyBody3")}
            </p>

            <div className="flex items-start gap-4 p-5 bg-amber-50 border border-amber-200/60 rounded-2xl">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-amber-800 mb-1">
                  {t("whyAlertTitle")}
                </p>
                <p className="text-sm text-amber-700">{t("whyAlertBody")}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className={`relative rounded-[28px] bg-gradient-to-br ${emerald.bg} border ${emerald.lightBorder} p-7 shadow-sm overflow-hidden`}
            >
              <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full opacity-20 blur-2xl bg-emerald-600" />
              <h3 className="relative z-10 text-[16px] font-bold text-gray-900 mb-5">
                {t("checklistCardTitle")}
              </h3>
              <ul className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {checklist.map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-2.5 text-gray-700"
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                  >
                    <CheckCircle2
                      className={`w-4 h-4 ${emerald.check} shrink-0 mt-0.5`}
                    />
                    <span className="text-[13px] font-medium leading-snug">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TAX SERVICES ── */}
      <section id="services" className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-8 h-0.5 bg-emerald-600" />
              <span className="text-xs font-bold uppercase tracking-[2px] text-gray-500">
                {t("servicesLabel")}
              </span>
              <div className="w-8 h-0.5 bg-emerald-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              {t("servicesHeading")}
            </h2>
            <p className="text-gray-500 mt-2 max-w-lg mx-auto text-sm">
              {t("servicesBody")}
            </p>
          </motion.div>

          {/* Mobile carousel */}
          <div className="block md:hidden">
            <Carousel opts={{ align: "start", loop: false }} className="w-full">
              <CarouselContent className="-ml-0 mr-6">
                {taxServiceIcons.map((_, i) => (
                  <CarouselItem
                    key={i}
                    className="pl-6 basis-[85%] sm:basis-[70%]"
                  >
                    <TaxServiceCard iconIndex={i} index={i} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Desktop grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {taxServiceIcons.map((_, i) => (
              <TaxServiceCard key={i} iconIndex={i} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 lg:px-12 pb-20 pt-16 md:pt-20">
        <motion.div
          className="max-w-7xl mx-auto relative overflow-hidden rounded-[36px] bg-[#0c2340] p-10 md:p-14 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-teal-400/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-emerald-300" />
              <p className="text-emerald-300/80 text-xs font-bold uppercase tracking-widest">
                {t("ctaLabel")}
              </p>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
              {t("ctaHeading")}
            </h2>
            <p className="text-emerald-100/60 max-w-md mx-auto mb-7 text-sm leading-relaxed">
              {t("ctaBody")}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/40 hover:scale-[1.03] text-sm"
              >
                {t("ctaBook")} <ChevronRight size={16} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all duration-300 backdrop-blur-sm text-sm"
              >
                <ArrowLeft size={16} /> {t("ctaAllServices")}
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
