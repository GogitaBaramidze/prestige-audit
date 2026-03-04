"use client";
import { motion } from "framer-motion";
import AboutHeroSection from "./_components/AboutHeroSection";
import AboutContentSection from "./_components/AboutContentSection";
import VideoSection from "../(main)/_components/VideoSection";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <AboutHeroSection />
      <motion.div
        className="relative z-20 -mt-24 bg-[#f3f5f4] rounded-t-[60px] md:rounded-t-[80px] pt-16 pb-32 shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.1)]"
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <AboutContentSection />
        <VideoSection />
      </motion.div>
    </div>
  );
}
