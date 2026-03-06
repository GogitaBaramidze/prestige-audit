"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ContactHeroSection() {
  const t = useTranslations("contact");

  return (
    <motion.section
      className="relative w-full bg-[#0a1a3f] pt-40 pb-48 px-5 overflow-hidden text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="absolute inset-0 z-0 opacity-40 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url('/background.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
      />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-400/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#0a1a3f_90%)] z-0" />

      <div className="mx-auto max-w-7xl relative z-10 px-6">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-blue-200 text-md md:text:lg font-bold uppercase tracking-widest mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <MessageCircle size={14} />
          {t("heroBadge")}
        </motion.div>
      </div>
    </motion.section>
  );
}
