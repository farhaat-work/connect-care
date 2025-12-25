import { useState } from "react";
import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";
import { Video, Stethoscope, Calendar, Clock, User, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import VideoCallUI from "@/components/video/VideoCallUI.jsx";
import { useAppointments } from "@/context/AppointmentContext.jsx";

const DoctorVideoConsultation = () => {
  const { getVideoConsultations, updateAppointmentStatus, createSession, getSessionByAppointment } = useAppointments();
  const [inCall, setInCall] = useState(false);
  const [activeConsultation, setActiveConsultation] = useState(null);

  const videoConsultations = getVideoConsultations();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getTimeStatus = (apt) => {
    const aptDate = new Date(apt.appointmentDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    aptDate.setHours(0, 0, 0, 0);
    
    if (aptDate.getTime() === today.getTime()) {
      return { label: "Today", color: "bg-green-100 text-green-700" };
    } else if (aptDate.getTime() === today.getTime() + 86400000) {
      return { label: "Tomorrow", color: "bg-blue-100 text-blue-700" };
    }
    return null;
  };

  const handleStartCall = (consultation) => {
    // Create or join existing session
    let session = getSessionByAppointment(consultation.id);
    if (!session) {
      session = createSession(consultation.id, "doctor");
    }
    
    setActiveConsultation({ ...consultation, sessionId: session?.id });
    setInCall(true);
  };

  const handleEndCall = () => {
    setInCall(false);
    setActiveConsultation(null);
  };

  const handleMarkComplete = (appointmentId) => {
    updateAppointmentStatus(appointmentId, "Completed");
  };

  if (inCall && activeConsultation) {
    return (
      <VideoCallUI
        consultation={activeConsultation}
        userType="doctor"
        onEndCall={handleEndCall}
        onMarkComplete={handleMarkComplete}
        isWaitingRoom={false}
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
            <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-6">
              <Stethoscope className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Doctor Portal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
              Patient <span className="text-gradient">Consultations</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage and conduct video consultations with your patients.
            </p>
          </div>

          {/* Consultations List */}
          <div className="max-w-3xl mx-auto">
            {videoConsultations.length === 0 ? (
              <div className="bg-card rounded-3xl shadow-elevated border border-border/50 p-8 sm:p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Video className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">No Scheduled Consultations</h3>
                <p className="text-muted-foreground mb-4">
                  No upcoming video consultations found. Appointments will appear here when patients book them.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-green-600 bg-green-50 rounded-lg px-4 py-2 mx-auto w-fit">
                  <AlertCircle className="w-4 h-4" />
                  <span>Data persists in browser storage.</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {videoConsultations.map((apt) => {
                  const timeStatus = getTimeStatus(apt);
                  const existingSession = getSessionByAppointment(apt.id);
                  const isPatientWaiting = existingSession?.participants?.patient && !existingSession?.participants?.doctor;
                  
                  return (
                    <div
                      key={apt.id}
                      className={`bg-card rounded-2xl shadow-soft border p-6 hover:shadow-elevated transition-all duration-300 ${
                        isPatientWaiting ? 'border-green-300 ring-2 ring-green-100' : 'border-border/50'
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3 flex-wrap">
                            <span className="text-xs font-medium bg-primary-light text-primary px-2 py-1 rounded-full">
                              {apt.id}
                            </span>
                            <span className="text-xs font-medium bg-purple-100 text-purple-700 px-2 py-1 rounded-full flex items-center gap-1">
                              <Video className="w-3 h-3" />
                              Video
                            </span>
                            {apt.status === "Completed" ? (
                              <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                Completed
                              </span>
                            ) : (
                              <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                {apt.status}
                              </span>
                            )}
                            {isPatientWaiting && (
                              <span className="text-xs font-medium bg-orange-100 text-orange-700 px-2 py-1 rounded-full animate-pulse">
                                Patient Waiting
                              </span>
                            )}
                            {timeStatus && (
                              <span className={`text-xs font-medium px-2 py-1 rounded-full ${timeStatus.color}`}>
                                {timeStatus.label}
                              </span>
                            )}
                          </div>

                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <User className="w-4 h-4 text-primary" />
                                <span className="font-semibold text-foreground">{apt.patientName}</span>
                              </div>
                              <p className="text-sm text-muted-foreground pl-6">
                                {apt.email} • Age: {apt.age}
                              </p>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="w-4 h-4 text-primary" />
                                <span className="text-foreground">{formatDate(apt.appointmentDate)}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm pl-6">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <span className="text-muted-foreground">{apt.appointmentTime}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="lg:border-l lg:border-border lg:pl-4">
                          <Button 
                            onClick={() => handleStartCall(apt)}
                            className={`w-full lg:w-auto gap-2 ${isPatientWaiting ? 'bg-green-600 hover:bg-green-700' : ''}`}
                            disabled={apt.status === "Completed"}
                          >
                            <Video className="w-4 h-4" />
                            {apt.status === "Completed" ? "Completed" : isPatientWaiting ? "Join Now" : "Start Call"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="max-w-3xl mx-auto mt-12">
            <div className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-foreground mb-4">
                Doctor's Consultation Guide
              </h3>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Review patient details before the consultation
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Start or join the call when patient is ready
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Mark consultation as complete when finished
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

export default DoctorVideoConsultation;