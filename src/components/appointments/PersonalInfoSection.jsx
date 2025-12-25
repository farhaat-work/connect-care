import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { User, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const FormField = ({ id, label, icon: Icon, placeholder, value, onChange, error, maxLength, type = "text" }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-foreground font-medium">
        {label} <span className="text-destructive">*</span>
      </Label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />}
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          className={cn(Icon && "pl-10", error && "border-destructive focus-visible:ring-destructive")}
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

const PersonalInfoSection = ({ formData, errors, onChange }) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
        <User className="w-5 h-5 text-primary" />
        Personal Information
      </h2>
      <div className="grid sm:grid-cols-2 gap-6">
        <FormField
          id="patientName"
          label="Patient Name"
          icon={User}
          placeholder="Enter full name"
          value={formData.patientName}
          onChange={(e) => onChange("patientName", e.target.value)}
          error={errors.patientName}
        />
        <FormField
          id="phone"
          label="Phone Number"
          icon={Phone}
          placeholder="10-digit number"
          value={formData.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          error={errors.phone}
          maxLength={10}
        />
        <FormField
          id="email"
          label="Email Address"
          icon={Mail}
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={(e) => onChange("email", e.target.value)}
          error={errors.email}
        />
        <FormField
          id="age"
          label="Age"
          placeholder="Enter age (1-120)"
          value={formData.age}
          onChange={(e) => onChange("age", e.target.value)}
          error={errors.age}
        />
      </div>
    </div>
  );
};

export default PersonalInfoSection;
