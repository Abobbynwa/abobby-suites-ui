import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedRooms } from "@/components/home/FeaturedRooms";
import { Amenities } from "@/components/home/Amenities";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <div className="lg:pt-20" /> {/* Spacing for booking widget */}
      <FeaturedRooms />
      <Amenities />
      <Testimonials />
      <CTASection />
    </Layout>
  );
};

export default Index;
