"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, Send } from "lucide-react";

const steps = [
  { number: "01", titleKey: "tcStep1Title", descKey: "tcStep1Desc" },
  { number: "02", titleKey: "tcStep2Title", descKey: "tcStep2Desc" },
  { number: "03", titleKey: "tcStep3Title", descKey: "tcStep3Desc" },
  { number: "04", titleKey: "tcStep4Title", descKey: "tcStep4Desc" },
];

function StepCard({
  step,
  index,
  t,
}: {
  step: (typeof steps)[0];
  index: number;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <motion.div
      className="relative flex gap-4 3xl:gap-5 4xl:gap-6 5xl:gap-7 group"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.09 }}
    >
      <div className="flex flex-col items-center">
        <div
          className="rounded-full border-2 border-[#0a1a3f] bg-gray-100 flex items-center justify-center shrink-0 group-hover:bg-[#0a1a3f] transition-colors duration-300 z-10
            w-10 h-10
            3xl:w-12 3xl:h-12
            4xl:w-14 4xl:h-14
            5xl:w-16 5xl:h-16"
        >
          <span
            className="font-black tracking-widest text-[#0a1a3f] group-hover:text-white transition-colors duration-300
              text-[10px]
              3xl:text-xs
              4xl:text-sm
              5xl:text-base"
          >
            {step.number}
          </span>
        </div>
        {index < steps.length - 1 && (
          <div className="w-px flex-1 mt-1.5 bg-gradient-to-b from-[#0a1a3f]/20 to-transparent min-h-[36px] 3xl:min-h-[44px] 4xl:min-h-[52px] 5xl:min-h-[60px]" />
        )}
      </div>

      <div className="pb-7 3xl:pb-8 4xl:pb-10 5xl:pb-12">
        <h3
          className="font-bold text-[#0a1a3f] mb-1 leading-snug
            text-[15px]
            3xl:text-base
            4xl:text-lg
            5xl:text-xl"
        >
          {t(step.titleKey)}
        </h3>
        <p
          className="text-gray-500 leading-relaxed max-w-sm
            text-[13px]
            3xl:text-sm 3xl:max-w-md
            4xl:text-base 4xl:max-w-lg
            5xl:text-lg 5xl:max-w-xl"
        >
          {t(step.descKey)}
        </p>
      </div>
    </motion.div>
  );
}

function EnrollmentForm({ t }: { t: ReturnType<typeof useTranslations> }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) return;
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: "Teaching Center Enrollment",
          message: formData.message,
        }),
      });
      if (res.ok) setSubmitted(true);
      else setError(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center text-center py-12 3xl:py-16 4xl:py-20 5xl:py-24 px-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div
          className="rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mb-4 3xl:mb-5 4xl:mb-6
            w-14 h-14
            3xl:w-16 3xl:h-16
            4xl:w-20 4xl:h-20
            5xl:w-24 5xl:h-24"
        >
          <CheckCircle2 className="text-blue-500 w-7 h-7 3xl:w-8 3xl:h-8 4xl:w-10 4xl:h-10 5xl:w-12 5xl:h-12" />
        </div>
        <h3
          className="font-bold text-[#0a1a3f] mb-1.5
            text-lg 3xl:text-xl 4xl:text-2xl 5xl:text-3xl"
        >
          {t("academyModalSuccessTitle")}
        </h3>
        <p className="text-gray-400 text-sm 3xl:text-base 4xl:text-lg 5xl:text-xl">
          {t("academyModalSuccessBody")}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4 3xl:space-y-5 4xl:space-y-6 5xl:space-y-7">
      {error && (
        <div className="text-sm 3xl:text-base 4xl:text-lg text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          Something went wrong. Please try again.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 3xl:gap-4 4xl:gap-5 5xl:gap-6">
        <div>
          <label
            className="block font-black uppercase text-gray-400 mb-1.5 3xl:mb-2
            text-[9px] tracking-[0.18em]
            3xl:text-[10px] 3xl:tracking-[0.2em]
            4xl:text-xs
            5xl:text-sm"
          >
            {t("academyModalFieldName")}
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t("academyModalFieldNamePlaceholder")}
            className="w-full border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a1a3f]/15 focus:border-[#0a1a3f] transition-all
              px-3.5 py-2.5 text-sm
              3xl:px-4 3xl:py-3 3xl:text-sm 3xl:rounded-xl
              4xl:px-5 4xl:py-3.5 4xl:text-base 4xl:rounded-2xl
              5xl:px-6 5xl:py-4 5xl:text-lg 5xl:rounded-2xl"
          />
        </div>
        <div>
          <label
            className="block font-black uppercase text-gray-400 mb-1.5 3xl:mb-2
            text-[9px] tracking-[0.18em]
            3xl:text-[10px] 3xl:tracking-[0.2em]
            4xl:text-xs
            5xl:text-sm"
          >
            {t("academyModalFieldPhone")}
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={t("academyModalFieldPhonePlaceholder")}
            className="w-full border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a1a3f]/15 focus:border-[#0a1a3f] transition-all
              px-3.5 py-2.5 text-sm
              3xl:px-4 3xl:py-3 3xl:text-sm 3xl:rounded-xl
              4xl:px-5 4xl:py-3.5 4xl:text-base 4xl:rounded-2xl
              5xl:px-6 5xl:py-4 5xl:text-lg 5xl:rounded-2xl"
          />
        </div>
      </div>

      <div>
        <label
          className="block font-black uppercase text-gray-400 mb-1.5 3xl:mb-2
          text-[9px] tracking-[0.18em]
          3xl:text-[10px] 3xl:tracking-[0.2em]
          4xl:text-xs
          5xl:text-sm"
        >
          {t("academyModalFieldEmail")}
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t("academyModalFieldEmailPlaceholder")}
          className="w-full border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a1a3f]/15 focus:border-[#0a1a3f] transition-all
            px-3.5 py-2.5 text-sm
            3xl:px-4 3xl:py-3 3xl:text-sm 3xl:rounded-xl
            4xl:px-5 4xl:py-3.5 4xl:text-base 4xl:rounded-2xl
            5xl:px-6 5xl:py-4 5xl:text-lg 5xl:rounded-2xl"
        />
      </div>

      <div>
        <label
          className="block font-black uppercase text-gray-400 mb-1.5 3xl:mb-2
          text-[9px] tracking-[0.18em]
          3xl:text-[10px] 3xl:tracking-[0.2em]
          4xl:text-xs
          5xl:text-sm"
        >
          {t("tcFormMessageLabel")}
        </label>
        <textarea
          rows={3}
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={t("tcFormMessagePlaceholder")}
          className="w-full border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a1a3f]/15 focus:border-[#0a1a3f] transition-all resize-none
            px-3.5 py-2.5 text-sm
            3xl:px-4 3xl:py-3 3xl:text-sm 3xl:rounded-xl
            4xl:px-5 4xl:py-3.5 4xl:text-base 4xl:rounded-2xl
            5xl:px-6 5xl:py-4 5xl:text-lg 5xl:rounded-2xl"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full flex items-center justify-center bg-[#0a1a3f] hover:bg-[#112454] text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-60 hover:shadow-lg hover:shadow-[#0a1a3f]/20 hover:scale-[1.01] active:scale-[0.99]
          gap-2.5 py-3.5 text-sm
          3xl:gap-3 3xl:py-4 3xl:text-base 3xl:rounded-xl
          4xl:gap-3.5 4xl:py-5 4xl:text-lg 4xl:rounded-2xl
          5xl:gap-4 5xl:py-6 5xl:text-xl 5xl:rounded-2xl"
      >
        {loading ? (
          <span className="border-2 border-white/30 border-t-white rounded-full animate-spin w-4 h-4 3xl:w-5 3xl:h-5 4xl:w-6 4xl:h-6" />
        ) : (
          <>
            {t("academyModalSubmit")}
            <Send className="w-3.5 h-3.5 3xl:w-4 3xl:h-4 4xl:w-5 4xl:h-5 5xl:w-6 5xl:h-6" />
          </>
        )}
      </button>
    </div>
  );
}

export default function TeachingCenterContentSection() {
  const t = useTranslations("teaching");

  return (
    <section
      className="
        py-16 px-6 md:px-5 2xl:px-29
        3xl:py-20 3xl:px-12
        4xl:py-28 4xl:px-16
        5xl:py-36 5xl:px-20"
    >
      <div className="mx-auto max-w-[2400px]">
        <motion.div
          className="flex items-center mb-12 3xl:mb-14 4xl:mb-18 5xl:mb-24
            gap-3 3xl:gap-4 4xl:gap-5 5xl:gap-6"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-px bg-[#0a1a3f] w-8 3xl:w-10 4xl:w-12 5xl:w-14" />
          <span
            className="font-black uppercase text-[#0a1a3f]
              text-[10px] tracking-[0.25em]
              3xl:text-xs 3xl:tracking-[0.28em]
              4xl:text-sm 4xl:tracking-[0.3em]
              5xl:text-base 5xl:tracking-[0.32em]"
          >
            {t("academySectionLabel")}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 3xl:gap-24 4xl:gap-28 5xl:gap-32 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-10 3xl:mb-12 4xl:mb-14 5xl:mb-16"
            >
              <h2
                className="font-bold text-[#0a1a3f] leading-tight mb-3
                  text-2xl md:text-3xl
                  3xl:text-4xl
                  4xl:text-5xl
                  5xl:text-6xl"
              >
                {t("tcHowItWorksTitle")}
              </h2>
              <p
                className="text-gray-500 leading-relaxed max-w-md
                  text-[13px]
                  3xl:text-sm 3xl:max-w-lg
                  4xl:text-base 4xl:max-w-xl
                  5xl:text-lg 5xl:max-w-2xl"
              >
                {t("tcHowItWorksSubtitle")}
              </p>
            </motion.div>

            <div>
              {steps.map((step, i) => (
                <StepCard key={step.number} step={step} index={i} t={t} />
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <div
              className="sticky bg-[#f3f5f4] border border-gray-200/60 shadow-lg shadow-gray-100/80
                top-28 3xl:top-32 4xl:top-36 5xl:top-40
                rounded-[28px] p-7 md:p-8
                3xl:rounded-[36px] 3xl:p-10
                4xl:rounded-[44px] 4xl:p-12
                5xl:rounded-[52px] 5xl:p-14"
            >
              <div className="mb-6 3xl:mb-7 4xl:mb-8 5xl:mb-10">
                <div
                  className="inline-flex items-center rounded-full bg-blue-50 border border-blue-100/80 mb-3 3xl:mb-4
                    gap-2 px-3 py-1.5
                    3xl:gap-2.5 3xl:px-4 3xl:py-2
                    4xl:gap-3 4xl:px-5 4xl:py-2.5
                    5xl:gap-3 5xl:px-6 5xl:py-3"
                >
                  <div className="w-1.5 h-1.5 3xl:w-2 3xl:h-2 4xl:w-2.5 4xl:h-2.5 rounded-full bg-blue-500 animate-pulse" />
                  <span
                    className="font-black uppercase text-blue-600
                      text-[9px] tracking-widest
                      3xl:text-[10px]
                      4xl:text-xs
                      5xl:text-sm"
                  >
                    {t("tcFormBadge")}
                  </span>
                </div>
                <h3
                  className="font-bold text-[#0a1a3f] mb-1
                    text-[17px]
                    3xl:text-xl
                    4xl:text-2xl
                    5xl:text-3xl"
                >
                  {t("academyModalTitle")}
                </h3>
                <p className="text-gray-400 text-[13px] 3xl:text-sm 4xl:text-base 5xl:text-lg">
                  {t("academyModalDesc")}
                </p>
              </div>

              <div className="h-px bg-gray-100 mb-6 3xl:mb-7 4xl:mb-8 5xl:mb-10" />

              <EnrollmentForm t={t} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
