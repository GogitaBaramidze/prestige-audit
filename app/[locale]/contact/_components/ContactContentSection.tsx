"use client";

import React, { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import MapboxMap from "./MapBox";

function FadeUp({
  delay = 0,
  children,
  className,
}: {
  delay?: number;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -40px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

export default function ContactContentSection() {
  const t = useTranslations("contact");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactItems = [
    {
      icon: Phone,
      title: t("infoPhone"),
      lines: [t("phoneValue")],
      iconStyle: { background: "rgba(37,99,235,0.15)", color: "#60a5fa" },
    },
    {
      icon: Mail,
      title: t("infoEmail"),
      lines: [t("emailValue")],
      iconStyle: { background: "rgba(56,182,255,0.12)", color: "#38bdf8" },
    },
    {
      icon: MapPin,
      title: t("infoOffice"),
      lines: [t("addressValue")],
      iconStyle: { background: "rgba(37,99,235,0.15)", color: "#60a5fa" },
    },
  ];

  const inputStyle = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#ffffff",
  };

  const focusHandlers = {
    onFocus: (
      e: React.FocusEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement
      >,
    ) => {
      (e.target as HTMLElement).style.border = "1px solid rgba(59,130,246,0.6)";
      (e.target as HTMLElement).style.background = "rgba(255,255,255,0.09)";
      (e.target as HTMLElement).style.boxShadow =
        "0 0 0 3px rgba(59,130,246,0.1)";
    },
    onBlur: (
      e: React.FocusEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement
      >,
    ) => {
      (e.target as HTMLElement).style.border =
        "1px solid rgba(255,255,255,0.1)";
      (e.target as HTMLElement).style.background = "rgba(255,255,255,0.06)";
      (e.target as HTMLElement).style.boxShadow = "none";
    },
  };

  return (
    <section className="pb-12 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <FadeUp className="lg:col-span-4">
            <div
              className="rounded-[40px] p-10 h-full flex flex-col overflow-hidden"
              style={{
                background:
                  "linear-gradient(145deg, #0d2050 0%, #0a1a3f 45%, #071430 100%)",
                border: "1px solid rgba(59,130,246,0.2)",
                boxShadow:
                  "0 24px 60px rgba(10,26,63,0.25), inset 0 1px 0 rgba(255,255,255,0.06)",
                position: "relative",
              }}
            >
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: "-60px",
                  right: "-60px",
                  width: "200px",
                  height: "200px",
                  background:
                    "radial-gradient(circle, rgba(59,130,246,0.16) 0%, transparent 70%)",
                  borderRadius: "50%",
                  pointerEvents: "none",
                }}
              />

              <h2
                className="text-3xl font-bold leading-tight mb-8"
                style={{ color: "#ffffff" }}
              >
                {t("infoTitle")}
              </h2>

              <div className="space-y-8 flex-1">
                {contactItems.map((item, i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                      style={item.iconStyle}
                    >
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <h4
                        className="font-bold text-[11px] uppercase tracking-widest mb-0.5"
                        style={{ color: "rgba(147,197,253,0.6)" }}
                      >
                        {item.title}
                      </h4>
                      {item.lines.map((line, idx) => (
                        <p
                          key={idx}
                          className="font-semibold text-sm"
                          style={{ color: "rgba(255,255,255,0.85)" }}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <div
                  className="p-6 rounded-[32px] flex items-center gap-4"
                  style={{
                    background: "rgba(37,99,235,0.2)",
                    border: "1px solid rgba(59,130,246,0.25)",
                  }}
                >
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                    }}
                  >
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p
                      className="text-xs font-bold"
                      style={{ color: "#93c5fd" }}
                    >
                      {t("hoursTitle")}
                    </p>
                    <p
                      className="text-[11px]"
                      style={{ color: "rgba(147,197,253,0.65)" }}
                    >
                      {t("hoursValue")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={120} className="lg:col-span-8">
            <div
              className="rounded-[40px] overflow-hidden h-full"
              style={{
                background:
                  "linear-gradient(145deg, #0d2050 0%, #0a1a3f 45%, #071430 100%)",
                border: "1px solid rgba(59,130,246,0.2)",
                boxShadow:
                  "0 24px 60px rgba(10,26,63,0.25), inset 0 1px 0 rgba(255,255,255,0.06)",
                position: "relative",
              }}
            >
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  bottom: "-50px",
                  right: "-50px",
                  width: "220px",
                  height: "220px",
                  background:
                    "radial-gradient(circle, rgba(37,99,235,0.13) 0%, transparent 70%)",
                  borderRadius: "50%",
                  pointerEvents: "none",
                }}
              />

              <div className="p-10 relative">
                {submitStatus === "success" && (
                  <div
                    className="mb-8 rounded-2xl px-4 py-3 flex items-center gap-3"
                    style={{
                      background: "rgba(34,197,94,0.12)",
                      border: "1px solid rgba(34,197,94,0.2)",
                    }}
                  >
                    <CheckCircle2
                      className="w-5 h-5 shrink-0"
                      style={{ color: "#4ade80" }}
                    />
                    <span
                      className="font-medium text-sm"
                      style={{ color: "#86efac" }}
                    >
                      {t("successMessage")}
                    </span>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div
                    className="mb-8 rounded-2xl px-4 py-3"
                    style={{
                      background: "rgba(239,68,68,0.12)",
                      border: "1px solid rgba(239,68,68,0.2)",
                    }}
                  >
                    <span
                      className="font-medium text-sm"
                      style={{ color: "#fca5a5" }}
                    >
                      {t("errorMessage") ??
                        "Something went wrong. Please try again."}
                    </span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        className="block text-sm font-bold ml-1"
                        style={{ color: "rgba(147,197,253,0.7)" }}
                      >
                        {t("fieldName")}
                      </label>
                      <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder={t("fieldNamePlaceholder")}
                        className="w-full h-14 rounded-2xl px-4 text-sm transition-all outline-none placeholder:text-white/20"
                        style={inputStyle}
                        {...focusHandlers}
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        className="block text-sm font-bold ml-1"
                        style={{ color: "rgba(147,197,253,0.7)" }}
                      >
                        {t("fieldEmail")}
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder={t("fieldEmailPlaceholder")}
                        className="w-full h-14 rounded-2xl px-4 text-sm transition-all outline-none placeholder:text-white/20"
                        style={inputStyle}
                        {...focusHandlers}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        className="block text-sm font-bold ml-1"
                        style={{ color: "rgba(147,197,253,0.7)" }}
                      >
                        {t("fieldPhone")}
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t("fieldPhonePlaceholder")}
                        className="w-full h-14 rounded-2xl px-4 text-sm transition-all outline-none placeholder:text-white/20"
                        style={inputStyle}
                        {...focusHandlers}
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        className="block text-sm font-bold ml-1"
                        style={{ color: "rgba(147,197,253,0.7)" }}
                      >
                        {t("fieldService")}
                      </label>
                      <Select
                        value={formData.subject}
                        onValueChange={(v) =>
                          setFormData({ ...formData, subject: v })
                        }
                      >
                        <SelectTrigger
                          className="h-14 w-full rounded-2xl text-sm outline-none border-0"
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: formData.subject
                              ? "#ffffff"
                              : "rgba(255,255,255,0.2)",
                          }}
                        >
                          <SelectValue
                            placeholder={t("fieldServicePlaceholder")}
                          />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl">
                          <SelectItem value="financial-audit">
                            {t("departments.financial-audit")}
                          </SelectItem>
                          <SelectItem value="tax-services">
                            {t("departments.tax-services")}
                          </SelectItem>
                          <SelectItem value="accounting-services">
                            {t("departments.accounting-services")}
                          </SelectItem>
                          <SelectItem value="valuation-services">
                            {t("departments.valuation-services")}
                          </SelectItem>
                          <SelectItem value="legal-support">
                            {t("departments.legal-support")}
                          </SelectItem>
                          <SelectItem value="business-consulting">
                            {t("departments.business-consulting")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      className="block text-sm font-bold ml-1"
                      style={{ color: "rgba(147,197,253,0.7)" }}
                    >
                      {t("fieldMessage")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder={t("fieldMessagePlaceholder")}
                      className="w-full rounded-2xl px-4 py-3 text-sm transition-all outline-none resize-none placeholder:text-white/20"
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.border =
                          "1px solid rgba(59,130,246,0.6)";
                        e.target.style.background = "rgba(255,255,255,0.09)";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(59,130,246,0.1)";
                      }}
                      onBlur={(e) => {
                        e.target.style.border =
                          "1px solid rgba(255,255,255,0.1)";
                        e.target.style.background = "rgba(255,255,255,0.06)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center cursor-pointer justify-center gap-2 rounded-full py-4 px-10 font-bold text-sm text-white transition-all duration-300 disabled:opacity-60 hover:scale-[1.01] active:scale-[0.99] group"
                    style={{
                      background:
                        "linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #1d4ed8 100%)",
                      boxShadow:
                        "0 4px 20px rgba(37,99,235,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 8px 28px rgba(37,99,235,0.55), inset 0 1px 0 rgba(255,255,255,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 4px 20px rgba(37,99,235,0.4), inset 0 1px 0 rgba(255,255,255,0.15)";
                    }}
                  >
                    {isSubmitting ? t("submitting") : t("submitBtn")}
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={200}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-0.5 bg-[#2563eb]" />
            <span className="text-[#2563eb] font-bold uppercase tracking-widest text-xs">
              {t("mapLabel")}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
            {t("mapTitle")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              {t("mapTitleHighlight")}
            </span>
          </h2>
          <p className="text-slate-500 text-sm md:text-base mb-8 max-w-2xl">
            {t("mapSubtitle")}
          </p>

          <MapboxMap
            latitude={41.64240373778514}
            longitude={41.62775985779333}
            title={t("mapMarkerTitle")}
            address={t("addressValue")}
            zoom={16}
            enable3D={true}
            defaultView="3d"
            markerColor="#3b82f6"
            showDirections={true}
            className="w-full h-[350px] sm:h-[450px] lg:h-[500px]"
          />
        </FadeUp>
      </div>
    </section>
  );
}
