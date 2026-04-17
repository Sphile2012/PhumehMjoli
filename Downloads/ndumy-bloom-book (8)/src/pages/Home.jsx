import HeroSection from "../components/HeroSection";
import ServicesPreview from "../components/ServicesPreview";
import AboutSection from "../components/AboutSection";
import CoursePreview from "../components/CoursePreview";
import TestimonialsSection from "../components/TestimonialsSection";
import AnnouncementBanner from "../components/AnnouncementBanner";

const heroImage = "https://media.base44.com/images/public/69c85189646ba632d738f811/c30c7db97_WhatsAppImage2026-04-03at095902.jpg";
const courseImage = "https://media.base44.com/images/public/69c85189646ba632d738f811/6c4856f9a_WhatsAppImage2026-03-29at161158.jpg";

export default function Home() {
  return (
    <div>
      <AnnouncementBanner />
      <HeroSection heroImage={heroImage} />
      <ServicesPreview />
      <AboutSection />
      <CoursePreview courseImage={courseImage} />
      <TestimonialsSection />
    </div>
  );
}