import { Link } from "react-router-dom";
import { 
  UserPlus, 
  Calendar, 
  Video, 
  FileText, 
  Pill, 
  BarChart3, 
  ArrowRight,
  Shield,
  Clock,
  Users
} from "lucide-react";

const modules = [
  {
    icon: UserPlus,
    title: "Patient Registration",
    description: "Register patients, maintain profiles, store demographic and insurance details with secure authentication.",
    href: "/patient-registration",
    color: "bg-blue-500/10 text-blue-600",
    status: "Coming Soon",
  },
  {
    icon: Calendar,
    title: "Appointment Scheduling",
    description: "Book in-person and virtual appointments with smart scheduling and automated SMS/email notifications.",
    href: "/appointments",
    color: "bg-teal-500/10 text-teal-600",
    status: "Available",
  },
  {
    icon: Video,
    title: "Telehealth Consultations",
    description: "Secure video consultations with HD quality, screen sharing, and integrated patient notes.",
    href: "/video-consultation",
    color: "bg-purple-500/10 text-purple-600",
    status: "Available",
  },
  {
    icon: FileText,
    title: "Electronic Health Records",
    description: "Store medical history, lab reports, diagnoses with authorized access and audit trails.",
    href: "/health-records",
    color: "bg-emerald-500/10 text-emerald-600",
    status: "Coming Soon",
  },
  {
    icon: Pill,
    title: "Prescription Management",
    description: "Generate e-prescriptions, integrate with pharmacy systems, and track medication adherence.",
    href: "/prescriptions",
    color: "bg-amber-500/10 text-amber-600",
    status: "Coming Soon",
  },
  {
    icon: BarChart3,
    title: "Health Analytics",
    description: "Analyze patient trends, generate compliance reports, and access admin dashboards.",
    href: "/analytics",
    color: "bg-rose-500/10 text-rose-600",
    status: "Coming Soon",
  },
];

const highlights = [
  { icon: Shield, label: "HIPAA Compliant" },
  { icon: Clock, label: "24/7 Available" },
  { icon: Users, label: "50K+ Sessions/Day" },
];

const ModulesSection = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Complete Healthcare Platform
          </h2>
          <p className="text-muted-foreground">
            Everything you need to deliver exceptional patient care and streamline operations.
          </p>
        </div>

        {/* Modules grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {modules.map((module) => {
            const Icon = module.icon;
            const isAvailable = module.status === "Available";
            
            return (
              <div
                key={module.title}
                className="group relative bg-card rounded-2xl p-6 border border-border/50 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              >
                {/* Status badge */}
                <div className="absolute top-4 right-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    isAvailable 
                      ? "bg-primary/10 text-primary" 
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {module.status}
                  </span>
                </div>

                <div className={`w-12 h-12 rounded-xl ${module.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {module.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {module.description}
                </p>

                {isAvailable ? (
                  <Link 
                    to={module.href}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    Open Module
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    In Development
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Highlights bar */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-12">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-2 text-muted-foreground">
                <Icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
