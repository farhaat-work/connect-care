import { Video, Calendar, Clock, User, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";

const DoctorVideoConsultations = ({ consultations, onStartCall }) => {
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

  if (consultations.length === 0) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-card rounded-3xl shadow-elevated border border-border/50 p-8 sm:p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Video className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">No Scheduled Consultations</h3>
          <p className="text-muted-foreground mb-4">
            No upcoming video consultations found. Appointments will appear here.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg px-4 py-2 mx-auto w-fit">
            <AlertCircle className="w-4 h-4" />
            <span>Appointments are stored in memory and will reset on page refresh.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-4">
        {consultations.map((apt) => {
          const timeStatus = getTimeStatus(apt);
          
          return (
            <div
              key={apt.id}
              className="bg-card rounded-2xl shadow-soft border border-border/50 p-6 hover:shadow-elevated transition-all duration-300"
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
                    onClick={() => onStartCall(apt)}
                    className="w-full lg:w-auto gap-2"
                    disabled={apt.status === "Completed"}
                  >
                    <Video className="w-4 h-4" />
                    {apt.status === "Completed" ? "Completed" : "Start Call"}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DoctorVideoConsultations;
