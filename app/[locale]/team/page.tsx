import { Suspense } from "react";
import TeamHeroSection from "./_components/TeamHeroSection";
import TeamClientSection from "./_components/TeamClientSection";
import { getPageMetadata } from "@/lib/getMetadata";

export async function generateMetadata() {
  return getPageMetadata("team");
}

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
