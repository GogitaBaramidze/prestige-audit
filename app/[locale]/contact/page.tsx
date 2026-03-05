import { getPageMetadata } from "@/lib/getMetadata";
import ContactHeroSection from "./_components/ContactHeroSection";
import ContactClientWrapper from "./_components/ContactClientWrapper";

export async function generateMetadata() {
  return getPageMetadata("contact");
}

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <ContactHeroSection />
      <ContactClientWrapper />
    </div>
  );
}
