import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { Stethoscope, CalendarCheck, FolderHeart, Video } from "lucide-react";
import { useRole } from "../../Context/RoleContext";
import { Header } from "../../../modules/m3/src/components/Header";


const DoctorDashboard = () => {
  const [login, setLogin] = useState(false);
  const { clearRole } = useRole();
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = localStorage.getItem('role');
    if (checkLogin) {
      setLogin(true);
    }
    else {
      // alert("You are not logged in")
      navigate("/login")
    }


  }, [])
  return (<>
  <div className="fixed top-0 left-0 right-0">
    <Header />
  </div>
    
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center p-4">

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">

        {/* Profile Section */}
        <div className="flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-md">
            <Stethoscope size={64} />
          </div>

          <h2 className="mt-4 text-2xl font-semibold text-gray-800">
            Dr. Sarah Williams
          </h2>
          <p className="text-gray-500 text-sm">
            Cardiologist • Doctor ID: D-78945
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

          {/* View Appointments */}
          <Link to="/doctor/appointments">
            <div className="bg-indigo-500 hover:bg-indigo-600 transition rounded-xl p-6 text-white cursor-pointer shadow-lg h-full">
              <div className="flex items-center gap-4">
                <CalendarCheck size={48} />
                <div>
                  <h3 className="text-xl font-semibold">View Appointments</h3>
                  <p className="text-sm opacity-90">Manage patient visits</p>
                </div>
              </div>
            </div>
          </Link>

          {/* EHR Management */}
          <Link to="/EHR">
            <div className="bg-emerald-500 hover:bg-emerald-600 transition rounded-xl p-6 text-white cursor-pointer shadow-lg h-full">
              <div className="flex items-center gap-4">
                <FolderHeart size={48} />
                <div>
                  <h3 className="text-xl font-semibold">EHR Management</h3>
                  <p className="text-sm opacity-90">View & update medical records</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Video Call */}
          <Link to="/doctor/videocall">
            <div className="bg-emerald-500 hover:bg-emerald-600 transition rounded-xl p-6 text-white cursor-pointer shadow-lg h-full">
              <div className="flex items-center gap-4">
                <Video size={48} />
                <div>
                  <h3 className="text-xl font-semibold">Video Call</h3>
                  <p className="text-sm opacity-90">Join virtual consultations</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Prescription */}
          <Link to="/prescription">
            <div className="bg-amber-500 hover:bg-amber-600 transition rounded-xl p-6 text-white cursor-pointer shadow-lg h-full">
              <div className="flex items-center gap-4">
                <FolderHeart size={48} />
                <div>
                  <h3 className="text-xl font-semibold">Prescription</h3>
                  <p className="text-sm opacity-90">Generate prescriptions</p>
                </div>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </div>

  </>

  );
};

export default DoctorDashboard;
