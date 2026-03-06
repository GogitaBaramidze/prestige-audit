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
      className="relative flex gap-4 group"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.09 }}
    >
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full border-2 border-[#0a1a3f] bg-gray-100 flex items-center justify-center shrink-0 group-hover:bg-[#0a1a3f] transition-colors duration-300 z-10">
          <span className="text-[10px] font-black tracking-widest text-[#0a1a3f] group-hover:text-white transition-colors duration-300">
            {step.number}
          </span>
        </div>
        {index < steps.length - 1 && (
          <div className="w-px flex-1 mt-1.5 bg-gradient-to-b from-[#0a1a3f]/20 to-transparent min-h-[36px]" />
        )}
      </div>

      <div className="pb-7">
        <h3 className="text-[15px] font-bold text-[#0a1a3f] mb-1 leading-snug">
          {t(step.titleKey)}
        </h3>
        <p className="text-gray-500 text-[13px] leading-relaxed max-w-sm">
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
        className="flex flex-col items-center justify-center text-center py-12 px-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-14 h-14 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-7 h-7 text-blue-500" />
        </div>
        <h3 className="text-lg font-bold text-[#0a1a3f] mb-1.5">
          {t("academyModalSuccessTitle")}
        </h3>
        <p className="text-gray-400 text-sm">{t("academyModalSuccessBody")}</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          Something went wrong. Please try again.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[9px] font-black uppercase tracking-[0.18em] text-gray-400 mb-1.5">
            {t("academyModalFieldName")}
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t("academyModalFieldNamePlaceholder")}
            className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0a1a3f]/15 focus:border-[#0a1a3f] transition-all bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-[9px] font-black uppercase tracking-[0.18em] text-gray-400 mb-1.5">
            {t("academyModalFieldPhone")}
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={t("academyModalFieldPhonePlaceholder")}
            className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0a1a3f]/15 focus:border-[#0a1a3f] transition-all bg-gray-50"
          />
        </div>
      </div>

      <div>
        <label className="block text-[9px] font-black uppercase tracking-[0.18em] text-gray-400 mb-1.5">
          {t("academyModalFieldEmail")}
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t("academyModalFieldEmailPlaceholder")}
          className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0a1a3f]/15 focus:border-[#0a1a3f] transition-all bg-gray-50"
        />
      </div>

      <div>
        <label className="block text-[9px] font-black uppercase tracking-[0.18em] text-gray-400 mb-1.5">
          {t("tcFormMessageLabel")}
        </label>
        <textarea
          rows={3}
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={t("tcFormMessagePlaceholder")}
          className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0a1a3f]/15 focus:border-[#0a1a3f] transition-all bg-gray-50 resize-none"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2.5 bg-[#0a1a3f] hover:bg-[#112454] text-white font-semibold py-3.5 rounded-xl transition-all duration-300 text-sm disabled:opacity-60 hover:shadow-lg hover:shadow-[#0a1a3f]/20 hover:scale-[1.01] active:scale-[0.99]"
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            {t("academyModalSubmit")}
            <Send className="w-3.5 h-3.5" />
          </>
        )}
      </button>
    </div>
  );
}

export default function TeachingCenterContentSection() {
  const t = useTranslations("teaching");

  return (
    <section className="py-16 px-6 ">
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-3 mb-12"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-8 h-px bg-[#0a1a3f]" />
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#0a1a3f]">
            {t("academySectionLabel")}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* ── Left: steps ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-[#0a1a3f] leading-tight mb-3">
                {t("tcHowItWorksTitle")}
              </h2>
              <p className="text-gray-500 text-[13px] leading-relaxed max-w-md">
                {t("tcHowItWorksSubtitle")}
              </p>
            </motion.div>

            <div>
              {steps.map((step, i) => (
                <StepCard key={step.number} step={step} index={i} t={t} />
              ))}
            </div>
          </div>

          {/* ── Right: form card ── */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <div className="sticky top-28 bg-[#f3f5f4] border border-gray-200/60 rounded-[28px] p-7 md:p-8 shadow-lg shadow-gray-100/80">
              {/* Card header */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100/80 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-blue-600">
                    {t("tcFormBadge")}
                  </span>
                </div>
                <h3 className="text-[17px] font-bold text-[#0a1a3f] mb-1">
                  {t("academyModalTitle")}
                </h3>
                <p className="text-gray-400 text-[13px]">
                  {t("academyModalDesc")}
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100 mb-6" />

              <EnrollmentForm t={t} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
