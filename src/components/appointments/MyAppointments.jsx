import { Calendar, Clock, Video, MapPin, User, AlertCircle } from "lucide-react";

const MyAppointments = ({ appointments }) => {
  if (appointments.length === 0) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-card rounded-3xl shadow-elevated border border-border/50 p-8 sm:p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">No Upcoming Appointments</h3>
          <p className="text-muted-foreground mb-4">
            No upcoming appointments found. Please book a new appointment.
          </p>
          {/* <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg px-4 py-2 mx-auto w-fit">
            <AlertCircle className="w-4 h-4" />
            <span>Appointments are stored in memory and will reset on page refresh.</span>
          </div> */}
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-4">
        {appointments.map((apt) => (
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
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    apt.status === "Scheduled" 
                      ? "bg-green-100 text-green-700"
                      : apt.status === "Completed"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {apt.status}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-foreground">{apt.doctorName}</span>
                    </div>
                    <p className="text-sm text-muted-foreground pl-6">{apt.specialization}</p>
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
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
                  apt.consultationMode === "virtual"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-blue-100 text-blue-700"
                }`}>
                  {apt.consultationMode === "virtual" ? (
                    <>
                      <Video className="w-4 h-4" />
                      <span className="text-sm font-medium">Virtual</span>
                    </>
                  ) : (
                    <>
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-medium">In-Person</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
