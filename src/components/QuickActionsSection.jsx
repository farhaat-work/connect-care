import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import { 
  Stethoscope, 
  Users, 
  Calendar, 
  Video, 
  Bell,
  ArrowRight 
} from "lucide-react";

const quickActions = [
  {
    icon: Calendar,
    title: "Book Appointment",
    description: "Schedule in-person or virtual visit",
    href: "/appointments",
    primary: true,
  },
  {
    icon: Video,
    title: "Video Consultation",
    description: "Start or join a video call",
    href: "/video-consultation",
    primary: false,
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "View alerts and reminders",
    href: "/notifications/patient",
    primary: false,
  },
];

const roles = [
  {
    icon: Users,
    title: "Patient Portal",
    description: "Book appointments, view prescriptions, access health records",
    features: ["Appointment booking", "Prescription history", "Health records access", "Video consultations"],
  },
  {
    icon: Stethoscope,
    title: "Doctor Dashboard",
    description: "Manage consultations, update EHR, monitor patient analytics",
    features: ["Patient management", "EHR updates", "Consultation notes", "Analytics dashboard"],
  },
];

const QuickActionsSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quick Actions */}
        <div className="mb-16">
          <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
            Quick Actions
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.title}
                  to={action.href}
                  className={`group flex flex-col items-center text-center p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                    action.primary 
                      ? "bg-primary text-primary-foreground border-primary shadow-soft hover:shadow-elevated" 
                      : "bg-card text-foreground border-border/50 shadow-soft hover:shadow-elevated hover:border-primary/30"
                  }`}
                >
                  <Icon className={`w-8 h-8 mb-3 ${action.primary ? "" : "text-primary"}`} />
                  <h3 className="font-semibold mb-1">{action.title}</h3>
                  <p className={`text-sm ${action.primary ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    {action.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Role-based portals */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
            Choose Your Portal
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <div
                  key={role.title}
                  className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{role.title}</h3>
                      <p className="text-sm text-muted-foreground">{role.description}</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 mb-4">
                    {role.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button variant="outline" size="sm" className="w-full group">
                    Access Portal
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickActionsSection;
