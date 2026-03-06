"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { TEAM_MEMBERS } from "../[id]/_components/TeamMembers";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SharedTeamCard from "./SharedTeamCard";

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
    <div className="hidden md:flex flex-wrap justify-center gap-2.5 3xl:gap-3.5 4xl:gap-5 5xl:gap-6">
      {DEPARTMENT_KEYS.map((key) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`rounded-full font-bold uppercase tracking-widest transition-colors duration-200
              px-4 py-2 text-[11px]
              3xl:px-5 3xl:py-2.5 3xl:text-xs
              4xl:px-7 4xl:py-3.5 4xl:text-base
              5xl:px-8 5xl:py-4 5xl:text-lg
              ${
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

  const memberName = (id: string) => {
    try {
      return t(`members.${id}.name`);
    } catch {
      return id;
    }
  };
  const memberTitle = (id: string) => {
    try {
      return t(`members.${id}.title`);
    } catch {
      return "";
    }
  };

  return (
    <section
      className="relative z-20 -mt-24 bg-[#f3f5f4] shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.1)]
      rounded-t-[60px] md:rounded-t-[80px] 3xl:rounded-t-[88px] 4xl:rounded-t-[112px] 5xl:rounded-t-[128px]
      pt-14 3xl:pt-18 4xl:pt-24 5xl:pt-28
      pb-28 3xl:pb-32 4xl:pb-40 5xl:pb-48
      px-10 md:px-16 3xl:px-20 4xl:px-32 5xl:px-36"
    >
      <div className="mx-auto max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[1800px] 5xl:max-w-[2100px]">
        <div className="mb-10 3xl:mb-12 4xl:mb-16 5xl:mb-20">
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

        <div className="flex flex-col md:flex-row justify-between items-center gap-5 3xl:gap-6 4xl:gap-8 5xl:gap-10 mb-10 3xl:mb-12 4xl:mb-16 5xl:mb-20">
          <div className="flex items-center gap-4 3xl:gap-5 4xl:gap-7 5xl:gap-8">
            <div className="bg-[#2563eb] h-0.5 w-7 3xl:w-9 4xl:w-12 5xl:w-14" />
            <h2
              className="font-bold text-gray-900 uppercase tracking-tight
              text-xl
              3xl:text-2xl
              4xl:text-4xl
              5xl:text-5xl"
            >
              {getDeptLabel(activeFilter)}
            </h2>
            <div className="bg-[#2563eb] h-0.5 w-7 3xl:w-9 4xl:w-12 5xl:w-14" />
          </div>
          <p
            className="text-gray-500 font-medium
            text-xs
            3xl:text-sm
            4xl:text-lg
            5xl:text-xl"
          >
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
            gap-5
            3xl:gap-7
            4xl:gap-10
            5xl:gap-12"
        >
          {filtered.map((member, index) => (
            <CardWrapper key={member.id} index={index} isMobile={isMobile}>
              <SharedTeamCard
                name={memberName(member.id)}
                title={memberTitle(member.id)}
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
