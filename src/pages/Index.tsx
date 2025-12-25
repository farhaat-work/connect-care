import React from 'react';
import { Link } from 'react-router-dom';
import { Video, Calendar, Bell, Stethoscope, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index: React.FC = () => {
  const roomId = `consultation-${Date.now()}`;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10" />
        <div className="container mx-auto px-4 py-8">
          <nav className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">MediCall</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/notifications/patient">
                <Button variant="ghost" size="sm">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </Button>
              </Link>
              <Link to="/appointments">
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Appointments
                </Button>
              </Link>
            </div>
          </nav>

          <div className="max-w-4xl mx-auto text-center py-20 animate-slide-up">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Healthcare at Your
              <span className="text-gradient block mt-2">Fingertips</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Connect with healthcare professionals through secure, real-time video consultations. 
              Quality care, wherever you are.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to={`/video-consultation?room=${roomId}&role=patient`}>
                <Button size="lg" className="gradient-hero text-primary-foreground shadow-glow hover:shadow-elevated transition-all">
                  <Video className="w-5 h-5 mr-2" />
                  Join as Patient
                </Button>
              </Link>
              <Link to={`/video-consultation?room=${roomId}&role=doctor`}>
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary-light">
                  <Stethoscope className="w-5 h-5 mr-2" />
                  Join as Doctor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Why Choose MediCall?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Video className="w-8 h-8" />}
              title="HD Video Calls"
              description="Crystal clear video and audio for effective consultations with your healthcare provider."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Secure & Private"
              description="End-to-end encrypted calls ensure your health information stays confidential."
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Easy to Use"
              description="Simple interface for patients and doctors. No complicated setup required."
            />
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-foreground mb-8">
              How It Works
            </h2>

            <div className="space-y-6">
              <Step number={1} title="Select Your Role">
                Choose whether you're joining as a patient or doctor to set up your consultation.
              </Step>
              <Step number={2} title="Share Your ID">
                Copy your unique ID and share it with the other participant, or enter their ID to call them.
              </Step>
              <Step number={3} title="Start Consulting">
                Once connected, enjoy a seamless video consultation with full audio and video controls.
              </Step>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 MediCall. Secure Healthcare Video Consultations.</p>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="p-6 rounded-2xl gradient-card shadow-soft hover:shadow-elevated transition-all group">
    <div className="w-16 h-16 rounded-xl gradient-feature flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-card-foreground mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

interface StepProps {
  number: number;
  title: string;
  children: React.ReactNode;
}

const Step: React.FC<StepProps> = ({ number, title, children }) => (
  <div className="flex gap-4 items-start p-4 rounded-xl hover:bg-secondary/50 transition-colors">
    <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center text-primary-foreground font-bold shrink-0">
      {number}
    </div>
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-muted-foreground">{children}</p>
    </div>
  </div>
);

export default Index;
