import { useState } from "react";
import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";
import { Video, User, Stethoscope } from "lucide-react";
import PatientVideoConsultations from "@/components/video/PatientVideoConsultations.jsx";
import DoctorVideoConsultations from "@/components/video/DoctorVideoConsultations.jsx";
import VideoCallUI from "@/components/video/VideoCallUI.jsx";
import { useAppointments } from "@/context/AppointmentContext.jsx";

const VideoConsultation = () => {
  const { getVideoConsultations, updateAppointmentStatus } = useAppointments();
  const [activeTab, setActiveTab] = useState("patient");
  const [inCall, setInCall] = useState(false);
  const [activeConsultation, setActiveConsultation] = useState(null);
  const [isWaitingRoom, setIsWaitingRoom] = useState(false);

  const videoConsultations = getVideoConsultations();

  const handleJoinCall = (consultation, isEarly = false) => {
    setActiveConsultation(consultation);
    setIsWaitingRoom(isEarly);
    setInCall(true);
  };

  const handleStartCall = (consultation) => {
    setActiveConsultation(consultation);
    setIsWaitingRoom(false);
    setInCall(true);
  };

  const handleEndCall = () => {
    setInCall(false);
    setActiveConsultation(null);
    setIsWaitingRoom(false);
  };

  const handleMarkComplete = (appointmentId) => {
    updateAppointmentStatus(appointmentId, "Completed");
  };

  // Show video call UI when in call
  if (inCall && activeConsultation) {
    return (
      <VideoCallUI
        consultation={activeConsultation}
        userType={activeTab}
        onEndCall={handleEndCall}
        onMarkComplete={handleMarkComplete}
        isWaitingRoom={isWaitingRoom}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center max-w-3xl mx-auto mb-8">
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

          {/* View Tabs */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="flex bg-muted rounded-xl p-1">
              <button
                onClick={() => setActiveTab("patient")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === "patient"
                    ? "bg-card text-foreground shadow-soft"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <User className="w-4 h-4" />
                Patient View
              </button>
              <button
                onClick={() => setActiveTab("doctor")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === "doctor"
                    ? "bg-card text-foreground shadow-soft"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Stethoscope className="w-4 h-4" />
                Doctor View
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "patient" ? (
            <PatientVideoConsultations
              consultations={videoConsultations}
              onJoinCall={handleJoinCall}
            />
          ) : (
            <DoctorVideoConsultations
              consultations={videoConsultations}
              onStartCall={handleStartCall}
            />
          )}

          {/* Info Section */}
          <div className="max-w-3xl mx-auto mt-12">
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
