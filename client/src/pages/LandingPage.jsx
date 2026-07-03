import Footer from '../components/Footer';
import CTASection from '../components/landing/CTASection';
import FeaturesSection from '../components/landing/FeaturesSection';
import HeroSection from '../components/landing/HeroSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import StatsSection from '../components/landing/StatsSection';
import TechnologySection from '../components/landing/TechnologySection';
import Navbar from '../components/Navbar';
import PageTransition from '../components/PageTransition';

export default function LandingPage() {
  return (
    <PageTransition className="min-h-screen bg-background">
      <Navbar variant="landing" />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection/>
        <TechnologySection/>
        <StatsSection/>
        <CTASection/>
      </main>
    </PageTransition>
  );
}