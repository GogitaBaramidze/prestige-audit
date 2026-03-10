"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type Clients = {
  name: string;
  logo?: string;
  type?: "image" | "text";
};

const partnersRow1: Clients[] = [
  { name: "Hilton", logo: "/partners/Hilton-logo.png" },
  { name: "Le Meridien", logo: "/partners/Le-meridien.png" },
  { name: "Sheraton", logo: "/partners/Sheraton.png" },
  { name: "Eclipse", logo: "/partners/Eclipse.png" },
  { name: "Legi", logo: "/partners/Legi.webp" },
  { name: "Rogo", logo: "/partners/Rogo.jpg" },
  { name: "GGM", logo: "/partners/GGM.png" },
];

const partnersRow2: Clients[] = [
  { name: "BAU Hospital", logo: "/partners/Bau.jpg" },
  { name: "Adjara Textile", logo: "/partners/Adjara-textile.png" },
  { name: "Stellar Navigation", logo: "/partners/Stellar.png" },
  { name: "BTM Textile", logo: "/partners/Btm.jpg" },
  { name: "Avaliani", logo: "/partners/Avaliani.jpg" },
  { name: "Batumi Boulevard", logo: "/partners/Batumi-Boulevard.jpg" },
  { name: "Gazeti Adjara", logo: "/partners/Gazeti-adjara.png" },
  { name: "Junny", logo: "/partners/Junny.png" },
  { name: "Premium", logo: "/partners/Premium.png" },
];

const partnersRow3: Clients[] = [
  { name: "Kerki", logo: "/partners/Kerki.jpeg" },
  { name: "Like House", logo: "/partners/Like-house.jpeg" },
  { name: "Prime Marine", logo: "/partners/Prime-marine.jpeg" },
  { name: "Shota", logo: "/partners/Shota.jpg" },
  { name: "Xelovnebis Uni", logo: "/partners/Xelovnebis-uni.jpeg" },
];

const LogoCard = ({
  logo,
  name,
  type,
  isTouch,
}: Clients & { isTouch: boolean }) => {
  const isTextLogo = type === "text" || !logo;

  return (
    <div
      className={`my-2 mx-3
        min-w-[140px] h-[70px]
    md:min-w-[180px] md:h-[88px]
    lg:min-w-[200px] lg:h-[100px]
    xl:min-w-[220px] xl:h-[112px]
    3xl:min-w-[240px] 3xl:mx-4 3xl:h-[130px]
    4xl:min-w-[260px] 4xl:mx-5 4xl:h-[150px]
    5xl:min-w-[320px] 5xl:mx-6 5xl:h-[190px]
        ${!isTouch ? "transition-transform duration-300 hover:-translate-y-1 hover:scale-105" : ""}`}
    >
      <Card
        className="flex items-center justify-center w-full h-full bg-white border-none shadow-sm hover:shadow-md transition-shadow duration-300 cursor-default overflow-hidden
        rounded-[24px] p-4
        lg:p-5
        xl:p-6
        3xl:rounded-[28px] 3xl:p-8
        4xl:rounded-[32px] 4xl:p-9
        5xl:rounded-[40px] 5xl:p-11"
      >
        {isTextLogo ? (
          <span
            className={`font-bold text-black
            text-xl
            3xl:text-2xl
            4xl:text-3xl
            5xl:text-4xl
            ${!isTouch ? "transition-colors duration-300 hover:text-blue-600" : ""}`}
          >
            {name}
          </span>
        ) : (
          <img
            src={logo}
            alt={name}
            className="object-contain max-h-full max-w-full w-full h-full rounded-lg"
          />
        )}
      </Card>
    </div>
  );
};

export default function ClientsSection() {
  const t = useTranslations("main");
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    setIsTouch(!window.matchMedia("(hover: hover)").matches);
  }, []);

  return (
    <section
      className="relative z-10 bg-[#f3f5f4] overflow-hidden
      py-10 md:pt-16 pb-32
      3xl:pt-20 3xl:pb-36
      4xl:pt-24 4xl:pb-40
      5xl:pt-32 5xl:pb-52"
    >
      <style>{`
        @keyframes scrollLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left  { animation: scrollLeft  35s linear infinite; }
        .animate-marquee-right { animation: scrollRight 35s linear infinite; }
        .animate-marquee-left-slow  { animation: scrollLeft  45s linear infinite; }
      `}</style>

      <motion.div
        className="mx-auto flex flex-col items-center text-center
          max-w-7xl mb-12
          3xl:max-w-[1600px] 3xl:mb-14
          4xl:max-w-[1800px] 4xl:mb-16
          5xl:max-w-[2100px] 5xl:mb-20"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
      >
        <div className="flex items-center justify-center w-full gap-3 mb-3 3xl:gap-4 4xl:gap-5 5xl:gap-6">
          <div className="h-0.5 bg-[#2563eb] w-8 md:w-10 3xl:w-12 4xl:w-14 5xl:w-16" />
          <span
            className="font-medium uppercase text-gray-500
            text-base md:text-lg tracking-[2px]
            3xl:text-xl 3xl:tracking-[3px]
            4xl:text-2xl 4xl:tracking-[3px]
            5xl:text-3xl 5xl:tracking-[4px]"
          >
            {t("clientsSectionLabel")}
          </span>
          <div className="h-0.5 bg-[#2563eb] w-8 md:w-10 3xl:w-12 4xl:w-14 5xl:w-16" />
        </div>
      </motion.div>

      <div className="relative space-y-6 3xl:space-y-8 4xl:space-y-10 5xl:space-y-12">
        {/* Row 1 — scrolls left */}
        <motion.div
          className="flex overflow-hidden relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" as const }}
        >
          <div className="absolute inset-y-0 left-0 z-10 pointer-events-none bg-gradient-to-r from-[#f3f5f4] to-transparent w-32 3xl:w-40 4xl:w-52 5xl:w-64" />
          <div className="absolute inset-y-0 right-0 z-10 pointer-events-none bg-gradient-to-l from-[#f3f5f4] to-transparent w-32 3xl:w-40 4xl:w-52 5xl:w-64" />
          <div className="flex animate-marquee-left whitespace-nowrap">
            {[...partnersRow1, ...partnersRow1, ...partnersRow1].map((p, i) => (
              <LogoCard key={`r1-${i}`} {...p} isTouch={isTouch} />
            ))}
          </div>
        </motion.div>

        {/* Row 2 — scrolls right */}
        <motion.div
          className="flex overflow-hidden relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" as const }}
        >
          <div className="absolute inset-y-0 left-0 z-10 pointer-events-none bg-gradient-to-r from-[#f3f5f4] to-transparent w-32 3xl:w-40 4xl:w-52 5xl:w-64" />
          <div className="absolute inset-y-0 right-0 z-10 pointer-events-none bg-gradient-to-l from-[#f3f5f4] to-transparent w-32 3xl:w-40 4xl:w-52 5xl:w-64" />
          <div className="flex animate-marquee-right whitespace-nowrap">
            {[...partnersRow2, ...partnersRow2, ...partnersRow2].map((p, i) => (
              <LogoCard key={`r2-${i}`} {...p} isTouch={isTouch} />
            ))}
          </div>
        </motion.div>

        {/* Row 3 — scrolls left (slower) */}
        <motion.div
          className="flex overflow-hidden relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" as const }}
        >
          <div className="absolute inset-y-0 left-0 z-10 pointer-events-none bg-gradient-to-r from-[#f3f5f4] to-transparent w-32 3xl:w-40 4xl:w-52 5xl:w-64" />
          <div className="absolute inset-y-0 right-0 z-10 pointer-events-none bg-gradient-to-l from-[#f3f5f4] to-transparent w-32 3xl:w-40 4xl:w-52 5xl:w-64" />
          <div className="flex animate-marquee-left-slow whitespace-nowrap">
            {[
              ...partnersRow3,
              ...partnersRow3,
              ...partnersRow3,
              ...partnersRow3,
            ].map((p, i) => (
              <LogoCard key={`r3-${i}`} {...p} isTouch={isTouch} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
