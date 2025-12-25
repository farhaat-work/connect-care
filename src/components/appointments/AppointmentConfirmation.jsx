import { Button } from "@/components/ui/button.jsx";
import { CheckCircle2, Video, Building2 } from "lucide-react";

const AppointmentConfirmation = ({ confirmationData, onNewAppointment }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card rounded-3xl shadow-elevated border border-border/50 p-8 sm:p-12 text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 animate-bounce">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Appointment Confirmed!
        </h2>
        <p className="text-muted-foreground mb-8">
          Your appointment has been successfully scheduled.
        </p>

        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 sm:p-8 mb-8 text-left">
          <div className="text-center mb-6 pb-6 border-b border-primary/20">
            <p className="text-sm text-muted-foreground mb-1">Appointment Number</p>
            <p className="text-2xl font-bold text-primary">{confirmationData.appointmentNumber}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Patient Name</p>
                <p className="font-semibold text-foreground">{confirmationData.patientName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Doctor</p>
                <p className="font-semibold text-foreground">{confirmationData.doctorName}</p>
                <p className="text-sm text-primary">{confirmationData.specialization}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Date & Time</p>
                <p className="font-semibold text-foreground">{confirmationData.date}</p>
                <p className="text-primary">{confirmationData.time}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Consultation Mode</p>
                <div className="flex items-center gap-2">
                  {confirmationData.mode === "Virtual Consultation" ? (
                    <Video className="w-4 h-4 text-primary" />
                  ) : (
                    <Building2 className="w-4 h-4 text-primary" />
                  )}
                  <p className="font-semibold text-foreground">{confirmationData.mode}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={onNewAppointment}>
            Book Another Appointment
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="/">Return to Home</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentConfirmation;
