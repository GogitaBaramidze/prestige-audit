import VideoSection from "../(main)/_components/VideoSection";
import AboutContentSection from "./_components/AboutContentSection";
import AboutHeroSection from "./_components/AboutHeroSection";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <AboutHeroSection />
      <div className="relative z-20 -mt-24 bg-[#f3f5f4] rounded-t-[60px] md:rounded-t-[80px] pt-16 pb-32 shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.1)] animate-section-rise">
        <AboutContentSection />
        <VideoSection />
      </div>
    </div>
  );
}
