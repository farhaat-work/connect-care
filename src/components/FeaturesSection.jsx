import { Calendar, Video, FileText, Pill, Activity } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Appointment Scheduling",
    description: "Effortlessly manage appointments with smart scheduling, automated reminders, and real-time availability updates.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Video,
    title: "Secure Video Consultations",
    description: "HIPAA-compliant video calls with HD quality, screen sharing, and integrated patient notes for seamless virtual care.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: FileText,
    title: "Electronic Health Records",
    description: "Centralized, secure patient records with easy access to medical history, lab results, and clinical documentation.",
    color: "bg-teal-50 text-teal-600",
  },
  {
    icon: Pill,
    title: "Prescription Management",
    description: "Digital prescriptions with drug interaction alerts, refill tracking, and direct pharmacy integration.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Activity,
    title: "Real-Time Health Analytics",
    description: "Comprehensive dashboards with patient trends, operational metrics, and actionable insights for better care decisions.",
    color: "bg-rose-50 text-rose-600",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 gradient-feature opacity-50" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-primary-light px-4 py-2 rounded-full mb-6">
            <span className="text-sm font-medium text-primary">Powerful Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-6">
            Everything You Need for<br />
            <span className="text-gradient">Modern Healthcare</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our comprehensive platform brings together all essential tools to deliver exceptional patient care while optimizing your workflow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group bg-card rounded-2xl p-6 lg:p-8 border border-border/50 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>

                <div className="mt-6 flex items-center gap-2 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm">Learn more</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
