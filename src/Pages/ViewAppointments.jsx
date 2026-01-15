import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Phone, Mail, Stethoscope, Video, Building2, X, Eye, XCircle } from "lucide-react";
import { useAppointments } from "../context/AppointmentContext";

const ViewAppointments = () => {
  const { appointments, cancelAppointment } = useAppointments();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "Cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const handleCancelClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowCancelModal(true);
  };

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDetailsModal(true);
  };

  const handleConfirmCancel = () => {
    if (selectedAppointment) {
      cancelAppointment(selectedAppointment.id);
    }
    setShowCancelModal(false);
    setSelectedAppointment(null);
  };

  // Empty state
  if (appointments.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link
              to="/patient-dashboard"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Dashboard</span>
            </Link>
            <Link
              to="/appointments"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Book New Appointment
            </Link>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
              <Calendar className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No Appointments Yet</h2>
            <p className="text-gray-500 mb-6">You haven't booked any appointments yet.</p>
            <Link
              to="/appointments"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Calendar size={20} />
              Book Your First Appointment
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/patient-dashboard"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Dashboard</span>
          </Link>
          <Link
            to="/appointments"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Book New Appointment
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">My Appointments</h1>
          <p className="text-gray-500 mt-1">View and manage your scheduled appointments</p>
        </div>

        {/* Mobile Cards View */}
        <div className="block lg:hidden space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-xl shadow-md p-5 border border-gray-100"
            >
              {/* Status Badge */}
              <div className="flex justify-between items-start mb-4">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                    appointment.status
                  )}`}
                >
                  {appointment.status}
                </span>
                <span className="text-xs text-gray-500">#{appointment.id.slice(-8)}</span>
              </div>

              {/* Patient Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-gray-400" />
                  <span className="font-semibold text-gray-800">{appointment.patientName}</span>
                  <span className="text-sm text-gray-500">({appointment.age} yrs)</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={14} className="text-gray-400" />
                  <span>{appointment.phoneNumber}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail size={14} className="text-gray-400" />
                  <span className="truncate">{appointment.emailId}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 my-4"></div>

              {/* Doctor Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Stethoscope size={16} className="text-blue-500" />
                  <span className="font-medium text-gray-800">{appointment.doctorName}</span>
                </div>
                <p className="text-sm text-gray-500 ml-6">{appointment.doctorSpecialization}</p>
              </div>

              {/* Date, Time, Mode */}
              <div className="mt-4 flex flex-wrap gap-3">
                <div className="flex items-center gap-1 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
                  <Calendar size={14} className="text-gray-400" />
                  <span>{formatDate(appointment.appointmentDate)}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
                  <Clock size={14} className="text-gray-400" />
                  <span>{formatTime(appointment.appointmentTime)}</span>
                </div>
                <div className={`flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg ${
                  appointment.consultationType === "virtual"
                    ? "bg-blue-50 text-blue-600"
                    : "bg-green-50 text-green-600"
                }`}>
                  {appointment.consultationType === "virtual" ? (
                    <Video size={14} />
                  ) : (
                    <Building2 size={14} />
                  )}
                  <span className="capitalize">{appointment.consultationType}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => handleViewDetails(appointment)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium text-sm"
                >
                  <Eye size={16} />
                  View Details
                </button>
                {appointment.status === "Upcoming" && (
                  <button
                    onClick={() => handleCancelClick(appointment)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium text-sm"
                  >
                    <XCircle size={16} />
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Patient</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Doctor</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Schedule</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Mode</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50 transition-colors">
                    {/* Patient */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User size={18} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{appointment.patientName}</p>
                          <p className="text-sm text-gray-500">{appointment.age} years old</p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Phone size={12} className="text-gray-400" />
                          {appointment.phoneNumber}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Mail size={12} className="text-gray-400" />
                          <span className="truncate max-w-[160px]">{appointment.emailId}</span>
                        </div>
                      </div>
                    </td>

                    {/* Doctor */}
                    <td className="px-4 py-4">
                      <p className="font-medium text-gray-800">{appointment.doctorName}</p>
                      <p className="text-sm text-gray-500">{appointment.doctorSpecialization}</p>
                    </td>

                    {/* Schedule */}
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm text-gray-700">
                          <Calendar size={12} className="text-gray-400" />
                          {formatDate(appointment.appointmentDate)}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Clock size={12} className="text-gray-400" />
                          {formatTime(appointment.appointmentTime)}
                        </div>
                      </div>
                    </td>

                    {/* Mode */}
                    <td className="px-4 py-4">
                      <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                        appointment.consultationType === "virtual"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-green-50 text-green-600"
                      }`}>
                        {appointment.consultationType === "virtual" ? (
                          <Video size={12} />
                        ) : (
                          <Building2 size={12} />
                        )}
                        <span className="capitalize">{appointment.consultationType}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                          appointment.status
                        )}`}
                      >
                        {appointment.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleViewDetails(appointment)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        {appointment.status === "Upcoming" && (
                          <button
                            onClick={() => handleCancelClick(appointment)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Cancel Appointment"
                          >
                            <XCircle size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Cancel Appointment</h3>
              <button
                onClick={() => setShowCancelModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600">
                Are you sure you want to cancel the appointment with{" "}
                <span className="font-semibold">{selectedAppointment.doctorName}</span> on{" "}
                <span className="font-semibold">{formatDate(selectedAppointment.appointmentDate)}</span> at{" "}
                <span className="font-semibold">{formatTime(selectedAppointment.appointmentTime)}</span>?
              </p>
              <p className="text-sm text-red-500 mt-3">This action cannot be undone.</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Keep Appointment
              </button>
              <button
                onClick={handleConfirmCancel}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showDetailsModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Appointment Details</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Status */}
            <div className="mb-6">
              <span
                className={`px-4 py-1.5 text-sm font-semibold rounded-full border ${getStatusColor(
                  selectedAppointment.status
                )}`}
              >
                {selectedAppointment.status}
              </span>
            </div>

            {/* Patient Details */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Patient Details</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User size={18} className="text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-800">{selectedAppointment.patientName}</p>
                    <p className="text-sm text-gray-500">{selectedAppointment.age} years old</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-gray-400" />
                  <p className="text-gray-700">{selectedAppointment.phoneNumber}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-gray-400" />
                  <p className="text-gray-700">{selectedAppointment.emailId}</p>
                </div>
              </div>
            </div>

            {/* Doctor Details */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Doctor Details</h4>
              <div className="flex items-center gap-3">
                <Stethoscope size={18} className="text-blue-500" />
                <div>
                  <p className="font-medium text-gray-800">{selectedAppointment.doctorName}</p>
                  <p className="text-sm text-gray-500">{selectedAppointment.doctorSpecialization}</p>
                </div>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Appointment Details</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-gray-400" />
                  <p className="text-gray-700">{formatDate(selectedAppointment.appointmentDate)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-gray-400" />
                  <p className="text-gray-700">{formatTime(selectedAppointment.appointmentTime)}</p>
                </div>
                <div className="flex items-center gap-3">
                  {selectedAppointment.consultationType === "virtual" ? (
                    <Video size={18} className="text-blue-500" />
                  ) : (
                    <Building2 size={18} className="text-green-500" />
                  )}
                  <p className="text-gray-700 capitalize">{selectedAppointment.consultationType} Consultation</p>
                </div>
              </div>
            </div>

            {/* Reason for Visit */}
            {selectedAppointment.reasonForVisit && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Reason for Visit</h4>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedAppointment.reasonForVisit}</p>
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={() => setShowDetailsModal(false)}
              className="w-full py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAppointments;
