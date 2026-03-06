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

      <Link
        href={`/team/${slug}`}
        className="hidden md:block"
        aria-label={name}
      >
        <div
          className="group relative aspect-[4/5] w-[95%] mx-auto cursor-pointer overflow-hidden bg-gray-900
          rounded-2xl
          3xl:rounded-3xl
          4xl:rounded-[2rem]
          5xl:rounded-[2.5rem]"
        >
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-in-out group-hover:scale-105 will-change-transform"
            loading="lazy"
            decoding="async"
          />

          <div
            className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-0 pointer-events-none
            px-4 pb-4 pt-16
            3xl:px-5 3xl:pb-5 3xl:pt-20
            4xl:px-6 4xl:pb-6 4xl:pt-24
            5xl:px-7 5xl:pb-7 5xl:pt-28"
          >
            <h3
              className="font-bold text-white leading-snug drop-shadow-md
              text-sm
              3xl:text-base
              4xl:text-lg
              5xl:text-xl"
            >
              {name}
            </h3>
            <p
              className="text-white/75 font-semibold uppercase tracking-widest drop-shadow
              mt-0.5 text-[10px]
              3xl:mt-1 3xl:text-xs
              4xl:mt-1 4xl:text-sm
              5xl:mt-1.5 5xl:text-sm"
            >
              {title}
            </p>
          </div>

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out pointer-events-none group-hover:pointer-events-auto">
            <div
              className="absolute inset-y-0 left-0 w-0 group-hover:w-full transition-all duration-500 ease-in-out bg-black/30 backdrop-blur-md flex flex-col items-center justify-center overflow-hidden
              p-5
              3xl:p-6
              4xl:p-7
              5xl:p-8"
            >
              <span
                className="text-cyan-200 font-black uppercase text-center break-words drop-shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200
                text-[10px] tracking-[0.22em] mb-2
                3xl:text-xs 3xl:mb-3
                4xl:text-sm 4xl:mb-3
                5xl:text-base 5xl:mb-4"
              >
                {departmentLabel}
              </span>
              <h3
                className="text-center font-bold text-white leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-[250ms] break-words drop-shadow-md
                text-base
                3xl:text-lg
                4xl:text-xl
                5xl:text-2xl"
              >
                {name}
              </h3>
              <p
                className="text-white/90 font-semibold uppercase tracking-widest text-center break-words drop-shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-[290ms]
                mt-1 text-[10px]
                3xl:mt-1.5 3xl:text-xs
                4xl:mt-2 4xl:text-sm
                5xl:mt-2 5xl:text-sm"
              >
                {title}
              </p>
              <div
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-[330ms]
                mt-5
                3xl:mt-6
                4xl:mt-7
                5xl:mt-8"
              >
                <div
                  className="flex items-center gap-2 3xl:gap-2.5 4xl:gap-3 rounded-full bg-white text-[#0a1a3f] font-bold transition-colors duration-200 hover:bg-cyan-300
                  px-5 py-2 text-xs
                  3xl:px-6 3xl:py-2.5 3xl:text-sm
                  4xl:px-7 4xl:py-3 4xl:text-base
                  5xl:px-8 5xl:py-3.5 5xl:text-lg"
                >
                  {viewProfileLabel}
                  <ArrowRight className="w-3 h-3 3xl:w-3.5 3xl:h-3.5 4xl:w-4 4xl:h-4 5xl:w-5 5xl:h-5" />
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
