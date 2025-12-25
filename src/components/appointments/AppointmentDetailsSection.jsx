import { Label } from "@/components/ui/label.jsx";
import { Clock, ChevronDown, Video, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const DatePicker = ({ value, onChange, error }) => {
  const today = new Date().toISOString().split("T")[0];
  
  return (
    <div className="space-y-2">
      <Label htmlFor="appointmentDate" className="text-foreground font-medium">
        Appointment Date <span className="text-destructive">*</span>
      </Label>
      <input
        id="appointmentDate"
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={today}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer",
          error && "border-destructive focus-visible:ring-destructive"
        )}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

const TimeSlotSelect = ({ value, onChange, timeSlots, error }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="appointmentTime" className="text-foreground font-medium">
        Time Slot <span className="text-destructive">*</span>
      </Label>
      <div className="relative">
        <select
          id="appointmentTime"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 appearance-none cursor-pointer",
            error && "border-destructive focus-visible:ring-destructive"
          )}
        >
          <option value="" disabled>Select time slot</option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>{slot}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

const ConsultationModeSelect = ({ value, onChange, error }) => {
  const modes = [
    { id: "virtual", label: "Virtual", description: "Video consultation", icon: Video },
    { id: "in-person", label: "In-Person", description: "Visit the clinic", icon: Building2 },
  ];

  return (
    <div className="sm:col-span-2 space-y-3">
      <Label className="text-foreground font-medium">
        Mode of Consultation <span className="text-destructive">*</span>
      </Label>
      <div className="flex flex-col sm:flex-row gap-4">
        {modes.map((mode) => {
          const Icon = mode.icon;
          return (
            <label
              key={mode.id}
              className={cn(
                "flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all flex-1",
                "hover:border-primary/50 hover:bg-primary-light/50",
                value === mode.id ? "border-primary bg-primary-light" : "border-border"
              )}
            >
              <input
                type="radio"
                name="consultationMode"
                value={mode.id}
                checked={value === mode.id}
                onChange={(e) => onChange(e.target.value)}
                className="w-4 h-4 text-primary border-border focus:ring-primary"
              />
              <Icon className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">{mode.label}</p>
                <p className="text-sm text-muted-foreground">{mode.description}</p>
              </div>
            </label>
          );
        })}
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

const AppointmentDetailsSection = ({ formData, errors, onChange, timeSlots }) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
        <Clock className="w-5 h-5 text-primary" />
        Appointment Details
      </h2>
      <div className="grid sm:grid-cols-2 gap-6">
        <DatePicker
          value={formData.appointmentDate}
          onChange={(value) => onChange("appointmentDate", value)}
          error={errors.appointmentDate}
        />
        <TimeSlotSelect
          value={formData.appointmentTime}
          onChange={(value) => onChange("appointmentTime", value)}
          timeSlots={timeSlots}
          error={errors.appointmentTime}
        />
        <ConsultationModeSelect
          value={formData.consultationMode}
          onChange={(value) => onChange("consultationMode", value)}
          error={errors.consultationMode}
        />
      </div>
    </div>
  );
};

export default AppointmentDetailsSection;
