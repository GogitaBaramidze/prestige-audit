"use client";

import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface Service {
  id: string;
  titleKey: string;
  descriptionKey: string;
  featureKeys: string[];
  icon: React.ReactNode;
}

const cardThemes = [
  {
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
  },
  {
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
  },
  {
    bg: "from-violet-50 via-purple-50 to-white",
    iconBg: "bg-violet-600",
    iconShadow: "shadow-violet-100",
    check: "text-violet-600",
    border: "hover:border-violet-200",
    gradient: "from-violet-600 to-purple-600",
    hoverShadow: "hover:shadow-violet-200/60",
    text: "text-violet-700",
    lightBg: "from-violet-50 to-purple-50",
    lightBorder: "border-violet-200/80",
  },
  {
    bg: "from-amber-50 via-yellow-50 to-white",
    iconBg: "bg-amber-500",
    iconShadow: "shadow-amber-100",
    check: "text-amber-600",
    border: "hover:border-amber-200",
    gradient: "from-amber-500 to-orange-500",
    hoverShadow: "hover:shadow-amber-200/60",
    text: "text-amber-700",
    lightBg: "from-amber-50 to-orange-50",
    lightBorder: "border-amber-200/80",
  },
  {
    bg: "from-rose-50 via-pink-50 to-white",
    iconBg: "bg-rose-600",
    iconShadow: "shadow-rose-100",
    check: "text-rose-600",
    border: "hover:border-rose-200",
    gradient: "from-rose-500 to-pink-600",
    hoverShadow: "hover:shadow-rose-200/60",
    text: "text-rose-700",
    lightBg: "from-rose-50 to-pink-50",
    lightBorder: "border-rose-200/80",
  },
  {
    bg: "from-cyan-50 via-sky-50 to-white",
    iconBg: "bg-cyan-600",
    iconShadow: "shadow-cyan-100",
    check: "text-cyan-600",
    border: "hover:border-cyan-200",
    gradient: "from-cyan-500 to-sky-600",
    hoverShadow: "hover:shadow-cyan-200/60",
    text: "text-cyan-700",
    lightBg: "from-cyan-50 to-sky-50",
    lightBorder: "border-cyan-200/80",
  },
];

const services: Service[] = [
  {
    id: "financial-audit",
    titleKey: "financialAuditTitle",
    descriptionKey: "financialAuditDescription",
    featureKeys: [
      "financialAuditFeature1",
      "financialAuditFeature2",
      "financialAuditFeature3",
    ],
    icon: (
      <svg
        viewBox="0 0 30 30"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        fill="currentColor"
      >
        <path d="M24.45,0a2.29,2.29,0,0,0-2.28,2.28,2.4,2.4,0,0,0,.12.71L18,6.83a2.27,2.27,0,0,0-2.29.25L11.93,4.91a1.6,1.6,0,0,0,0-.23,2.29,2.29,0,0,0-4.57,0,2.38,2.38,0,0,0,.15.81L3.12,9.86a2.32,2.32,0,0,0-.84-.16A2.29,2.29,0,1,0,4.57,12a2.25,2.25,0,0,0-.16-.81L8.84,6.8A2.32,2.32,0,0,0,9.67,7,2.24,2.24,0,0,0,11,6.51L14.8,8.68c0,.07,0,.15,0,.23a2.29,2.29,0,1,0,4.45-.7l4.29-3.85a2.22,2.22,0,0,0,.93.21,2.29,2.29,0,1,0,0-4.57Z" />
        <path d="M8,11h3.27a.65.65,0,0,1,.65.65V29.11H7.39V11.65A.65.65,0,0,1,8,11Z" />
        <path d="M.65,17H3.92a.65.65,0,0,1,.65.65V29.11H0V17.62A.65.65,0,0,1,.65,17Z" />
        <path d="M17.78,17.78A7.11,7.11,0,0,0,19.35,29v.14H14.78V14.87a.65.65,0,0,1,.65-.65H18.7a.65.65,0,0,1,.65.65v1.71a7,7,0,0,0-1.57,1.2Z" />
        <path d="M26.74,9.82v7.09a7,7,0,0,0-4-1.21,6.08,6.08,0,0,0-.61,0V9.82a.65.65,0,0,1,.65-.65h3.27a.66.66,0,0,1,.65.65Z" />
        <path d="M29.73,28.43,27,25.68a5.11,5.11,0,0,0-7.82-6.52A5.11,5.11,0,0,0,25.68,27l2.75,2.75a.92.92,0,0,0,1.3,0A.92.92,0,0,0,29.73,28.43Zm-9.27-3.34a3.27,3.27,0,0,1,0-4.63,3.32,3.32,0,0,1,2.32-1,3.28,3.28,0,1,1-2.32,5.59Z" />
      </svg>
    ),
  },
  {
    id: "tax-services",
    titleKey: "taxServicesTitle",
    descriptionKey: "taxServicesDescription",
    featureKeys: [
      "taxServicesFeature1",
      "taxServicesFeature2",
      "taxServicesFeature3",
    ],
    icon: (
      <svg
        viewBox="0 0 30 30"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        fill="currentColor"
      >
        <path d="M15,6.75A8.25,8.25,0,1,0,23.25,15,8.25,8.25,0,0,0,15,6.75Zm-.94,6.79a4.59,4.59,0,0,0,1.35.65c.33.12.67.24,1,.41a2.62,2.62,0,0,1,1.37,1.53,2.85,2.85,0,0,1-.19,2.23,2.63,2.63,0,0,1-1.8,1.32v.78a.83.83,0,0,1-1.65,0v-.8A2.62,2.62,0,0,1,12,17.27a.83.83,0,0,1,1.65,0c0,.43.64.85,1.3.85a1.11,1.11,0,0,0,1.28-1.47.89.89,0,0,0-.49-.55c-.31-.14-.62-.25-.92-.36A5.64,5.64,0,0,1,13,14.8a2.57,2.57,0,0,1-.68-3,2.61,2.61,0,0,1,1.86-1.44V9.54a.83.83,0,0,1,1.65,0v.8A2.63,2.63,0,0,1,18,12.73a.83.83,0,1,1-1.65,0c0-.43-.65-.85-1.31-.85-.94,0-1.15.44-1.22.59a.92.92,0,0,0,.25,1.07Z" />
        <path d="M27.58,24.76l-1.51.35A15.06,15.06,0,0,0,30,15a14.91,14.91,0,0,0-.72-4.61.92.92,0,1,0-1.76.56A13,13,0,0,1,28.16,15a13.16,13.16,0,0,1-3.71,9.15l.63-2.06a.92.92,0,0,0-1.76-.54l-1.53,5a.91.91,0,0,0,.88,1.19.65.65,0,0,0,.2,0L28,26.56a.91.91,0,0,0,.69-1.11.92.92,0,0,0-1.1-.69Z" />
        <path d="M26.84,8.25A.92.92,0,0,0,27.47,8a.94.94,0,0,0,.27-.88L26.56,2a.92.92,0,0,0-1.8.41l.35,1.51a15,15,0,0,0-15-3.12A.9.9,0,0,0,9.57,2a.92.92,0,0,0,1.17.58,13.14,13.14,0,0,1,13.4,3l-2.05-.63a.93.93,0,0,0-.54,1.77l5,1.53a.75.75,0,0,0,.26,0Z" />
        <path d="M2.48,19.05A13.15,13.15,0,0,1,1.84,15,13,13,0,0,1,5.31,6.1L4.71,8a.92.92,0,0,0,.88,1.19.91.91,0,0,0,.88-.65L8,3.56A.93.93,0,0,0,6.92,2.39L1.8,3.57a.92.92,0,1,0,.42,1.79L3.82,5A14.9,14.9,0,0,0,0,15a14.74,14.74,0,0,0,.73,4.62.91.91,0,0,0,.87.64,1,1,0,0,0,.29-.05.91.91,0,0,0,.59-1.16Z" />
        <path d="M19.05,27.52a12.85,12.85,0,0,1-4.05.64,13.09,13.09,0,0,1-9.11-3.67l2,.61a.92.92,0,0,0,.54-1.76l-5-1.54a1,1,0,0,0-.9.21.91.91,0,0,0-.26.88L3.42,28a.9.9,0,0,0,.89.71.75.75,0,0,0,.21,0,.91.91,0,0,0,.69-1.1L4.85,26a15,15,0,0,0,14.77,3.24.93.93,0,0,0-.57-1.76Z" />
      </svg>
    ),
  },
  {
    id: "accounting",
    titleKey: "accountingTitle",
    descriptionKey: "accountingDescription",
    featureKeys: [
      "accountingFeature1",
      "accountingFeature2",
      "accountingFeature3",
    ],
    icon: (
      <svg
        viewBox="0 0 30 30"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        fill="currentColor"
      >
        <path d="M1.92,4.28a.22.22,0,0,1,.2-.11H3.21V.44A.44.44,0,0,1,3.65,0H5.84a.44.44,0,0,1,.44.44V4.17H7.37a.2.2,0,0,1,.19.11.24.24,0,0,1,0,.23L4.93,8.72a.22.22,0,0,1-.37,0L1.93,4.51a.24.24,0,0,1,0-.23Z" />
        <path d="M12.18,4.28a.21.21,0,0,1,.19-.11h1.1V.44A.44.44,0,0,1,13.91,0H16.1a.44.44,0,0,1,.43.44V4.17h1.1a.22.22,0,0,1,.18.34L15.19,8.72a.22.22,0,0,1-.38,0L12.19,4.51a.24.24,0,0,1,0-.23Z" />
        <path d="M22.44,4.28a.21.21,0,0,1,.19-.11h1.1V.44A.44.44,0,0,1,24.16,0h2.19a.44.44,0,0,1,.44.44V4.17h1.1a.2.2,0,0,1,.18.11.24.24,0,0,1,0,.23L25.44,8.72a.22.22,0,0,1-.37,0L22.44,4.51a.24.24,0,0,1,0-.23Z" />
        <path d="M22.15,10.78H7.84a1.53,1.53,0,0,0-1.52,1.53V26.2H8.15V16.78a8.71,8.71,0,0,0,4.16-4.16h5.37a8.75,8.75,0,0,0,4.16,4.16V26.2h1.84V12.31a1.54,1.54,0,0,0-1.53-1.53Z" />
        <path d="M20,25.78a2.88,2.88,0,0,1,0,.42H10c0-.13,0-.28,0-.42a5,5,0,1,1,10,0Z" />
        <path d="M16,17.73a1.46,1.46,0,1,0-2.07,0A1.47,1.47,0,0,0,16,17.73Z" />
        <path d="M29.08,30H.92A.92.92,0,0,1,0,29.08v-7a.92.92,0,0,1,1.84,0v6.1H28.16v-6.1a.92.92,0,1,1,1.84,0v7a.92.92,0,0,1-.92.92Z" />
      </svg>
    ),
  },
  {
    id: "valuation",
    titleKey: "valuationTitle",
    descriptionKey: "valuationDescription",
    featureKeys: [
      "valuationFeature1",
      "valuationFeature2",
      "valuationFeature3",
    ],
    icon: (
      <svg
        viewBox="0 0 30 30"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        fill="currentColor"
      >
        <path d="M16.72,0H13.28a2,2,0,0,0-2,2V5.4a2,2,0,0,0,2,2H14v6.83a8.26,8.26,0,0,1,1-.06c.28,0,.56,0,.84,0V7.36h.88a2,2,0,0,0,2-2V2A2,2,0,0,0,16.72,0Z" />
        <path d="M5.4,7.36H2a2,2,0,0,0-2,2v3.44a2,2,0,0,0,2,2h.8v8a1.57,1.57,0,0,0,1.57,1.57H6.18a8.42,8.42,0,0,1-.09-1.24,5.91,5.91,0,0,1,0-.6H4.6V14.72h.8a2,2,0,0,0,2-2V9.32a2,2,0,0,0-2-2Z" />
        <path d="M28,7.36H24.6a2,2,0,0,0-2,2v3.44a2,2,0,0,0,2,2h.8v7.73H23.89c0,.2,0,.4,0,.6a8.66,8.66,0,0,1-.09,1.25h1.85a1.57,1.57,0,0,0,1.57-1.58v-8H28a2,2,0,0,0,2-2V9.32a2,2,0,0,0-2-2Z" />
        <path d="M15,16.09a7,7,0,1,0,7,7A7,7,0,0,0,15,16.09Zm-.76,5.79a3.4,3.4,0,0,0,1.08.52c.27.1.55.21.84.34A2.07,2.07,0,0,1,17.25,24a2.3,2.3,0,0,1-.15,1.78,2.1,2.1,0,0,1-1.45,1.06v.63a.65.65,0,1,1-1.3,0v-.65a2.1,2.1,0,0,1-1.74-1.91.66.66,0,0,1,.66-.65.65.65,0,0,1,.65.65c0,.36.52.7,1.06.7a1,1,0,0,0,1-.44.94.94,0,0,0,.07-.75.75.75,0,0,0-.41-.45c-.24-.11-.49-.2-.73-.29a4.66,4.66,0,0,1-1.47-.75,2,2,0,0,1-.54-2.42,2.07,2.07,0,0,1,1.49-1.16v-.62a.66.66,0,1,1,1.31,0v.64a2.11,2.11,0,0,1,1.73,1.91.66.66,0,0,1-.66.65.65.65,0,0,1-.65-.65c0-.36-.52-.69-1.06-.69-.76,0-.93.36-1,.47a.74.74,0,0,0,.2.87Z" />
      </svg>
    ),
  },
  {
    id: "legal",
    titleKey: "legalTitle",
    descriptionKey: "legalDescription",
    featureKeys: ["legalFeature1", "legalFeature2", "legalFeature3"],
    icon: (
      <svg
        viewBox="0 0 30 30"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        fill="currentColor"
      >
        <path d="M15,6a9,9,0,1,0,9.05,9A9,9,0,0,0,15,6ZM14,13.4a4.75,4.75,0,0,0,1.48.71c.36.13.73.27,1.14.46a2.78,2.78,0,0,1,1.5,1.67,3.13,3.13,0,0,1-.21,2.45,2.94,2.94,0,0,1-2,1.45V21a.91.91,0,1,1-1.81,0v-.87a2.87,2.87,0,0,1-2.37-2.62.91.91,0,1,1,1.81,0c0,.47.7.93,1.43.93a1.22,1.22,0,0,0,1.4-1.61,1,1,0,0,0-.54-.6c-.34-.15-.68-.28-1-.4a6.34,6.34,0,0,1-2-1,2.83,2.83,0,0,1-.75-3.33,2.86,2.86,0,0,1,2-1.58V9a.91.91,0,0,1,1.81,0v.87a2.89,2.89,0,0,1,2.37,2.63.91.91,0,0,1-1.81,0c0-.48-.72-.94-1.44-.94-1,0-1.26.49-1.34.65A1,1,0,0,0,14,13.4Z" />
        <path d="M30,27.32a2.69,2.69,0,0,1-5.37,0,2.79,2.79,0,0,1,.25-1.13L22.1,23.4a11.4,11.4,0,0,0,1.3-1.3l2.79,2.78a2.78,2.78,0,1,1,1.12-.25A2.68,2.68,0,0,1,30,27.32Z" />
        <path d="M30,2.69a2.69,2.69,0,0,1-2.69,2.69,2.6,2.6,0,0,1-1.12-.26L23.4,7.91A10.72,10.72,0,0,0,22.1,6.6l2.78-2.78a2.87,2.87,0,0,1-.25-1.13,2.69,2.69,0,1,1,5.37,0Z" />
        <path d="M7.9,6.6A10.56,10.56,0,0,0,6.61,7.9L3.82,5.12a2.71,2.71,0,0,1-1.13.26A2.69,2.69,0,1,1,5.37,2.69a2.7,2.7,0,0,1-.25,1.13L7.9,6.61Z" />
        <path d="M5.12,26.19a2.64,2.64,0,0,1,.25,1.13,2.69,2.69,0,1,1-2.68-2.69,2.87,2.87,0,0,1,1.13.25L6.61,22.1A10.56,10.56,0,0,0,7.9,23.4Z" />
      </svg>
    ),
  },
  {
    id: "consulting",
    titleKey: "consultingTitle",
    descriptionKey: "consultingDescription",
    featureKeys: [
      "consultingFeature1",
      "consultingFeature2",
      "consultingFeature3",
    ],
    icon: (
      <svg
        viewBox="0 0 30 30"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        fill="currentColor"
      >
        <path d="M15,0A15,15,0,1,0,30,15,15,15,0,0,0,15,0Zm8.06,7a.79.79,0,0,1-.2.52A55.39,55.39,0,0,0,13.19,23a1.24,1.24,0,0,1-2.25.11,35.8,35.8,0,0,0-4.25-6.49,1.78,1.78,0,0,1,2.66-2.36,32.86,32.86,0,0,1,2.82,3.45,0,0,0,0,0,0,0A46.22,46.22,0,0,1,21.8,6.44.76.76,0,0,1,23.06,7Z" />
      </svg>
    ),
  },
];

const desktopCardVariants: Variants = {
  hidden: (i: number) => ({
    opacity: 0,
    x: i % 3 === 0 ? -60 : i % 3 === 2 ? 60 : 0,
    y: i % 3 === 1 ? 40 : 0,
  }),
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.8,
      delay: (i % 3) * 0.15,
      ease: [0.21, 0.47, 0.32, 0.98] as const,
    },
  }),
};

const headerVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function ServiceCard({
  service,
  index,
  basePath,
  isMobile = false,
}: {
  service: Service;
  index: number;
  basePath: string;
  isMobile?: boolean;
}) {
  const t = useTranslations("main");
  const theme = cardThemes[index % cardThemes.length];

  const cardContent = (
    <Link href={`${basePath}/${service.id}`} className="block h-full">
      <Card
        className={`group relative my-2 border border-transparent ${theme.border} rounded-[32px] bg-gradient-to-br ${theme.bg} shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer
          h-[420px] md:h-[440px] p-6
          md:p-8
          3xl:h-[480px] 3xl:p-9 3xl:rounded-[36px]
          4xl:h-[520px] 4xl:p-10 4xl:rounded-[40px]
          5xl:h-[600px] 5xl:p-12 5xl:rounded-[48px]`}
      >
        <div
          className={`hidden md:block absolute -top-10 -right-10 w-36 h-36 rounded-full opacity-20 blur-2xl ${theme.iconBg} 3xl:w-44 3xl:h-44 4xl:w-52 4xl:h-52 5xl:w-64 5xl:h-64`}
        />

        <div className="flex flex-col h-full relative z-10">
          <div
            className={`flex items-center mb-4 gap-4 md:mb-6 3xl:mb-7 3xl:gap-5 4xl:mb-8 4xl:gap-6 5xl:mb-10 5xl:gap-7`}
          >
            <div
              className={`${theme.iconBg} text-white flex-shrink-0 md:group-hover:scale-105 transition-transform duration-500 ${theme.iconShadow} shadow-lg
                w-11 h-11 p-2.5 rounded-xl
                md:w-12 md:h-12 md:p-3 md:rounded-2xl
                3xl:w-14 3xl:h-14 3xl:p-3.5 3xl:rounded-2xl
                4xl:w-16 4xl:h-16 4xl:p-4 4xl:rounded-3xl
                5xl:w-20 5xl:h-20 5xl:p-5 5xl:rounded-3xl`}
            >
              {service.icon}
            </div>
            <h3
              className={`card-title text-gray-900 font-bold leading-tight
              text-lg
              md:text-xl
              3xl:text-2xl
              4xl:text-[26px]
              5xl:text-3xl`}
            >
              {t(service.titleKey)}
            </h3>
          </div>

          <p
            className={`card-desc text-gray-600 line-clamp-3 md:line-clamp-4
            text-sm mb-6
            md:text-base
            3xl:text-[17px] 3xl:mb-7
            4xl:text-lg 4xl:mb-8
            5xl:text-xl 5xl:mb-10`}
          >
            {t(service.descriptionKey)}
          </p>

          <ul
            className={`mb-auto space-y-3 3xl:space-y-4 4xl:space-y-5 5xl:space-y-6`}
          >
            {service.featureKeys.map((key, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-gray-700 3xl:gap-4 4xl:gap-4 5xl:gap-5"
              >
                <CheckCircle2
                  className={`shrink-0 mt-0.5 ${theme.check}
                    w-4 h-4
                    md:w-[18px] md:h-[18px]
                    3xl:w-5 3xl:h-5
                    4xl:w-6 4xl:h-6
                    5xl:w-7 5xl:h-7`}
                />
                <span
                  className={`card-feature leading-snug
                  text-xs
                  md:text-sm
                  3xl:text-base
                  4xl:text-[17px]
                  5xl:text-lg`}
                >
                  {t(key)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-4 3xl:pt-5 4xl:pt-6 5xl:pt-7">
            <div
              className={`group/link inline-flex items-center relative overflow-hidden rounded-full border ${theme.lightBorder} bg-gradient-to-r ${theme.lightBg} ${theme.text} service-btn shadow-sm transition-all duration-300 group-hover:shadow-lg ${theme.hoverShadow} group-hover:border-transparent group-hover:scale-[1.02]
                gap-2.5 px-5 py-2.5 text-sm
                md:text-base
                3xl:gap-3 3xl:px-6 3xl:py-3 3xl:text-base
                4xl:gap-3.5 4xl:px-7 4xl:py-3.5 4xl:text-[17px]
                5xl:gap-4 5xl:px-8 5xl:py-4 5xl:text-lg`}
            >
              <span
                className={`absolute inset-0 rounded-full bg-gradient-to-r ${theme.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
              <span className="relative z-10 group-hover:text-white transition-colors duration-300 font-semibold">
                {t("servicesLearnMore")}
              </span>
              <ArrowRight
                className={`relative z-10 ${theme.text} group-hover:text-white transition-all duration-300 group-hover:translate-x-1
                  w-4 h-4
                  3xl:w-5 3xl:h-5
                  4xl:w-5 4xl:h-5
                  5xl:w-6 5xl:h-6`}
              />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );

  if (isMobile) {
    return <div className="h-full relative">{cardContent}</div>;
  }

  return (
    <motion.div
      custom={index}
      variants={desktopCardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className="h-full relative my-2"
    >
      {cardContent}
    </motion.div>
  );
}

export default function ServicesSection() {
  const t = useTranslations("main");
  const basePath = "/services";

  return (
    <section className="relative bg-[#f3f5f4] overflow-hidden py-10 md:py-24 3xl:py-28 4xl:py-32 5xl:py-40">
      <div className="max-w-[2000px] mx-auto px-0 md:px-16 lg:px-20 2xl:px-32 3xl:px-44 4xl:px-56 5xl:px-72">
        <div className="flex justify-center mb-10 md:mb-16 3xl:mb-20 4xl:mb-24 5xl:mb-28">
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center gap-3 3xl:gap-4 4xl:gap-5 5xl:gap-6"
          >
            <div className="bg-[#2563eb] h-0.5 w-8 md:w-10 3xl:w-12 4xl:w-14 5xl:w-16" />
            <span className="section-label text-gray-500 text-lg 3xl:text-xl 4xl:text-2xl 5xl:text-3xl">
              {t("servicesSectionLabel")}
            </span>
            <div className="bg-[#2563eb] h-0.5 w-8 md:w-10 3xl:w-12 4xl:w-14 5xl:w-16" />
          </motion.div>
        </div>

        <div className="block md:hidden">
          <Carousel opts={{ align: "start", loop: false }} className="w-full">
            <CarouselContent className="-ml-0 mr-6">
              {services.map((service, index) => (
                <CarouselItem
                  key={service.id}
                  className="pl-6 basis-[85%] sm:basis-[70%]"
                >
                  <ServiceCard
                    service={service}
                    index={index}
                    basePath={basePath}
                    isMobile={true}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 2xl:gap-12 3xl:gap-14 4xl:gap-16 5xl:gap-20">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              basePath={basePath}
              isMobile={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
