// ✅ Server component — no "use client", no Framer bundle
import { Info } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function AboutHeroSection() {
  const t = await getTranslations("about");

  return (
    <section className="relative w-full bg-[#0a1a3f] pt-40 pb-32 md:pb-40 px-5 overflow-hidden text-center">
      {/* Background image — pure CSS, no JS */}
      <div
        className="absolute inset-0 z-0 opacity-40 mix-blend-overlay pointer-events-none hero-bg-scale"
        style={{
          backgroundImage: `url('/background.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Glows — desktop only via media query in CSS */}
      <div className="hero-glow-1 absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="hero-glow-2 absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-400/20 rounded-full blur-[80px] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10 px-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-blue-200 text-xs font-bold uppercase tracking-widest mb-8 hero-badge-in">
          <Info size={14} />
          {t("heroBadge")}
        </div>
      </div>

      <style>{`
        @keyframes heroBgScale {
          from { transform: scale(1.08); }
          to   { transform: scale(1); }
        }
        @keyframes heroBadgeIn {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-bg-scale {
          animation: heroBgScale 1.5s cubic-bezier(0.16,1,0.3,1) both;
        }
        .hero-badge-in {
          animation: heroBadgeIn 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s both;
        }
        /* Suppress heavy glows on mobile — saves GPU layers */
        @media (max-width: 767px) {
          .hero-glow-1 { display: none; }
          .hero-glow-2 { display: none; }
          .hero-bg-scale { animation: none; }
          .hero-badge-in { animation: none; opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-bg-scale, .hero-badge-in { animation: none !important; opacity: 1 !important; }
        }
      `}</style>
    </section>
  );
}
