"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname as useNextPathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

// Localization Imports
import { useLocale } from "next-intl";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

// Sub-components/Data (Assuming these exist in your project)
import { services, ServicesMegaMenu } from "./Services-mega-menu";
import { locales, usePathname, useRouter } from "@/i18n/routing";

type Locale = "en" | "ka";

const LanguageFlags: Record<Locale, { src: string; alt: string }> = {
  en: { src: "/svg/English.svg", alt: "English" },
  ka: { src: "/svg/Georgian.svg", alt: "Georgian" },
};

const languageNames: Record<Locale, string> = {
  en: "English",
  ka: "ქართული",
};

const navLinkStyle = (isActive: boolean) => ({
  color: isActive ? "#4A9FF5" : "rgba(255, 255, 255, 0.9)",
});

const mobileLinkStyle = (isActive: boolean) => ({
  color: isActive ? "#4A9FF5" : "rgba(255, 255, 255, 0.8)",
  backgroundColor: isActive ? "rgba(74, 159, 245, 0.1)" : "transparent",
});

const navItems = [
  { name: "Team", href: "/team" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale() as Locale;

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;
    router.push(pathname, { locale: newLocale });
  };

  const currentFlag = LanguageFlags[currentLocale];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 rounded-xl h-10 px-3 transition-all duration-300 border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] text-white group">
          <Image
            src={currentFlag.src}
            alt={currentFlag.alt}
            width={20}
            height={20}
            className="h-5 w-5 rounded-sm object-cover"
          />
          <span className="text-sm font-semibold uppercase tracking-wider hidden sm:inline-block">
            {currentLocale}
          </span>
          <ChevronDown className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-40 p-1.5 border-[rgba(255,255,255,0.1)] bg-[#0a1a3f]/95 backdrop-blur-xl text-white shadow-2xl rounded-2xl z-[60]"
      >
        <div className="grid gap-1">
          {(locales as unknown as Locale[]).map((locale) => {
            const flag = LanguageFlags[locale];
            const isActive = locale === currentLocale;
            return (
              <Button
                key={locale}
                variant="ghost"
                className={cn(
                  "justify-start gap-3 w-full rounded-xl hover:bg-white/10 hover:text-white transition-all",
                  isActive && "bg-white/5 text-[#4A9FF5]",
                )}
                onClick={() => handleLocaleChange(locale)}
              >
                <Image
                  src={flag.src}
                  alt={flag.alt}
                  width={20}
                  height={20}
                  className="h-5 w-5 rounded-sm"
                />
                <span className="text-sm font-medium">
                  {languageNames[locale]}
                </span>
              </Button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default function Header() {
  const pathname = useNextPathname();
  const [open, setOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleServicesMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesMenuOpen(true);
  };

  const handleServicesMouseLeave = () => {
    closeTimer.current = setTimeout(() => setServicesMenuOpen(false), 200);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(e.target as Node)
      ) {
        setServicesMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isServicesActive =
    pathname === "/services" || pathname.startsWith("/services/");
  const navLinkClass =
    "group relative px-6 py-2 text-sm font-semibold transition-colors duration-300";

  return (
    <header
      className="absolute top-0 left-0 right-0 z-50"
      style={{ padding: "clamp(24px, 2vw, 48px) clamp(24px, 3vw, 64px) 0" }}
    >
      <div className="relative max-w-[2000px] mx-auto">
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "rgba(10, 26, 63, 0.15)",
            backdropFilter: "blur(15px)",
            WebkitBackdropFilter: "blur(15px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "24px",
          }}
        />

        <div
          className="relative flex items-center justify-between px-6 md:px-10 2xl:px-16"
          style={{ height: "clamp(80px, 6vh, 110px)" }}
        >
          <Link
            href="/"
            className="relative z-10 transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Image
              src="/PrestigeLogo.png"
              alt="Logo"
              width={140}
              height={140}
              style={{ objectFit: "contain" }}
              className="cursor-pointer mt-2 w-56 -ml-6 md:ml-0 h-56 md:w-64 md:h-64 2xl:w-72 2xl:h-72"
            />
          </Link>

          <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-4">
            <Link
              href="/"
              className={navLinkClass}
              style={navLinkStyle(pathname === "/")}
            >
              <span className="relative z-10 group-hover:text-[#fff] transition-colors">
                Home
              </span>
              {pathname === "/" && (
                <span className="absolute bottom-0 left-6 right-6 h-0.5 bg-[#4A9FF5] rounded-full" />
              )}
            </Link>

            {/* Services Dropdown */}
            <div
              ref={servicesRef}
              className="relative"
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
            >
              <button
                className={cn(
                  navLinkClass,
                  "flex items-center gap-1.5 bg-transparent border-none cursor-pointer",
                )}
                style={navLinkStyle(isServicesActive || servicesMenuOpen)}
                onClick={() => setServicesMenuOpen((v) => !v)}
              >
                <span className="relative z-10 group-hover:text-[#fff] transition-colors">
                  Services
                </span>
                <ChevronDown
                  size={14}
                  className={cn(
                    "transition-transform duration-200 opacity-70",
                    servicesMenuOpen && "rotate-180",
                  )}
                />
                {isServicesActive && (
                  <span className="absolute bottom-0 left-6 right-6 h-0.5 bg-[#4A9FF5] rounded-full" />
                )}
              </button>
              <ServicesMegaMenu isOpen={servicesMenuOpen} pathname={pathname} />
            </div>

            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={navLinkClass}
                  style={navLinkStyle(isActive)}
                >
                  <span className="relative z-10 group-hover:text-[#fff] transition-colors">
                    {item.name}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-6 right-6 h-0.5 bg-[#4A9FF5] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Side - Desktop LocaleSwitcher */}
          <div className="hidden lg:flex items-center gap-6">
            <LocaleSwitcher />
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center gap-3">
            <LocaleSwitcher />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  className="flex items-center justify-center w-10 h-10 rounded-xl border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.1)] text-[#fff] transition-colors hover:bg-[rgba(255,255,255,0.2)]"
                  aria-label="Open menu"
                >
                  <Menu size={20} />
                </button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[300px] !bg-[#0a1a3f] !border-l !border-[rgba(255,255,255,0.1)] p-0 overflow-y-auto"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(255,255,255,0.1)]">
                    <Link href="/" onClick={() => setOpen(false)}>
                      <Image
                        src="/PrestigeLogo.png"
                        alt="Logo"
                        width={100}
                        height={40}
                        style={{ objectFit: "contain" }}
                      />
                    </Link>
                    <button
                      onClick={() => setOpen(false)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-[rgba(255,255,255,0.2)] text-[rgba(255,255,255,0.7)] hover:text-[#fff] hover:bg-[rgba(255,255,255,0.1)] transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <nav className="flex flex-col px-4 py-6 gap-1">
                    <Link
                      href="/"
                      onClick={() => setOpen(false)}
                      className="flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                      style={mobileLinkStyle(pathname === "/")}
                    >
                      {pathname === "/" && (
                        <span className="w-1 h-4 bg-[#4A9FF5] rounded-full mr-3 shrink-0" />
                      )}
                      Home
                    </Link>

                    {/* Mobile Services Accordion */}
                    <div>
                      <button
                        onClick={() => setMobileServicesOpen((prev) => !prev)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                        style={mobileLinkStyle(isServicesActive)}
                      >
                        <span className="flex items-center">
                          {isServicesActive && (
                            <span className="w-1 h-4 bg-[#4A9FF5] rounded-full mr-3 shrink-0" />
                          )}
                          Services
                        </span>
                        <ChevronDown
                          size={16}
                          className={cn(
                            "text-[rgba(255,255,255,0.4)] transition-transform duration-300",
                            mobileServicesOpen && "rotate-180",
                          )}
                        />
                      </button>

                      <div
                        className={cn(
                          "overflow-hidden transition-all duration-300",
                          mobileServicesOpen
                            ? "max-h-[600px] opacity-100"
                            : "max-h-0 opacity-0",
                        )}
                      >
                        <Link
                          href="/services"
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 mx-2 px-4 py-2.5 mt-1 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)]"
                        >
                          <span className="font-bold uppercase text-[rgba(255,255,255,0.4)] text-xs tracking-widest">
                            All Services
                          </span>
                          <ChevronRight
                            size={12}
                            className="text-[rgba(255,255,255,0.3)] ml-auto"
                          />
                        </Link>
                        <div className="mt-1 flex flex-col gap-0.5 pb-2">
                          {services.map((svc) => {
                            const isActive = pathname === `/services/${svc.id}`;
                            return (
                              <Link
                                key={svc.id}
                                href={`/services/${svc.id}`}
                                onClick={() => setOpen(false)}
                                className={cn(
                                  "flex items-center gap-3 mx-2 px-4 py-2.5 rounded-xl transition-all",
                                  isActive
                                    ? "bg-[rgba(255,255,255,0.08)]"
                                    : "hover:bg-[rgba(255,255,255,0.05)]",
                                )}
                              >
                                <div
                                  className={cn(
                                    "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-[#fff] bg-gradient-to-br",
                                    svc.gradient,
                                  )}
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    {(svc.icon as any).props.children}
                                  </svg>
                                </div>
                                <span
                                  className="text-sm font-semibold"
                                  style={{
                                    color: isActive
                                      ? "#fff"
                                      : "rgba(255,255,255,0.7)",
                                  }}
                                >
                                  {svc.title}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                        style={mobileLinkStyle(pathname === item.href)}
                      >
                        {pathname === item.href && (
                          <span className="w-1 h-4 bg-[#4A9FF5] rounded-full mr-3 shrink-0" />
                        )}
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
