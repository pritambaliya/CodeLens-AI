import HeroSection from '../components/landing/HeroSection';
import Navbar from '../components/Navbar';
import PageTransition from '../components/PageTransition';

export default function LandingPage() {
  return (
    <PageTransition className="min-h-screen bg-background">
      <Navbar variant="landing" />
      <main>
        <HeroSection />
      </main>
    </PageTransition>
  );
}