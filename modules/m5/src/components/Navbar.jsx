// modules/m5/components/Navbar.jsx
import React from 'react'
import { useNavigate,NavLink } from 'react-router-dom'
import { useRole } from "../../../../src/Context/RoleContext";

export const Navbar = () => {
      const { clearRole } = useRole();
      const navigate = useNavigate();
  
  return (
    <div className="fixed right-0 left-0 top-0 z-50">
      <nav className="bg-[#1DB1A2] text-white px-4 flex justify-between items-center shadow-md py-2">
        {/* Logo */}
        <div className="text-lg font-bold">
          MediConnect+ (Admin View)
        </div>

        {/* Links */}
        <div className="flex gap-4">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `text-white no-underline p-3 transition delay-150 hover:bg-[#0c796e] ${isActive ? 'opacity-100' : 'hover:opacity-90'}`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/reports"
            className={({ isActive }) =>
              `text-white no-underline p-3 transition delay-150 hover:bg-[#0c796e] ${isActive ? 'opacity-100' : 'hover:opacity-90'}`
            }
          >
            Reports
          </NavLink>

          <NavLink
            to="/admin/analytics"
            className={({ isActive }) =>
              `text-white no-underline p-3 transition delay-150 hover:bg-[#0c796e] ${isActive ? 'opacity-100' : 'hover:opacity-90'}`
            }
          >
            Analytics
          </NavLink>

          {/* <button
          className= "text-white border border-red-600 bg-red-300 no-underline rounded-3xl pl-2 pr-2 pt-0 pb-0 transition delay-150 cursor-pointer hover:bg-red-400"
          onClick={()=>{
            clearRole();
            navigate("/login")

          }}
          >
            
                Logout
          
          </button> */}

<button
  className="
    backdrop-blur-md 
    bg-red-500/30 
    text-white 
    border border-white/30
    px-4 
    rounded-3xl
    shadow-lg 
    cursor-pointer
    hover:bg-red-400/50 
    hover:shadow-xl
    transition-all 
  "
  onClick={() => {
    clearRole();
    navigate('/login');
  }}
>
  Logout
</button>



        </div>
      </nav>
    </div>
  )
}
