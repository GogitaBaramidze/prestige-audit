"use client";

import React, { useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { TEAM_MEMBERS } from "../[id]/_components/TeamMembers";
 

const DEPARTMENT_KEYS = [
  "financial-audit",
  "tax-services",
  "accounting-services",
  "valuation-services",
  "legal-support",
  "business-consulting",
] as const;

type DepartmentKey = (typeof DEPARTMENT_KEYS)[number];

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
    <div className="group relative aspect-[4/5] w-[95%] mx-auto cursor-pointer overflow-hidden rounded-2xl bg-gray-900">
      <img
        src={image}
        alt={name}
        className="h-full w-full object-cover object-top transition-transform duration-700 ease-in-out group-hover:scale-105"
        loading="eager"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent px-4 pb-4 pt-12 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
        <h3 className="text-sm font-bold text-white leading-snug drop-shadow-md">
          {name}
        </h3>
      </div>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out pointer-events-none group-hover:pointer-events-auto">
        <div className="absolute inset-y-0 left-0 w-0 group-hover:w-full transition-all duration-500 ease-in-out bg-black/30 backdrop-blur-md flex flex-col items-center justify-center p-5 overflow-hidden">
          <span className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-cyan-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200 whitespace-nowrap drop-shadow">
            {departmentLabel}
          </span>
          <h3 className="text-center text-base font-bold text-white leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-[250ms] whitespace-nowrap drop-shadow-md">
            {name}
          </h3>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-[290ms] whitespace-nowrap drop-shadow">
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
  ),
);
TeamCard.displayName = "TeamCard";

function FilterBar({
  active,
  onChange,
  getLabel,
}: {
  active: DepartmentKey;
  onChange: (key: DepartmentKey) => void;
  getLabel: (key: DepartmentKey) => string;
}) {
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-5 md:gap-3"
      initial={{ opacity: 0, y: -16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {DEPARTMENT_KEYS.map((key) => {
        const isActive = active === key;
        return (
          <motion.button
            key={key}
            onClick={() => onChange(key)}
            whileTap={{ scale: 0.95 }}
            className={`relative px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors duration-200 overflow-hidden ${
              isActive
                ? "text-white shadow-lg shadow-blue-500/20"
                : "text-gray-500 bg-white border border-gray-200 hover:border-blue-300 hover:text-blue-600"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full z-0"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{getLabel(key)}</span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}

function AnimatedCard({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const fromLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: fromLeft ? -80 : 80, filter: "blur(5px)" }}
      animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
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
    <motion.section
      className="relative z-20 -mt-24 bg-[#f3f5f4] rounded-t-[60px] md:rounded-t-[80px] pt-16 pb-32 px-6 shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.1)]"
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <FilterBar
            active={activeFilter}
            onChange={handleFilter}
            getLabel={getDeptLabel}
          />
        </div>

        <motion.div
          className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center gap-5">
            <motion.div
              className="w-8 h-0.5 bg-[#2563eb]"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
            <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">
              {getDeptLabel(activeFilter)}
            </h2>
            <motion.div
              className="w-8 h-0.5 bg-[#2563eb]"
              initial={{ scaleX: 0, originX: 1 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={activeFilter}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.25 }}
              className="text-gray-500 text-sm font-medium"
            >
              {t(
                filtered.length === 1
                  ? "ui.showingMembers"
                  : "ui.showingMembersPlural",
                { count: filtered.length },
              )}
              {" · "}
              {t("ui.clickToView")}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        <AnimatePresence mode="wait">
          <div
            key={activeFilter}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filtered.map((member, index) => (
              <AnimatedCard key={member.id} index={index}>
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
              </AnimatedCard>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
