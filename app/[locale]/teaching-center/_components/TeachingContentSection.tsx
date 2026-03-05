"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, Send } from "lucide-react";

const steps = [
  {
    number: "01",
    titleKey: "tcStep1Title",
    descKey: "tcStep1Desc",
  },
  {
    number: "02",
    titleKey: "tcStep2Title",
    descKey: "tcStep2Desc",
  },
  {
    number: "03",
    titleKey: "tcStep3Title",
    descKey: "tcStep3Desc",
  },
  {
    number: "04",
    titleKey: "tcStep4Title",
    descKey: "tcStep4Desc",
  },
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
      className="relative flex gap-6 group"
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full border-2 border-[#0a1a3f] bg-white flex items-center justify-center shrink-0 group-hover:bg-[#0a1a3f] transition-colors duration-300 z-10">
          <span className="text-xs font-black tracking-widest text-[#0a1a3f] group-hover:text-white transition-colors duration-300">
            {step.number}
          </span>
        </div>
        {index < steps.length - 1 && (
          <div className="w-px flex-1 mt-2 bg-gradient-to-b from-[#0a1a3f]/20 to-transparent min-h-[48px]" />
        )}
      </div>

      <div className="pb-10">
        <h3 className="text-lg font-bold text-[#0a1a3f] mb-2 leading-snug">
          {t(step.titleKey)}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
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

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center text-center py-16 px-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-[#0a1a3f] mb-2">
          {t("academyModalSuccessTitle")}
        </h3>
        <p className="text-gray-400 text-sm">{t("academyModalSuccessBody")}</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-5">
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          Something went wrong. Please try again.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.18em] text-gray-400 mb-2">
            {t("academyModalFieldName")}
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t("academyModalFieldNamePlaceholder")}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0a1a3f]/20 focus:border-[#0a1a3f] transition-all bg-gray-50/50"
          />
        </div>
        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.18em] text-gray-400 mb-2">
            {t("academyModalFieldPhone")}
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={t("academyModalFieldPhonePlaceholder")}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0a1a3f]/20 focus:border-[#0a1a3f] transition-all bg-gray-50/50"
          />
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-black uppercase tracking-[0.18em] text-gray-400 mb-2">
          {t("academyModalFieldEmail")}
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t("academyModalFieldEmailPlaceholder")}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0a1a3f]/20 focus:border-[#0a1a3f] transition-all bg-gray-50/50"
        />
      </div>

      <div>
        <label className="block text-[10px] font-black uppercase tracking-[0.18em] text-gray-400 mb-2">
          {t("tcFormMessageLabel")}
        </label>
        <textarea
          rows={4}
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={t("tcFormMessagePlaceholder")}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0a1a3f]/20 focus:border-[#0a1a3f] transition-all bg-gray-50/50 resize-none"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 bg-[#0a1a3f] hover:bg-[#112454] text-white font-semibold py-4 rounded-xl transition-all duration-300 text-sm disabled:opacity-60 hover:shadow-lg hover:shadow-[#0a1a3f]/20 hover:scale-[1.01] active:scale-[0.99]"
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            {t("academyModalSubmit")}
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
}

export default function TeachingCenterContentSection() {
  const t = useTranslations("main");

  return (
    <section className="bg-white py-20 md:py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-8 h-px bg-[#0a1a3f]" />
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#0a1a3f]">
            {t("academySectionLabel")}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#0a1a3f] leading-tight mb-4">
                {t("tcHowItWorksTitle")}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
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
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <div className="sticky top-28 border border-gray-100 rounded-3xl p-8 md:p-10 shadow-xl shadow-gray-100/80">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                    {t("tcFormBadge")}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#0a1a3f] mb-1">
                  {t("academyModalTitle")}
                </h3>
                <p className="text-gray-400 text-sm">{t("academyModalDesc")}</p>
              </div>

              <EnrollmentForm t={t} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
