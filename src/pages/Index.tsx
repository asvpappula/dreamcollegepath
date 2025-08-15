import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
