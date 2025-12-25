import Header from "@/components/Header.jsx";
import HeroSection from "@/components/HeroSection.jsx";
import ModulesSection from "@/components/ModulesSection.jsx";
import QuickActionsSection from "@/components/QuickActionsSection.jsx";
import Footer from "@/components/Footer.jsx";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ModulesSection />
        {/* <QuickActionsSection /> */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
