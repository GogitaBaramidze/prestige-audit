"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  CheckCircle2,
  ArrowLeft,
  TrendingUp,
  ShieldCheck,
  FileSearch,
  BarChart3,
  ClipboardCheck,
  AlertTriangle,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const blue = {
  bg: "from-blue-50 via-indigo-50 to-white",
  iconBg: "bg-blue-600",
  iconShadow: "shadow-blue-100",
  check: "text-blue-600",
  border: "hover:border-blue-200",
  gradient: "from-blue-600 to-indigo-600",
  hoverShadow: "hover:shadow-blue-200/60",
  text: "text-blue-700",
  lightBg: "from-blue-50 to-indigo-50",
  lightBorder: "border-blue-200/80",
};

const auditServiceIcons = [
  FileSearch,
  ShieldCheck,
  BarChart3,
  AlertTriangle,
  ClipboardCheck,
  TrendingUp,
];

const auditTeam = [
  {
    name: "Sarah Mitchell",
    title: "Senior Auditor",
    image: "/3.png",
    slug: "sarah-mitchell",
  },
  {
    name: "Robert Clarke",
    title: "Audit Manager",
    image: "/4.jpeg",
    slug: "robert-clarke",
  },
  {
    name: "Nino Kvaratskhelia",
    title: "Financial Analyst",
    image: "/3.png",
    slug: "nino-kvaratskhelia",
  },
];

function AuditServiceCard({
  iconIndex,
  index,
}: {
  iconIndex: number;
  index: number;
}) {
  const t = useTranslations("financalAudit");
  const Icon = auditServiceIcons[iconIndex];
  const n = iconIndex + 1;

  return (
    <motion.div
      className={`group relative rounded-[28px] bg-gradient-to-br ${blue.bg} border border-transparent ${blue.border} p-6 shadow-sm hover:shadow-xl ${blue.hoverShadow} transition-all duration-500 overflow-hidden`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-20 blur-2xl bg-blue-600" />
      <div
        className={`relative z-10 w-11 h-11 p-2.5 ${blue.iconBg} text-white rounded-xl shadow-lg ${blue.iconShadow} mb-4 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="relative z-10 text-[16px] my-1 font-bold text-gray-900 mb-1.5">
        {t(`service${n}Title`)}
      </h3>
      <p className="relative z-10 text-gray-500 my-1 text-sm leading-relaxed">
        {t(`service${n}Desc`)}
      </p>
    </motion.div>
  );
}

function TeamCard({
  member,
  index,
}: {
  member: (typeof auditTeam)[0];
  index: number;
}) {
  const t = useTranslations("financalAudit");

  return (
    <motion.div
      className="group relative aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-[24px] bg-gray-200"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
    >
      <img
        src={member.image}
        alt={member.name}
        className="h-full w-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a3f]/90 via-[#0a1a3f]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
        <h3 className="text-base font-bold text-white leading-tight mb-0.5">
          {member.name}
        </h3>
        <p className="text-[10px] font-medium uppercase tracking-widest text-white/70">
          {member.title}
        </p>
        <div className="mt-3 overflow-hidden max-h-0 group-hover:max-h-16 transition-all duration-400 ease-in-out">
          <Link
            href={`/team/${member.slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-1.5 text-xs font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-[#0a1a3f]"
          >
            {t("teamViewProfile")}
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function FinancialAuditPage() {
  const t = useTranslations("financalAudit");
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const benefits = [
    t("benefit1"),
    t("benefit2"),
    t("benefit3"),
    t("benefit4"),
    t("benefit5"),
    t("benefit6"),
    t("benefit7"),
    t("benefit8"),
  ];

  return (
    <div className="min-h-screen bg-[#f3f5f4] font-sans">
      <section
        ref={heroRef}
        className="relative w-full bg-[#0a1a3f] overflow-hidden min-h-[88vh] flex items-center"
      >
        <motion.div
          className="absolute inset-0 z-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1800&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            y: heroY,
          }}
        />
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-400/15 rounded-full blur-[80px] pointer-events-none" />
        <div
          className="absolute inset-0 z-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
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
              className="inline-flex items-center gap-2 text-blue-300/80 hover:text-blue-200 text-sm font-medium transition-colors mb-10 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              {t("heroBackLink")}
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold uppercase tracking-widest mb-6"
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <FileSearch size={12} /> {t("heroBadge")}
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl font-bold text-white leading-[1.2] tracking-tight mb-6"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {t("heroHeading")}{" "}
                <span className="text-transparent bg-clip-text py-1 bg-gradient-to-r from-blue-300 to-cyan-200">
                  {t("heroHeadingHighlight")}
                </span>{" "}
                {t("heroHeadingSuffix")}
              </motion.h1>

              <motion.p
                className="text-blue-100/70 text-base leading-[1.85] mb-10 max-w-lg"
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
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-blue-500 hover:bg-blue-400 text-white font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.03]"
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

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-0.5 bg-blue-600" />
              <span className="text-xs font-bold uppercase tracking-[2px] text-gray-500">
                {t("whatWeDoLabel")}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              {t("whatWeDoHeading")}
            </h2>
            <p className="text-gray-600 text-[15px] leading-relaxed">
              {t("whatWeDoBody1")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className={`relative rounded-[28px] bg-gradient-to-br ${blue.bg} border ${blue.lightBorder} p-6 shadow-sm overflow-hidden`}
            >
              <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full opacity-20 blur-2xl bg-blue-600" />
              <h3 className="relative z-10 text-[16px] font-bold text-gray-900 mb-4">
                {t("benefitsCardTitle")}
              </h3>
              <ul className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {benefits.map((b, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-2.5 text-gray-700"
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                  >
                    <CheckCircle2
                      className={`w-4 h-4 ${blue.check} shrink-0 mt-0.5`}
                    />
                    <span className="text-[13px] font-medium leading-snug">
                      {b}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="services" className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-8 h-0.5 bg-blue-600" />
              <span className="text-xs font-bold uppercase tracking-[2px] text-gray-500">
                {t("auditTypesLabel")}
              </span>
              <div className="w-8 h-0.5 bg-blue-600" />
            </div>
          </motion.div>

          <div className="block md:hidden">
            <Carousel opts={{ align: "start", loop: false }} className="w-full">
              <CarouselContent className="-ml-0 mr-6">
                {auditServiceIcons.map((_, i) => (
                  <CarouselItem
                    key={i}
                    className="pl-6 basis-[85%] sm:basis-[70%]"
                  >
                    <AuditServiceCard iconIndex={i} index={i} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {auditServiceIcons.map((_, i) => (
              <AuditServiceCard key={i} iconIndex={i} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f3f5f4] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-0.5 bg-blue-600" />
              <span className="text-xs font-bold uppercase tracking-[2px] text-gray-500">
                {t("teamLabel")}
              </span>
            </div>
          </motion.div>

          <div className="block md:hidden">
            <Carousel opts={{ align: "start", loop: false }} className="w-full">
              <CarouselContent className="-ml-0 mr-6">
                {auditTeam.map((member, i) => (
                  <CarouselItem
                    key={member.slug}
                    className="pl-6 basis-[65%] sm:basis-[50%]"
                  >
                    <TeamCard member={member} index={i} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          <div className="hidden md:grid sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {auditTeam.map((member, i) => (
              <TeamCard key={member.slug} member={member} index={i} />
            ))}
          </div>

          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/team?team=financial-audit"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r ${blue.lightBg} border ${blue.lightBorder} ${blue.text} font-semibold text-sm transition-all duration-300 shadow-sm hover:shadow-lg ${blue.hoverShadow} hover:border-transparent hover:scale-[1.02] group/link relative overflow-hidden`}
            >
              <span
                className={`absolute inset-0 rounded-full bg-gradient-to-r ${blue.gradient} opacity-0 group-hover/link:opacity-100 transition-opacity duration-300`}
              />
              <span className="relative z-10 group-hover/link:text-white transition-colors duration-300">
                {t("teamViewAll")}
              </span>
              <ArrowRight
                className={`relative z-10 w-4 h-4 ${blue.text} group-hover/link:text-white transition-all duration-300 group-hover/link:translate-x-1`}
              />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-16">
        <motion.div
          className="max-w-7xl mx-auto relative overflow-hidden rounded-[36px] bg-[#0a1a3f] p-10 md:p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-cyan-400/15 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative z-10">
            <p className="text-blue-300/80 text-xs font-bold uppercase tracking-widest mb-3">
              {t("ctaLabel")}
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
              {t("ctaHeading")}
            </h2>
            <p className="text-blue-100/60 max-w-md mx-auto mb-6 text-sm leading-relaxed">
              {t("ctaBody")}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-blue-500 hover:bg-blue-400 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/40 hover:scale-[1.03] text-sm"
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
