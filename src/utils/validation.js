// Validation functions for appointment form
export const validatePatientName = (value) => {
  if (!value || value.trim().length < 3) {
    return "Name must be at least 3 characters";
  }
  if (!/^[a-zA-Z\s]+$/.test(value)) {
    return "Only alphabets and spaces allowed";
  }
  return "";
};

export const validatePhone = (value) => {
  if (!value || value.length !== 10) {
    return "Phone number must be exactly 10 digits";
  }
  if (!/^\d+$/.test(value)) {
    return "Only numeric values allowed";
  }
  return "";
};

export const validateEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!value || !emailRegex.test(value)) {
    return "Please enter a valid email address";
  }
  return "";
};

export const validateAge = (value) => {
  const num = Number(value);
  if (!value || isNaN(num)) {
    return "Age must be a number";
  }
  if (num < 1 || num > 120) {
    return "Age must be between 1 and 120";
  }
  return "";
};

export const validateRequired = (value, fieldName) => {
  if (!value) {
    return `Please select ${fieldName}`;
  }
  return "";
};

export const validateForm = (formData) => {
  const errors = {};
  
  errors.patientName = validatePatientName(formData.patientName);
  errors.phone = validatePhone(formData.phone);
  errors.email = validateEmail(formData.email);
  errors.age = validateAge(formData.age);
  errors.specialization = validateRequired(formData.specialization, "a specialization");
  errors.doctor = validateRequired(formData.doctor, "a doctor");
  errors.appointmentDate = validateRequired(formData.appointmentDate, "a date");
  errors.appointmentTime = validateRequired(formData.appointmentTime, "a time slot");
  errors.consultationMode = validateRequired(formData.consultationMode, "consultation mode");
  
  return errors;
};

export const isFormValid = (errors) => {
  return Object.values(errors).every((error) => error === "");
};
