import { Suspense } from "react";
import TeamHeroSection from "./_components/TeamHeroSection";
import TeamClientSection from "./_components/TeamClientSection";
import { getPageMetadata } from "@/lib/getMetadata";

export async function generateMetadata() {
  return getPageMetadata("team");
}

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-background overflow-y-hidden">
      <TeamHeroSection />
      <Suspense>
        <TeamClientSection />
      </Suspense>
    </div>
  );
}
