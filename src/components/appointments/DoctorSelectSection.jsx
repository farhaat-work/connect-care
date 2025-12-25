import { Label } from "@/components/ui/label.jsx";
import { Stethoscope, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const SelectField = ({ id, label, value, onChange, options, placeholder, error, disabled = false, renderOption }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-foreground font-medium">
        {label} <span className="text-destructive">*</span>
      </Label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none cursor-pointer",
            error && "border-destructive focus-visible:ring-destructive"
          )}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((option) => renderOption ? renderOption(option) : (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

const DoctorSelectSection = ({ formData, errors, onChange, specializations, availableDoctors }) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
        <Stethoscope className="w-5 h-5 text-primary" />
        Select Doctor
      </h2>
      <div className="grid sm:grid-cols-2 gap-6">
        <SelectField
          id="specialization"
          label="Specialization"
          value={formData.specialization}
          onChange={(value) => onChange("specialization", value)}
          options={specializations}
          placeholder="Select specialization"
          error={errors.specialization}
        />
        <SelectField
          id="doctor"
          label="Doctor"
          value={formData.doctor}
          onChange={(value) => onChange("doctor", value)}
          options={availableDoctors}
          placeholder={formData.specialization ? "Select doctor" : "Select specialization first"}
          error={errors.doctor}
          disabled={!formData.specialization}
          renderOption={(doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name} - {doctor.experience} exp
            </option>
          )}
        />
      </div>
    </div>
  );
};

export default DoctorSelectSection;
