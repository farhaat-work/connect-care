import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Stethoscope, Video, Building2, Phone, Mail, Users } from "lucide-react";
import { useAppointments } from "../context/AppointmentContext";

const Appointments = () => {
  const navigate = useNavigate();
  const { addAppointment } = useAppointments();
  
  const [formData, setFormData] = useState({
    patientName: "",
    phoneNumber: "",
    emailId: "",
    age: "",
    doctorSpecialization: "",
    doctorName: "",
    appointmentDate: "",
    appointmentTime: "",
    consultationType: "virtual",
    reasonForVisit: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const specializations = [
    "General Physician",
    "Cardiologist",
    "Dermatologist",
    "Orthopedic",
  ];

  const doctorsBySpecialization = {
    "General Physician": [
      "Dr. Sarah Johnson",
      "Dr. Amit Sharma",
      "Dr. Priya Patel",
    ],
    "Cardiologist": [
      "Dr. Michael Chen",
      "Dr. Rajesh Kumar",
      "Dr. Anita Gupta",
    ],
    "Dermatologist": [
      "Dr. Emily Davis",
      "Dr. Neha Verma",
      "Dr. Suresh Reddy",
    ],
    "Orthopedic": [
      "Dr. Robert Wilson",
      "Dr. Vikram Singh",
      "Dr. Meera Nair",
    ],
  };

  const availableDoctors = formData.doctorSpecialization
    ? doctorsBySpecialization[formData.doctorSpecialization] || []
    : [];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = "Patient name is required";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ""))) {
      newErrors.phoneNumber = "Enter a valid 10-digit phone number";
    }

    if (!formData.emailId.trim()) {
      newErrors.emailId = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId)) {
      newErrors.emailId = "Enter a valid email address";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (formData.age < 1 || formData.age > 120) {
      newErrors.age = "Enter a valid age (1-120)";
    }

    if (!formData.doctorSpecialization) {
      newErrors.doctorSpecialization = "Please select a specialization";
    }

    if (!formData.doctorName) {
      newErrors.doctorName = "Please select a doctor";
    }

    if (!formData.appointmentDate) {
      newErrors.appointmentDate = "Appointment date is required";
    }

    if (!formData.appointmentTime) {
      newErrors.appointmentTime = "Appointment time is required";
    }

    if (!formData.reasonForVisit.trim()) {
      newErrors.reasonForVisit = "Reason for visit is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Reset doctor when specialization changes
    if (name === "doctorSpecialization") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        doctorName: "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error when field is modified
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Add appointment to context/localStorage
    addAppointment(formData);

    setSubmitted(true);
    // Reset after 3 seconds and navigate to view
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        patientName: "",
        phoneNumber: "",
        emailId: "",
        age: "",
        doctorSpecialization: "",
        doctorName: "",
        appointmentDate: "",
        appointmentTime: "",
        consultationType: "virtual",
        reasonForVisit: "",
      });
      setErrors({});
      navigate("/appointments/view");
    }, 2000);
  };

  const inputBaseClass = "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none";
  const inputErrorClass = "border-red-300 focus:ring-red-500 focus:border-red-500";
  const inputNormalClass = "border-gray-300";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            to="/patient-dashboard"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Dashboard</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              Book an Appointment
            </h1>
            <p className="text-gray-500 mt-2">
              Schedule your consultation with our healthcare professionals
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Appointment Booked Successfully!
              </h2>
              <p className="text-gray-500">
                Redirecting to your appointments...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Patient Details Section */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <User size={20} className="text-blue-600" />
                  Patient Details
                </h2>
                
                <div className="space-y-4">
                  {/* Patient Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Patient Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={`${inputBaseClass} ${errors.patientName ? inputErrorClass : inputNormalClass}`}
                    />
                    {errors.patientName && (
                      <p className="mt-1 text-sm text-red-500">{errors.patientName}</p>
                    )}
                  </div>

                  {/* Phone and Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Phone Number */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Phone size={14} className="text-gray-400" />
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Enter 10-digit number"
                        className={`${inputBaseClass} ${errors.phoneNumber ? inputErrorClass : inputNormalClass}`}
                      />
                      {errors.phoneNumber && (
                        <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
                      )}
                    </div>

                    {/* Email ID */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Mail size={14} className="text-gray-400" />
                        Email ID <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="emailId"
                        value={formData.emailId}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className={`${inputBaseClass} ${errors.emailId ? inputErrorClass : inputNormalClass}`}
                      />
                      {errors.emailId && (
                        <p className="mt-1 text-sm text-red-500">{errors.emailId}</p>
                      )}
                    </div>
                  </div>

                  {/* Age */}
                  <div className="w-1/2 md:w-1/3">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Users size={14} className="text-gray-400" />
                      Age <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="Age"
                      min="1"
                      max="120"
                      className={`${inputBaseClass} ${errors.age ? inputErrorClass : inputNormalClass}`}
                    />
                    {errors.age && (
                      <p className="mt-1 text-sm text-red-500">{errors.age}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Doctor Details Section */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Stethoscope size={20} className="text-blue-600" />
                  Doctor Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Doctor Specialization */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specialization <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="doctorSpecialization"
                      value={formData.doctorSpecialization}
                      onChange={handleChange}
                      className={`${inputBaseClass} bg-white ${errors.doctorSpecialization ? inputErrorClass : inputNormalClass}`}
                    >
                      <option value="">Select Specialization</option>
                      {specializations.map((spec) => (
                        <option key={spec} value={spec}>
                          {spec}
                        </option>
                      ))}
                    </select>
                    {errors.doctorSpecialization && (
                      <p className="mt-1 text-sm text-red-500">{errors.doctorSpecialization}</p>
                    )}
                  </div>

                  {/* Doctor Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Doctor Name <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="doctorName"
                      value={formData.doctorName}
                      onChange={handleChange}
                      disabled={!formData.doctorSpecialization}
                      className={`${inputBaseClass} bg-white ${errors.doctorName ? inputErrorClass : inputNormalClass} ${!formData.doctorSpecialization ? "bg-gray-100 cursor-not-allowed" : ""}`}
                    >
                      <option value="">
                        {formData.doctorSpecialization ? "Select Doctor" : "Select specialization first"}
                      </option>
                      {availableDoctors.map((doctor) => (
                        <option key={doctor} value={doctor}>
                          {doctor}
                        </option>
                      ))}
                    </select>
                    {errors.doctorName && (
                      <p className="mt-1 text-sm text-red-500">{errors.doctorName}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Appointment Details Section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Calendar size={20} className="text-blue-600" />
                  Appointment Details
                </h2>

                {/* Date and Time Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Appointment Date */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Calendar size={14} className="text-gray-400" />
                      Appointment Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="appointmentDate"
                      value={formData.appointmentDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      className={`${inputBaseClass} ${errors.appointmentDate ? inputErrorClass : inputNormalClass}`}
                    />
                    {errors.appointmentDate && (
                      <p className="mt-1 text-sm text-red-500">{errors.appointmentDate}</p>
                    )}
                  </div>

                  {/* Appointment Time */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Clock size={14} className="text-gray-400" />
                      Appointment Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      name="appointmentTime"
                      value={formData.appointmentTime}
                      onChange={handleChange}
                      className={`${inputBaseClass} ${errors.appointmentTime ? inputErrorClass : inputNormalClass}`}
                    />
                    {errors.appointmentTime && (
                      <p className="mt-1 text-sm text-red-500">{errors.appointmentTime}</p>
                    )}
                  </div>
                </div>

                {/* Mode of Consultation */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Mode of Consultation <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Virtual Consultation */}
                    <label
                      className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.consultationType === "virtual"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="consultationType"
                        value="virtual"
                        checked={formData.consultationType === "virtual"}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600"
                      />
                      <Video
                        size={20}
                        className={
                          formData.consultationType === "virtual"
                            ? "text-blue-600"
                            : "text-gray-400"
                        }
                      />
                      <span
                        className={`font-medium ${
                          formData.consultationType === "virtual"
                            ? "text-blue-700"
                            : "text-gray-700"
                        }`}
                      >
                        Virtual Consultation
                      </span>
                    </label>

                    {/* In-Person Consultation */}
                    <label
                      className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.consultationType === "in-person"
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="consultationType"
                        value="in-person"
                        checked={formData.consultationType === "in-person"}
                        onChange={handleChange}
                        className="w-4 h-4 text-green-600"
                      />
                      <Building2
                        size={20}
                        className={
                          formData.consultationType === "in-person"
                            ? "text-green-600"
                            : "text-gray-400"
                        }
                      />
                      <span
                        className={`font-medium ${
                          formData.consultationType === "in-person"
                            ? "text-green-700"
                            : "text-gray-700"
                        }`}
                      >
                        In-Person Consultation
                      </span>
                    </label>
                  </div>

                  {/* Conditional Message */}
                  {formData.consultationType === "virtual" && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Video size={20} className="text-blue-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-blue-800">Virtual Consultation</p>
                          <p className="text-sm text-blue-600 mt-1">
                            An online meeting link will be shared with you after confirmation via email.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.consultationType === "in-person" && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Building2 size={20} className="text-green-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-green-800">In-Person Consultation</p>
                          <p className="text-sm text-green-600 mt-1">
                            Visit us at: MediConnect Healthcare Center, 123 Medical Plaza, Suite 456, City - 500001
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Reason for Visit */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Visit <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="reasonForVisit"
                    value={formData.reasonForVisit}
                    onChange={handleChange}
                    placeholder="Briefly describe your symptoms or reason for consultation..."
                    rows={4}
                    className={`${inputBaseClass} resize-none ${errors.reasonForVisit ? inputErrorClass : inputNormalClass}`}
                  />
                  {errors.reasonForVisit && (
                    <p className="mt-1 text-sm text-red-500">{errors.reasonForVisit}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.01]"
                >
                  Book Appointment
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default Appointments;
