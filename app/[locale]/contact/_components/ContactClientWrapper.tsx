"use client";

import ContactContentSection from "./ContactContentSection";

export default function ContactClientWrapper() {
  return (
    <div className="relative z-20 -mt-24 bg-[#f3f5f4] rounded-t-[60px] md:rounded-t-[80px] pt-16 pb-32 shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.1)] animate-section-rise">
      <ContactContentSection />
    </div>
  );
}
