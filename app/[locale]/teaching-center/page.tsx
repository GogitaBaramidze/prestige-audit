import { getPageMetadata } from "@/lib/getMetadata";

import AcademySection from "../(main)/_components/AcademySection";
import TeachingCenterHeroSection from "./_components/TeachingSectionHero";
import TeachingCenterContentSection from "./_components/TeachingContentSection";

export async function generateMetadata() {
  return getPageMetadata("teaching-center");
}

export default function TeachingCenterPage() {
  return (
    <div className="min-h-screen bg-background">
      <TeachingCenterHeroSection />
      <div className="relative z-20 -mt-20 mb-24 bg-white rounded-t-[60px] rounded-b-[60px] md:rounded-t-[80px] shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.1)] animate-section-rise overflow-hidden">
        <TeachingCenterContentSection />
        <AcademySection />
      </div>
    </div>
  );
}
