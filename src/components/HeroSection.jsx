import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import { ArrowRight, Heart } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center pt-20">
      <div className="absolute inset-0 gradient-hero opacity-[0.02]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-hero shadow-soft mb-8">
            <Heart className="w-8 h-8 text-primary-foreground" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6">
            Integrated Patient Care &<br />
            <span className="text-gradient">Telehealth Management</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Manage patient records, enable telehealth consultations, and streamline care coordination — all in one HIPAA-compliant platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" size="lg" className="group" asChild>
              <Link to="/appointments">
                Book Appointment
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/video-consultation">
                Start Video Consult
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
