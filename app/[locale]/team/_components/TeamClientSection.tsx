"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { TEAM_MEMBERS } from "../[id]/_components/TeamMembers";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DEPARTMENT_KEYS = [
  "financial-audit",
  "tax-services",
  "accounting-services",
  "valuation-services",
  "legal-support",
  "business-consulting",
] as const;

type DepartmentKey = (typeof DEPARTMENT_KEYS)[number];

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
}

interface TeamCardProps {
  name: string;
  title: string;
  departmentLabel: string;
  image: string;
  slug: string;
  viewProfileLabel: string;
}

const TeamCard = React.memo(
  ({
    name,
    title,
    departmentLabel,
    image,
    slug,
    viewProfileLabel,
  }: TeamCardProps) => (
    <>
      {/* Mobile */}
      <Link
        href={`/team/${slug}`}
        className="block md:hidden"
        aria-label={name}
      >
        <div className="relative aspect-[4/5] w-[95%] mx-auto overflow-hidden rounded-2xl bg-gray-900">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover object-top"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-4 pb-4 pt-16 pointer-events-none">
            <h3 className="text-sm font-bold text-white leading-snug drop-shadow-md">
              {name}
            </h3>
            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-white/75 drop-shadow">
              {title}
            </p>
          </div>
        </div>
      </Link>

      {/* Desktop */}
      <div className="hidden md:block group relative aspect-[4/5] w-[95%] mx-auto cursor-pointer overflow-hidden rounded-2xl bg-gray-900">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-in-out group-hover:scale-105 will-change-transform"
          loading="lazy"
          decoding="async"
        />

        {/* Default state: name + title visible */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-4 pb-4 pt-16 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
          <h3 className="text-sm font-bold text-white leading-snug drop-shadow-md">
            {name}
          </h3>
          <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-white/75 drop-shadow">
            {title}
          </p>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out pointer-events-none group-hover:pointer-events-auto">
          <div className="absolute inset-y-0 left-0 w-0 group-hover:w-full transition-all duration-500 ease-in-out bg-black/30 backdrop-blur-md flex flex-col items-center justify-center p-5 overflow-hidden">
            <span className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-cyan-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200 text-center break-words drop-shadow">
              {departmentLabel}
            </span>
            <h3 className="text-center text-base font-bold text-white leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-[250ms] break-words drop-shadow-md">
              {name}
            </h3>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-[290ms] text-center break-words drop-shadow">
              {title}
            </p>
            <Link
              href={`/team/${slug}`}
              className="mt-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-[330ms]"
            >
              <div className="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-bold text-[#0a1a3f] transition-colors duration-200 hover:bg-cyan-300">
                {viewProfileLabel}
                <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  ),
);
TeamCard.displayName = "TeamCard";

function DesktopFilterBar({
  active,
  onChange,
  getLabel,
}: {
  active: DepartmentKey;
  onChange: (key: DepartmentKey) => void;
  getLabel: (key: DepartmentKey) => string;
}) {
  return (
    <div className="hidden md:flex flex-wrap justify-center gap-3">
      {DEPARTMENT_KEYS.map((key) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${
              isActive
                ? "text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/20"
                : "text-gray-500 bg-white border border-gray-200 hover:border-blue-300 hover:text-blue-600"
            }`}
          >
            {getLabel(key)}
          </button>
        );
      })}
    </div>
  );
}

function MobileFilterSelect({
  active,
  onChange,
  getLabel,
}: {
  active: DepartmentKey;
  onChange: (key: DepartmentKey) => void;
  getLabel: (key: DepartmentKey) => string;
}) {
  return (
    <div className="flex md:hidden w-full">
      <Select
        value={active}
        onValueChange={(v) => onChange(v as DepartmentKey)}
      >
        <SelectTrigger className="w-full rounded-full border border-gray-200 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500">
          <SelectValue placeholder={getLabel(active)} />
        </SelectTrigger>
        <SelectContent className="rounded-xl border border-gray-200 shadow-xl">
          {DEPARTMENT_KEYS.map((key) => (
            <SelectItem
              key={key}
              value={key}
              className="text-xs font-bold uppercase tracking-widest cursor-pointer"
            >
              {getLabel(key)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function CardWrapper({
  index,
  isMobile,
  children,
}: {
  index: number;
  isMobile: boolean;
  children: React.ReactNode;
}) {
  if (isMobile) {
    return (
      <div
        className="animate-fadeInUp"
        style={{ animationDelay: `${index * 60}ms`, animationFillMode: "both" }}
      >
        {children}
      </div>
    );
  }
  return <DesktopAnimatedCard index={index}>{children}</DesktopAnimatedCard>;
}

function DesktopAnimatedCard({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -60px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const fromLeft = index % 2 === 0;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: fromLeft ? -80 : 80, filter: "blur(5px)" }}
      animate={visible ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
      transition={{
        duration: 0.9,
        delay: (index % 4) * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export default function TeamClientSection() {
  const t = useTranslations("team");
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();

  const rawTeam = searchParams.get("team");
  const activeFilter: DepartmentKey =
    (DEPARTMENT_KEYS.find((k) => k === rawTeam) as DepartmentKey) ??
    DEPARTMENT_KEYS[0];

  const handleFilter = useCallback(
    (key: DepartmentKey) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("team", key);
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const filtered = TEAM_MEMBERS.filter((m) =>
    m.departments.includes(activeFilter),
  );
  const getDeptLabel = (key: DepartmentKey) => t(`departments.${key}`);

  return (
    <section className="relative z-20 -mt-24 bg-[#f3f5f4] rounded-t-[60px] md:rounded-t-[80px] pt-16 pb-32 px-6 shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <DesktopFilterBar
            active={activeFilter}
            onChange={handleFilter}
            getLabel={getDeptLabel}
          />
          <MobileFilterSelect
            active={activeFilter}
            onChange={handleFilter}
            getLabel={getDeptLabel}
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex items-center gap-5">
            <div className="w-8 h-0.5 bg-[#2563eb]" />
            <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">
              {getDeptLabel(activeFilter)}
            </h2>
            <div className="w-8 h-0.5 bg-[#2563eb]" />
          </div>
          <p className="text-gray-500 text-sm font-medium">
            {t(
              filtered.length === 1
                ? "ui.showingMembers"
                : "ui.showingMembersPlural",
              { count: filtered.length },
            )}
            {" · "}
            {t("ui.clickToView")}
          </p>
        </div>

        <div
          key={activeFilter}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filtered.map((member, index) => (
            <CardWrapper key={member.id} index={index} isMobile={isMobile}>
              <TeamCard
                name={t(`members.${member.id}.name`)}
                title={t(`members.${member.id}.title`)}
                departmentLabel={getDeptLabel(
                  member.departments[0] as DepartmentKey,
                )}
                image={member.image}
                slug={member.id}
                viewProfileLabel={t("ui.viewProfile")}
              />
            </CardWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
