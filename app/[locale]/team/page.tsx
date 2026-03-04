import { Metadata } from "next";
import { Suspense } from "react";
import TeamHeroSection from "./_components/TeamHeroSection";
import TeamClientSection from "./_components/TeamClientSection";

export const metadata: Metadata = {
  title: "Our Team | Prestige Audit",
  description:
    "Meet the expert team of auditors, accountants, and financial consultants at Prestige Audit LLC.",
};

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-background">
      <TeamHeroSection />
      <Suspense>
        <TeamClientSection />
      </Suspense>
    </div>
  );
}
