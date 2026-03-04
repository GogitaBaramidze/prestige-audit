import { Metadata } from "next";
import ContactHeroSection from "./_components/ContactHeroSection";
import ContactClientWrapper from "./_components/ContactClientWrapper";

export const metadata: Metadata = {
  title: "Contact Us | Prestige Audit",
  description: "Get in touch with the Prestige Audit team.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <ContactHeroSection />
      <ContactClientWrapper />
    </div>
  );
}
