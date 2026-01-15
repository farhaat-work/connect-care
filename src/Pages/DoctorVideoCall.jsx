import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Video, Phone, ArrowLeft, Clock, User } from "lucide-react";
import { useAppointments } from "../context/AppointmentContext";

const DoctorVideoCall = () => {
  const navigate = useNavigate();
  const { appointments } = useAppointments();
  const [activeCall, setActiveCall] = useState(null);

  // Filter only Virtual + Upcoming appointments
  const virtualAppointments = appointments.filter(
    (apt) => apt.consultationMode === "Virtual" && apt.status === "Upcoming"
  );

  const handleJoinCall = (appointment) => {
    setActiveCall(appointment);
  };

  const handleEndCall = () => {
    setActiveCall(null);
  };

  // Placeholder Video Call Screen
  if (activeCall) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col">
        {/* Video Call Header */}
        <div className="bg-gray-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-white">
            <Video className="text-green-400" size={24} />
            <span className="font-semibold">Video Call in Progress</span>
          </div>
          <div className="text-gray-300 text-sm">
            <Clock size={16} className="inline mr-1" />
            {activeCall.appointmentTime}
          </div>
        </div>

        {/* Main Video Area */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            {/* Placeholder for Patient Video */}
            <div className="w-64 h-64 md:w-96 md:h-96 bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User size={48} className="text-white" />
                </div>
                <p className="text-white text-xl font-semibold">{activeCall.patientName}</p>
                <p className="text-gray-400">Age: {activeCall.patientAge}</p>
              </div>
            </div>

            {/* Self View (Small) */}
            <div className="absolute bottom-32 right-8 w-32 h-24 bg-gray-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-gray-300 text-sm">You (Doctor)</span>
            </div>

            {/* Call Info */}
            <div className="bg-gray-800 rounded-xl p-4 inline-block">
              <p className="text-white font-medium">Connected with {activeCall.patientName}</p>
              <p className="text-gray-400 text-sm">
                {activeCall.appointmentDate} at {activeCall.appointmentTime}
              </p>
              <p className="text-yellow-400 text-xs mt-2">
                ⚠️ This is a UI placeholder - No real video integration
              </p>
            </div>
          </div>
        </div>

        {/* Call Controls */}
        <div className="bg-gray-800 p-6 flex justify-center gap-6">
          <button className="w-14 h-14 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center text-white transition">
            <Video size={24} />
          </button>
          <button className="w-14 h-14 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center text-white transition">
            🎤
          </button>
          <button
            onClick={handleEndCall}
            className="w-14 h-14 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white transition"
          >
            <Phone size={24} className="rotate-135" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-indigo-200 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/doctor-dashboard")}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-6 transition"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <Video className="text-indigo-600" size={32} />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Video Consultations
            </h1>
          </div>

          <p className="text-gray-500 mb-8">
            Your upcoming virtual appointments are listed below. Click "Join Video Call" to connect with your patient.
          </p>

          {/* Appointments List */}
          {virtualAppointments.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <Video className="mx-auto text-gray-300 mb-4" size={64} />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No Virtual Appointments
              </h3>
              <p className="text-gray-400">
                You don't have any upcoming virtual consultations scheduled.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {virtualAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-5 hover:shadow-md transition"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                          Virtual Consultation
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          Upcoming
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {apt.patientName}
                      </h3>
                      <p className="text-gray-500 text-sm">Age: {apt.patientAge} years</p>
                      <p className="text-gray-500 text-sm">📞 {apt.patientPhone}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          📅 {apt.appointmentDate}
                        </span>
                        <span className="flex items-center gap-1">
                          🕐 {apt.appointmentTime}
                        </span>
                      </div>
                      {apt.reasonForVisit && (
                        <p className="text-gray-600 text-sm mt-2">
                          <strong>Reason:</strong> {apt.reasonForVisit}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleJoinCall(apt)}
                      className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition shadow-md"
                    >
                      <Video size={20} />
                      Join Video Call
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorVideoCall;
