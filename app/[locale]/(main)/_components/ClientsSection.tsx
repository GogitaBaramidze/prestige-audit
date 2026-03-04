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
  { name: "Hilton", logo: "./partners/Hilton-logo.png" },
  { name: "Le Meridien", logo: "./partners/Le-meridien.png" },
  { name: "Sheraton", logo: "./partners/Sheraton.png" },
  { name: "Eclipse", logo: "./partners/Eclipse.png" },
];

const partnersRow2: Clients[] = [
  { name: "Rogo", logo: "./partners/Rogo.jpg" },
  { name: "BAU Hospital", type: "text" },
  { name: "Adjara Textile", type: "text" },
  { name: "BTM Textile", type: "text" },
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
      className={`my-2 min-w-[180px] md:min-w-[220px] mx-3 ${!isTouch ? "transition-transform duration-300 hover:-translate-y-1 hover:scale-105" : ""}`}
    >
      <Card className="flex items-center justify-center h-[100px] bg-white border-none rounded-[24px] shadow-sm hover:shadow-md transition-shadow duration-300 p-6 cursor-default">
        {isTextLogo ? (
          <span
            className={`text-xl font-bold text-black ${!isTouch ? "transition-colors duration-300 hover:text-blue-600" : ""}`}
          >
            {name}
          </span>
        ) : (
          <img src={logo} alt={name} className="h-20 w-20 object-contain" />
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
    <section className="relative z-10 bg-[#f3f5f4] py-10 md:pt-16 pb-32 overflow-hidden">
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
      `}</style>

      <motion.div
        className="max-w-7xl mx-auto mb-12 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
      >
        <div className="flex items-center justify-center w-full gap-3 mb-3">
          <div className="w-8 md:w-10 h-0.5 bg-[#2563eb]" />
          <span className="text-base md:text-lg font-medium uppercase tracking-[2px] text-gray-500">
            {t("clientsSectionLabel")}
          </span>
          <div className="w-8 md:w-10 h-0.5 bg-[#2563eb]" />
        </div>
      </motion.div>

      <div className="relative space-y-6">
        <motion.div
          className="flex overflow-hidden relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" as const }}
        >
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#f3f5f4] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#f3f5f4] to-transparent z-10 pointer-events-none" />
          <div className="flex animate-marquee-left whitespace-nowrap">
            {[...partnersRow1, ...partnersRow1, ...partnersRow1].map((p, i) => (
              <LogoCard key={`r1-${i}`} {...p} isTouch={isTouch} />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="flex overflow-hidden relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" as const }}
        >
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#f3f5f4] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#f3f5f4] to-transparent z-10 pointer-events-none" />
          <div className="flex animate-marquee-right whitespace-nowrap">
            {[...partnersRow2, ...partnersRow2, ...partnersRow2].map((p, i) => (
              <LogoCard key={`r2-${i}`} {...p} isTouch={isTouch} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
