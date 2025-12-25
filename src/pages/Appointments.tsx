import React from 'react';
import { Link } from 'react-router-dom';
import { useAppointments } from '@/context/AppointmentContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Video, Clock, User } from 'lucide-react';
import { format } from 'date-fns';

const Appointments: React.FC = () => {
  const { appointments } = useAppointments();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Appointments</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {appointments.length === 0 ? (
          <div className="text-center py-16">
            <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">No Appointments</h2>
            <p className="text-muted-foreground">You don't have any scheduled appointments yet.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-6 rounded-2xl gradient-card shadow-soft hover:shadow-elevated transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-feature flex items-center justify-center">
                      {appointment.type === 'video' ? (
                        <Video className="w-6 h-6 text-primary" />
                      ) : (
                        <User className="w-6 h-6 text-primary" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-card-foreground">
                        {appointment.doctorName}
                      </h3>
                      <p className="text-muted-foreground">
                        Patient: {appointment.patientName}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {format(appointment.dateTime, 'MMM d, yyyy')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {format(appointment.dateTime, 'h:mm a')}
                        </span>
                      </div>
                      {appointment.notes && (
                        <p className="mt-2 text-sm text-muted-foreground">
                          {appointment.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        appointment.status === 'scheduled'
                          ? 'bg-primary-light text-primary'
                          : appointment.status === 'completed'
                          ? 'bg-call-active/20 text-call-active'
                          : appointment.status === 'cancelled'
                          ? 'bg-destructive/20 text-destructive'
                          : 'bg-call-muted/20 text-call-muted'
                      }`}
                    >
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>

                    {appointment.status === 'scheduled' && appointment.type === 'video' && (
                      <Link
                        to={`/video-consultation?room=apt-${appointment.id}&role=patient`}
                      >
                        <Button size="sm" className="gradient-hero text-primary-foreground">
                          <Video className="w-4 h-4 mr-2" />
                          Join Call
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Appointments;
