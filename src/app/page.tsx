import Header from "@/components/sections/header";
import Hero from "@/components/sections/hero";
import SocialProof from "@/components/sections/social-proof";
import FeaturesOverview from "@/components/sections/features-overview";
import AdvancedFeatures from "@/components/sections/advanced-features";
import Fortune100 from "@/components/sections/fortune-100";
import CtaFinal from "@/components/sections/cta-final";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-surface-light">
      <Header />
      <Hero />
      <SocialProof />
      <FeaturesOverview />
      <AdvancedFeatures />
      <Fortune100 />
      <CtaFinal />
      <Footer />
    </main>
  );
}