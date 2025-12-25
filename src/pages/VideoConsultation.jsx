import { Link } from "react-router-dom";
import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";
import { Video, User, Stethoscope, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";

const VideoConsultation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full mb-6">
              <Video className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-600">Telehealth</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
              Video <span className="text-gradient">Consultations</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Connect with healthcare professionals through secure video calls from anywhere.
            </p>
          </div>

          {/* Portal Selection */}
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Patient Portal Card */}
            <Link 
              to="/video-consultation/patient"
              className="group bg-card rounded-3xl shadow-soft border border-border/50 p-8 hover:shadow-elevated transition-all duration-300 hover:border-primary/30"
            >
              <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <User className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">Patient Portal</h2>
              <p className="text-muted-foreground mb-6">
                View your upcoming video consultations, join waiting rooms, and connect with your healthcare providers.
              </p>
              <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all duration-300">
                <span>Enter Patient Portal</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Doctor Portal Card */}
            <Link 
              to="/video-consultation/doctor"
              className="group bg-card rounded-3xl shadow-soft border border-border/50 p-8 hover:shadow-elevated transition-all duration-300 hover:border-blue-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Stethoscope className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">Doctor Portal</h2>
              <p className="text-muted-foreground mb-6">
                Manage your patient consultations, start video calls, and complete appointments with prescription notes.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all duration-300">
                <span>Enter Doctor Portal</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>

          {/* Info Section */}
          <div className="max-w-3xl mx-auto mt-16">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-foreground mb-4">
                How Video Consultations Work
              </h3>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Book a virtual appointment from the Appointments page
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Join the call at your scheduled time using the button
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Consult with your doctor through secure video
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VideoConsultation;
