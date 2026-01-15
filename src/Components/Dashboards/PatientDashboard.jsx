import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { CalendarDays, FileText, ClipboardList, Video } from "lucide-react";
import { useRole } from "../../Context/RoleContext";
import PrescriptionModal from "../PrescriptionModal"
import { Header } from "../../../modules/m3/src/components/HeaderPatient";

const PatientDashboard = () => {

  const [login, setLogin] = useState(false);
  const { clearRole } = useRole();
  const navigate = useNavigate();
  const [ViewPrescriptions, setViewPrescriptions] = useState(false);

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
    {ViewPrescriptions && <PrescriptionModal patientId={123456} setViewPrescriptions={setViewPrescriptions} />}
    {/* <header className="mc-header" role="banner">
      <div className="mc-header__wrap">
        <Link to="/" className="mc-header__brand" aria-label="Go to home">
          <span className="mc-header__logo" aria-hidden="true">🩺</span>
          <span className="mc-header__title">Medi-Connect</span>
        </Link>

        <nav className="mc-header__nav" aria-label="Primary">
          {login && <button to="/login" className="mc-header__link" onClick={() => {
            clearRole();
            navigate("/login");
          }}>Logout</button>}
          {/* <Link to="/login" className="mc-header__link">Login</Link> */}
{/* 
        </nav>
      </div>
    </header> */}
    <Header />
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center p-4">

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">

        {/* Profile Section */}
        <div className="flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center text-white text-5xl font-bold shadow-md">
            👤
          </div>

          <h2 className="mt-4 text-2xl font-semibold text-gray-800">
            Mr. Manokar Singh
          </h2>
          <p className="text-gray-500 text-sm">
            Age: 45 • Patient ID: 123456
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

          {/* Book Appointment */}
          <div 
            className="bg-blue-500 hover:bg-blue-600 transition rounded-xl p-6 text-white cursor-pointer shadow-lg"
            onClick={() => navigate("/appointments")}
          >
            <div className="flex items-center gap-4">
              <CalendarDays size={48} />
              <div>
                <h3 className="text-xl font-semibold">
                  Book Appointment
                </h3>
                <p className="text-sm opacity-90">
                  Schedule a visit
                </p>
              </div>
            </div>
          </div>

          {/* View Prescriptions */}
          <div className="bg-green-500 hover:bg-green-600 transition rounded-xl p-6 text-white cursor-pointer shadow-lg" onClick={() => setViewPrescriptions(prev => !prev)}>
            <div className="flex items-center gap-4">
              <FileText size={48} />
              <div>
                <h3 className="text-xl font-semibold">
                  View Prescriptions
                </h3>
                <p className="text-sm opacity-90">
                  Check your medications
                </p>
              </div>
            </div>
          </div>

          {/* View My Appointments */}
          <div 
            className="bg-purple-500 hover:bg-purple-600 transition rounded-xl p-6 text-white cursor-pointer shadow-lg"
            onClick={() => navigate("/appointments/view")}
          >
            <div className="flex items-center gap-4">
              <ClipboardList size={48} />
              <div>
                <h3 className="text-xl font-semibold">
                  View My Appointments
                </h3>
                <p className="text-sm opacity-90">
                  Check your scheduled visits
                </p>
              </div>
            </div>
          </div>

          {/* Video Call */}
          <div 
            className="bg-teal-500 hover:bg-teal-600 transition rounded-xl p-6 text-white cursor-pointer shadow-lg"
            onClick={() => navigate("/patient/videocall")}
          >
            <div className="flex items-center gap-4">
              <Video size={48} />
              <div>
                <h3 className="text-xl font-semibold">
                  Video Call
                </h3>
                <p className="text-sm opacity-90">
                  Join virtual consultations
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </>

  );
};

export default PatientDashboard
