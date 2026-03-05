"use client";

import React, { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: Mail,
      title: t("infoEmail"),
      lines: [t("emailValue")],
      color: "bg-cyan-50 text-cyan-600",
    },
    {
      icon: MapPin,
      title: t("infoOffice"),
      lines: [t("addressValue")],
      color: "bg-blue-50 text-blue-600",
    },
  ];

  return (
    <section className="pt-10 pb-12 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <FadeUp className="lg:col-span-4">
            <Card className="rounded-[40px] p-10 border-none shadow-sm h-full flex flex-col bg-white">
              <CardHeader className="p-0 mb-8 text-left">
                <CardTitle className="text-3xl font-bold leading-tight text-gray-900">
                  {t("infoTitle")}
                </CardTitle>
                <p className="text-gray-500 mt-4 text-sm leading-relaxed">
                  {t("infoSubtitle")}
                </p>
              </CardHeader>

              <CardContent className="p-0 space-y-8">
                {contactItems.map((item, i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${item.color}`}
                    >
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-gray-400 font-bold text-[11px] uppercase tracking-widest">
                        {item.title}
                      </h4>
                      {item.lines.map((line, idx) => (
                        <p
                          key={idx}
                          className="text-gray-900 font-semibold text-sm"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="mt-auto pt-10">
                  <div className="bg-[#dbeafe] p-6 rounded-[32px] flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-blue-800">
                        {t("hoursTitle")}
                      </p>
                      <p className="text-[11px] text-blue-600">
                        {t("hoursValue")}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeUp>

          <FadeUp delay={120} className="lg:col-span-8">
            <Card className="border-none shadow-sm rounded-[40px] bg-white overflow-hidden h-full">
              <CardContent className="p-10">
                {submitStatus === "success" && (
                  <Alert className="mb-8 bg-green-50 border-green-100 rounded-2xl">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <AlertDescription className="text-green-800 font-medium ml-2">
                      {t("successMessage")}
                    </AlertDescription>
                  </Alert>
                )}

                {submitStatus === "error" && (
                  <Alert className="mb-8 bg-red-50 border-red-100 rounded-2xl">
                    <AlertDescription className="text-red-800 font-medium ml-2">
                      {t("errorMessage") ??
                        "Something went wrong. Please try again."}
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-sm font-bold text-gray-700 ml-1"
                      >
                        {t("fieldName")}
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder={t("fieldNamePlaceholder")}
                        className="h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-sm font-bold text-gray-700 ml-1"
                      >
                        {t("fieldEmail")}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder={t("fieldEmailPlaceholder")}
                        className="h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-sm font-bold text-gray-700 ml-1"
                      >
                        {t("fieldPhone")}
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t("fieldPhonePlaceholder")}
                        className="h-14 rounded-2xl border-gray-100 bg-gray-50/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="subject"
                        className="text-sm font-bold text-gray-700 ml-1"
                      >
                        {t("fieldService")}
                      </Label>
                      <Select
                        value={formData.subject}
                        onValueChange={(v) =>
                          setFormData({ ...formData, subject: v })
                        }
                      >
                        <SelectTrigger className="h-14 w-full rounded-2xl border-gray-100 bg-gray-50/50">
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
                    <Label
                      htmlFor="message"
                      className="text-sm font-bold text-gray-700 ml-1"
                    >
                      {t("fieldMessage")}
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder={t("fieldMessagePlaceholder")}
                      className="rounded-2xl border-gray-100 bg-gray-50/50 resize-none p-4"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-full py-7 px-10 w-full flex items-center justify-center gap-2 group transition-colors font-bold"
                  >
                    {isSubmitting ? t("submitting") : t("submitBtn")}
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </CardContent>
            </Card>
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
