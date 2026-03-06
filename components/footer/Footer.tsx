"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp, Facebook } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Footer() {
  const pathname = usePathname();
  const t = useTranslations("main");

  if (pathname.includes("admin")) return null;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const navLinks = [
    { name: t("navHome"), href: "/" },
    { name: t("navTeam"), href: "/team" },
    { name: t("navTeachingCenter"), href: "/teaching-center" },
    { name: t("navAbout"), href: "/about" },
    { name: t("navContact"), href: "/contact" },
  ];

  const serviceLinks = [
    {
      name: t("footerServiceFinancialAudit"),
      href: "/services/financial-audit",
    },
    { name: t("footerServiceTax"), href: "/services/tax-services" },
    { name: t("footerServiceAccounting"), href: "/services/accounting" },
    { name: t("footerServiceValuation"), href: "/services/valuation" },
    { name: t("footerServiceLegal"), href: "/services/legal" },
    { name: t("footerServiceConsulting"), href: "/services/consulting" },
  ];

  return (
    <footer
      className="relative w-full z-50 -mt-10 bg-[#0a1a3f] overflow-hidden
      rounded-t-[60px] md:rounded-t-[80px] 3xl:rounded-t-[96px] 4xl:rounded-t-[112px] 5xl:rounded-t-[128px]
      pt-24 3xl:pt-28 4xl:pt-32 5xl:pt-40
      pb-10 3xl:pb-12 4xl:pb-14 5xl:pb-16
      px-5 3xl:px-8 4xl:px-10 5xl:px-12"
    >
      <div
        className="absolute inset-0 z-0 opacity-60 mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: `url('/background.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute top-0 left-1/4 rounded-full bg-blue-600/20 pointer-events-none blur-[120px] w-[600px] h-[400px] 3xl:w-[700px] 3xl:h-[500px] 4xl:w-[800px] 4xl:h-[580px] 5xl:w-[960px] 5xl:h-[680px]" />
      <div className="absolute bottom-0 right-0 rounded-full bg-blue-500/10 pointer-events-none blur-[100px] w-[500px] h-[500px] 3xl:w-[600px] 3xl:h-[600px] 4xl:w-[700px] 4xl:h-[700px] 5xl:w-[860px] 5xl:h-[860px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#061232_90%)] z-0" />

      <div className="relative z-10 mx-auto max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[1800px] 5xl:max-w-[2100px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 3xl:gap-14 4xl:gap-16 5xl:gap-20 mb-10 3xl:mb-12 4xl:mb-14 5xl:mb-16">
          <div className="md:col-span-4 space-y-6 3xl:space-y-7 4xl:space-y-8 5xl:space-y-10 hidden md:block">
            <Link href="/">
              <Image
                src="/PrestigeLogo.png"
                alt="Prestige Audit"
                width={300}
                height={300}
                style={{ objectFit: "contain" }}
                className="-ml-10 -mt-20 w-[300px] 3xl:w-[340px] 4xl:w-[380px] 5xl:w-[440px]"
              />
            </Link>
            <div className="space-y-4 3xl:space-y-5 4xl:space-y-6 5xl:space-y-7">
              <h4 className="text-white/80 font-semibold uppercase tracking-widest text-xs 3xl:text-sm 4xl:text-base 5xl:text-lg">
                {t("footerFollowUs")}
              </h4>
              <div className="flex gap-3 3xl:gap-4 4xl:gap-5">
                <Link
                  href="https://www.facebook.com/prestigeaudit"
                  className="flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-300
                    w-10 h-10
                    3xl:w-12 3xl:h-12
                    4xl:w-14 4xl:h-14
                    5xl:w-16 5xl:h-16"
                >
                  <Facebook className="w-[18px] h-[18px] 3xl:w-5 3xl:h-5 4xl:w-6 4xl:h-6 5xl:w-7 5xl:h-7" />
                </Link>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 flex gap-10 3xl:gap-12 4xl:gap-14 5xl:gap-16">
            <div className="space-y-5 3xl:space-y-6 4xl:space-y-7 5xl:space-y-8 flex-1">
              <h4 className="text-white font-bold text-sm 3xl:text-base 4xl:text-lg 5xl:text-xl">
                {t("footerPages")}
              </h4>
              <ul className="space-y-3 3xl:space-y-4 4xl:space-y-5 5xl:space-y-6 text-blue-100/50 text-sm 3xl:text-base 4xl:text-lg 5xl:text-xl">
                {navLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      suppressHydrationWarning
                      href={item.href}
                      className={`hover:text-white transition-colors duration-200 ${pathname === item.href ? "text-white underline underline-offset-4" : ""}`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5 3xl:space-y-6 4xl:space-y-7 5xl:space-y-8 flex-1">
              <h4 className="text-white font-bold text-sm 3xl:text-base 4xl:text-lg 5xl:text-xl">
                {t("footerServices")}
              </h4>
              <ul className="space-y-3 3xl:space-y-4 4xl:space-y-5 5xl:space-y-6 text-blue-100/50 text-sm 3xl:text-base 4xl:text-lg 5xl:text-xl">
                {serviceLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`hover:text-white transition-colors duration-200 ${pathname === item.href ? "text-white underline underline-offset-4" : ""}`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-3 space-y-5 3xl:space-y-6 4xl:space-y-7 5xl:space-y-8">
            <h4 className="text-white font-bold text-sm 3xl:text-base 4xl:text-lg 5xl:text-xl">
              {t("footerContact")}
            </h4>
            <ul className="space-y-4 3xl:space-y-5 4xl:space-y-6 5xl:space-y-7 text-blue-100/50 text-sm 3xl:text-base 4xl:text-lg 5xl:text-xl">
              <li className="flex items-start gap-2 3xl:gap-3 4xl:gap-3 5xl:gap-4">
                <span className="text-blue-400 mt-0.5">📍</span>
                <span>{t("footerAddress")}</span>
              </li>
              <li className="flex items-start gap-2 3xl:gap-3 4xl:gap-3 5xl:gap-4">
                <span className="text-blue-400 mt-0.5">📞</span>
                <Link
                  href={`tel:${t("footerPhone").replace(/\s/g, "")}`}
                  className="hover:text-white transition-colors duration-200"
                >
                  {t("footerPhone")}
                </Link>
              </li>
              <li className="flex items-start gap-2 3xl:gap-3 4xl:gap-3 5xl:gap-4">
                <span className="text-blue-400 mt-0.5">✉️</span>
                <Link
                  suppressHydrationWarning
                  href={`mailto:${t("footerEmail")}`}
                  className="hover:text-white transition-colors duration-200"
                >
                  {t("footerEmail")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 3xl:pt-12 4xl:pt-14 5xl:pt-16 border-t border-white/5 flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-blue-100/30 text-sm 3xl:text-base 4xl:text-lg 5xl:text-xl">
            {t("footerCopyright")}
          </p>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="absolute flex items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/30 hover:bg-blue-500 hover:-translate-y-1 transition-all active:scale-90
          bottom-10 right-10 w-12 h-12
          3xl:bottom-12 3xl:right-12 3xl:w-14 3xl:h-14 3xl:rounded-2xl
          4xl:bottom-14 4xl:right-14 4xl:w-16 4xl:h-16 4xl:rounded-3xl
          5xl:bottom-16 5xl:right-16 5xl:w-20 5xl:h-20 5xl:rounded-3xl"
      >
        <ArrowUp
          className="w-6 h-6 3xl:w-7 3xl:h-7 4xl:w-8 4xl:h-8 5xl:w-10 5xl:h-10"
          strokeWidth={3}
        />
      </button>
    </footer>
  );
}
