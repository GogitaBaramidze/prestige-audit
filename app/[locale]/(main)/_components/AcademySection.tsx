"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function AcademySection() {
  const t = useTranslations("main");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    setIsTouch(!window.matchMedia("(hover: hover)").matches);
  }, []);

  return (
    <motion.section
      className="relative w-full z-[50] rounded-t-[50px] md:rounded-t-[60px] lg:rounded-t-[80px] -mt-10 bg-[#0a1a3f] pt-16 md:pt-20 lg:pt-24 pb-20 md:pb-28 lg:pb-38 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      {/* Background — plain div, no motion needed */}
      <div
        className="absolute inset-0 z-0 opacity-40 mix-blend-overlay"
        style={{
          backgroundImage: `url('/background.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Blur orbs — desktop only, too expensive on mobile */}
      <div className="hidden md:block absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-blue-500/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="hidden md:block absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-cyan-400/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#0a1a3f_90%)] z-0" />

      <div className="max-w-[2000px] mx-auto px-6 sm:px-10 md:px-16 lg:px-20 2xl:px-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — y only on mobile, x on desktop */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: isTouch ? 20 : 0, x: isTouch ? 0 : -40 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-900/40">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80"
                alt="Academy Learning"
                className="w-full h-[320px] md:h-[420px] lg:h-[500px] object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0a1a3f]/80 via-transparent to-blue-500/10" />

              <motion.div
                className="absolute bottom-5 left-5 flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.3 }}
              >
                <div className="w-8 h-8 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-blue-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-none">
                    {t("academyBadgeDuration")}
                  </p>
                  <p className="text-white/50 text-xs mt-0.5">
                    {t("academyBadgeCert")}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right — y only on mobile, x on desktop */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, y: isTouch ? 20 : 0, x: isTouch ? 0 : 40 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12 }}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-blue-400/40" />
              <span className="text-blue-300 text-xs font-medium tracking-widest uppercase">
                {t("academySectionLabel")}
              </span>
            </div>

            <h2 className="text-white mb-5 text-2xl md:text-3xl lg:text-4xl font-medium leading-tight tracking-tight">
              {t("academyHeadingRegular")}{" "}
              <span className="italic text-blue-300 font-light">
                {t("academyHeadingItalic")}
              </span>
              <br />
              {t("academyHeadingSuffix")}
            </h2>

            <p className="text-white/60 mb-8 max-w-xl text-base leading-relaxed">
              {t("academyBody")}
            </p>

            <ul className="space-y-3 mb-10">
              {[
                "academyFeature1",
                "academyFeature2",
                "academyFeature3",
                "academyFeature4",
              ].map((key, i) => (
                <motion.li
                  key={i}
                  className="flex items-center gap-3 text-white/75 text-sm md:text-base"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                >
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
                    <svg
                      className="w-2.5 h-2.5 text-blue-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  {t(key)}
                </motion.li>
              ))}
            </ul>

            <button
              onClick={() => {
                setFormSubmitted(false);
                setModalOpen(true);
              }}
              className={`group relative inline-flex items-center gap-3 self-start bg-blue-600 text-white font-medium px-8 py-4 rounded-xl text-sm md:text-base transition-all duration-300 ${
                !isTouch
                  ? "hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.98]"
                  : "active:bg-blue-500"
              }`}
            >
              <span className="relative z-10">{t("academyCta")}</span>
              <svg
                className={`w-4 h-4 ${!isTouch ? "transition-transform group-hover:translate-x-1" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>

      <Dialog
        open={modalOpen}
        onOpenChange={(open) => {
          setModalOpen(open);
          if (!open) setFormSubmitted(false);
        }}
      >
        <DialogContent className="bg-[#0a1a3f] border border-white/10 text-white max-w-lg w-[95%] rounded-2xl p-6 md:p-10">
          {!formSubmitted ? (
            <>
              <DialogHeader className="mb-8">
                <DialogTitle className="text-white text-xl md:text-2xl font-semibold tracking-tight">
                  {t("academyModalTitle")}
                </DialogTitle>
                <DialogDescription className="text-white/50 text-sm mt-2">
                  {t("academyModalDesc")}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      labelKey: "academyModalFieldName",
                      placeholderKey: "academyModalFieldNamePlaceholder",
                      type: "text",
                    },
                    {
                      labelKey: "academyModalFieldPhone",
                      placeholderKey: "academyModalFieldPhonePlaceholder",
                      type: "tel",
                    },
                  ].map((field) => (
                    <div key={field.labelKey}>
                      <label className="block text-white/40 mb-1.5 text-[10px] font-bold uppercase tracking-widest">
                        {t(field.labelKey)}
                      </label>
                      <input
                        type={field.type}
                        placeholder={t(field.placeholderKey)}
                        className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-white/40 mb-1.5 text-[10px] font-bold uppercase tracking-widest">
                    {t("academyModalFieldEmail")}
                  </label>
                  <input
                    type="email"
                    placeholder={t("academyModalFieldEmailPlaceholder")}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                  />
                </div>
              </div>

              <button
                onClick={() => setFormSubmitted(true)}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20"
              >
                {t("academyModalSubmit")}
              </button>
            </>
          ) : (
            <motion.div
              className="text-center py-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">
                {t("academyModalSuccessTitle")}
              </h3>
              <p className="text-white/50 text-sm">
                {t("academyModalSuccessBody")}
              </p>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </motion.section>
  );
}
