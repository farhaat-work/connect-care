import { Link } from "react-router-dom";
import { Clock, Users, Shield, TrendingUp, HeartPulse, Zap } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";

const benefits = [
  { icon: Clock, title: "Reduced Wait Times", description: "Cut patient wait times by up to 40% with intelligent scheduling and streamlined check-in processes.", stat: "40%", statLabel: "Faster Service" },
  { icon: Users, title: "Enhanced Patient Engagement", description: "Boost patient satisfaction with self-service portals, automated communications, and personalized care plans.", stat: "95%", statLabel: "Patient Satisfaction" },
  { icon: Shield, title: "Healthcare Compliance", description: "Stay compliant with HIPAA, GDPR, and other regulations with built-in security and audit trails.", stat: "100%", statLabel: "Compliant" },
  { icon: TrendingUp, title: "Operational Efficiency", description: "Automate administrative tasks and reduce paperwork, allowing staff to focus on patient care.", stat: "60%", statLabel: "Time Saved" },
  { icon: HeartPulse, title: "Better Health Outcomes", description: "Enable proactive care with remote monitoring, alerts, and comprehensive health tracking.", stat: "3x", statLabel: "Better Outcomes" },
  { icon: Zap, title: "Seamless Integration", description: "Connect with existing EHR systems, labs, and pharmacies for a unified healthcare ecosystem.", stat: "50+", statLabel: "Integrations" },
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-accent-light px-4 py-2 rounded-full mb-6">
            <span className="text-sm font-medium text-accent">Why Choose Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-6">
            Transform Your Practice with<br />
            <span className="text-gradient">Measurable Results</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of healthcare providers who have revolutionized their patient care delivery with MediConnect.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.title} className="group relative bg-card rounded-2xl p-6 lg:p-8 border border-border/50 shadow-soft hover:shadow-elevated transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-extrabold text-primary">{benefit.stat}</p>
                      <p className="text-xs text-muted-foreground">{benefit.statLabel}</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="gradient-hero rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2" />

          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Transform Your Healthcare Practice?
            </h3>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
              Join 500+ healthcare providers already using MediConnect to deliver exceptional patient care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/appointments">Start Free Trial</Link>
              </Button>
              <Button variant="heroOutline" size="lg">Schedule Demo</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
