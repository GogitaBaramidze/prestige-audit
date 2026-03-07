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
      className="relative w-full z-[50] -mt-10 bg-[#0a1a3f] overflow-hidden
        rounded-t-[50px] md:rounded-t-[60px] lg:rounded-t-[80px] 3xl:rounded-t-[96px] 4xl:rounded-t-[112px] 5xl:rounded-t-[128px]
        pt-16 md:pt-20 lg:pt-24 3xl:pt-28 4xl:pt-32 5xl:pt-40
        pb-20 md:pb-28 lg:pb-38 3xl:pb-44 4xl:pb-52 5xl:pb-64"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <div
        className="absolute inset-0 z-0 opacity-40 mix-blend-overlay"
        style={{
          backgroundImage: `url('/background.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="hidden md:block absolute top-1/4 left-1/4 rounded-full bg-blue-500/30 pointer-events-none w-[300px] h-[300px] blur-[100px] 3xl:w-[400px] 3xl:h-[400px] 4xl:w-[480px] 4xl:h-[480px] 5xl:w-[580px] 5xl:h-[580px]" />
      <div className="hidden md:block absolute bottom-1/4 right-1/4 rounded-full bg-cyan-400/20 pointer-events-none w-[250px] h-[250px] blur-[80px] 3xl:w-[320px] 3xl:h-[320px] 4xl:w-[400px] 4xl:h-[400px] 5xl:w-[480px] 5xl:h-[480px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#0a1a3f_90%)] z-0" />

      <div className="relative z-10 mx-auto px-6 sm:px-10 md:px-16 lg:px-20 2xl:px-32 3xl:px-44 4xl:px-56 5xl:px-72 max-w-[2000px] 3xl:max-w-[2200px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-20 3xl:gap-24 4xl:gap-28 5xl:gap-36">
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: isTouch ? 20 : 0, x: isTouch ? 0 : -40 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div
              className="relative overflow-hidden border border-white/10 shadow-2xl shadow-blue-900/40
              rounded-2xl md:rounded-3xl
              3xl:rounded-[32px]
              4xl:rounded-[40px]
              5xl:rounded-[48px]"
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80"
                alt="Academy Learning"
                className="w-full object-cover
                  h-[320px] md:h-[420px] lg:h-[500px]
                  3xl:h-[580px]
                  4xl:h-[660px]
                  5xl:h-[780px]"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0a1a3f]/80 via-transparent to-blue-500/10" />

              <motion.div
                className="absolute flex items-center border border-white/20 bg-white/10 backdrop-blur-md
                  bottom-5 left-5 gap-3 rounded-xl px-4 py-3
                  3xl:bottom-6 3xl:left-6 3xl:gap-4 3xl:rounded-2xl 3xl:px-5 3xl:py-4
                  4xl:bottom-7 4xl:left-7 4xl:gap-5 4xl:px-6 4xl:py-5
                  5xl:bottom-8 5xl:left-8 5xl:gap-6 5xl:rounded-2xl 5xl:px-7 5xl:py-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.3 }}
              >
                <div
                  className="rounded-full bg-blue-400/20 flex items-center justify-center flex-shrink-0
                  w-8 h-8
                  3xl:w-10 3xl:h-10
                  4xl:w-12 4xl:h-12
                  5xl:w-14 5xl:h-14"
                >
                  <svg
                    className="text-blue-300 w-4 h-4 3xl:w-5 3xl:h-5 4xl:w-6 4xl:h-6 5xl:w-7 5xl:h-7"
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
                  <p className="text-white font-semibold leading-none text-sm 3xl:text-base 4xl:text-lg 5xl:text-xl">
                    {t("academyBadgeDuration")}
                  </p>
                  <p className="text-white/50 mt-0.5 text-xs 3xl:text-sm 4xl:text-base 5xl:text-lg">
                    {t("academyBadgeCert")}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, y: isTouch ? 20 : 0, x: isTouch ? 0 : 40 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12 }}
          >
            <div className="inline-flex items-center gap-3 3xl:gap-4 4xl:gap-5 mb-6 3xl:mb-7 4xl:mb-8 5xl:mb-10">
              <span className="h-px bg-blue-400/40 w-8 3xl:w-10 4xl:w-12 5xl:w-14" />
              <span className="text-blue-300 font-medium tracking-widest uppercase text-xs 3xl:text-sm 4xl:text-base 5xl:text-lg">
                {t("academySectionLabel")}
              </span>
            </div>

            <h2
              className="text-white font-medium leading-tight tracking-tight mb-5 3xl:mb-6 4xl:mb-7 5xl:mb-9
              text-2xl md:text-3xl lg:text-4xl
              3xl:text-5xl
              4xl:text-6xl
              5xl:text-7xl"
            >
              {t("academyHeadingRegular")}{" "}
              <span className="italic text-blue-300 font-light">
                {t("academyHeadingItalic")}
              </span>
              <br />
              {t("academyHeadingSuffix")}
            </h2>

            <p
              className="text-white/60 leading-relaxed mb-8 3xl:mb-10 4xl:mb-12 5xl:mb-14
              text-base max-w-xl
              3xl:text-lg 3xl:max-w-2xl
              4xl:text-xl 4xl:max-w-2xl
              5xl:text-2xl 5xl:max-w-3xl"
            >
              {t("academyBody")}
            </p>

            <ul className="space-y-3 3xl:space-y-4 4xl:space-y-5 5xl:space-y-6 mb-10 3xl:mb-12 4xl:mb-14 5xl:mb-16">
              {[
                "academyFeature1",
                "academyFeature2",
                "academyFeature3",
                "academyFeature4",
              ].map((key, i) => (
                <motion.li
                  key={i}
                  className="flex items-center text-white/75
                    gap-3 text-sm md:text-base
                    3xl:gap-4 3xl:text-lg
                    4xl:gap-4 4xl:text-xl
                    5xl:gap-5 5xl:text-2xl"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                >
                  <span
                    className="rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0
                    w-5 h-5
                    3xl:w-6 3xl:h-6
                    4xl:w-7 4xl:h-7
                    5xl:w-8 5xl:h-8"
                  >
                    <svg
                      className="text-blue-300 w-2.5 h-2.5 3xl:w-3 3xl:h-3 4xl:w-3.5 4xl:h-3.5 5xl:w-4 5xl:h-4"
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
              className={`group relative inline-flex cursor-pointer items-center self-start bg-blue-600 text-white font-medium rounded-xl transition-all duration-300
                gap-3 px-8 py-4 text-sm md:text-base
                3xl:gap-4 3xl:px-10 3xl:py-5 3xl:text-lg 3xl:rounded-2xl
                4xl:gap-5 4xl:px-12 4xl:py-6 4xl:text-xl 4xl:rounded-2xl
                5xl:gap-6 5xl:px-14 5xl:py-7 5xl:text-2xl 5xl:rounded-3xl
                ${!isTouch ? "hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.98]" : "active:bg-blue-500"}`}
            >
              <span className="relative z-10">{t("academyCta")}</span>
              <svg
                className={`w-4 h-4 3xl:w-5 3xl:h-5 4xl:w-6 4xl:h-6 5xl:w-7 5xl:h-7 ${!isTouch ? "transition-transform group-hover:translate-x-1" : ""}`}
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
        <DialogContent className="bg-[#0a1a3f] border border-white/10 text-white rounded-2xl w-[95%] max-w-lg p-6 md:p-10">
          {!formSubmitted ? (
            <>
              <DialogHeader className="mb-8">
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
