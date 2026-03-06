"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";

export interface SharedTeamCardProps {
  name: string;
  title: string;
  departmentLabel: string;
  image: string;
  slug: string;
  viewProfileLabel: string;
}

const SharedTeamCard = React.memo(
  ({
    name,
    title,
    departmentLabel,
    image,
    slug,
    viewProfileLabel,
  }: SharedTeamCardProps) => (
    <>
      {/* ── Mobile ── */}
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

      {/* ── Desktop ── */}
      <Link
        href={`/team/${slug}`}
        className="hidden md:block"
        aria-label={name}
      >
        <div className="group relative aspect-[4/5] w-[95%] mx-auto cursor-pointer overflow-hidden rounded-2xl bg-gray-900">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-in-out group-hover:scale-105 will-change-transform"
            loading="lazy"
            decoding="async"
          />

          {/* Default: name + title */}
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
              <div className="mt-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-[330ms]">
                <div className="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-bold text-[#0a1a3f] transition-colors duration-200 hover:bg-cyan-300">
                  {viewProfileLabel}
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  ),
);

SharedTeamCard.displayName = "SharedTeamCard";
export default SharedTeamCard;
