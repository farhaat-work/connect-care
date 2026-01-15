// import React, { useState } from 'react'
// import { NavLink } from 'react-router-dom'
// import logo from '../assets/images/logo.svg'
// import doctor from '../assets/images/doctor.svg'

// export default function Layout({ stats, children }) {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => setIsOpen(!isOpen);
//   const closeMenu = () => setIsOpen(false);

//   return (
//     <div className={`layout ${isOpen ? 'sidebar-open' : ''}`}>
//       {/* Mobile Overlay */}
//       {isOpen && <div className="sidebar-overlay" onClick={closeMenu}></div>}

//       <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
//         <div className="brand">
//           <img src={logo} alt="Logo" />
//           <div>
//             <div className="brand-title">MediConnect</div>
//             <div className="brand-sub">Connecting Care, Simplifying Health</div>
//           </div>
//           {/* Close button for mobile */}
//           <button className="menu-btn d-md-none ms-auto" onClick={closeMenu}>✕</button>
//         </div>

//         <nav className="nav">
//           <NavLink 
//             className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} 
//             to="/prescription/new"
//             onClick={closeMenu}
//           >
//             Generate E‑Prescription
//           </NavLink>
//           <NavLink 
//             className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} 
//             to="/pharmacy"
//             onClick={closeMenu}
//           >
//             Pharmacy Fulfillment
//           </NavLink>
//         </nav>

//         <div className="sidebar-footer">
//           <div className="stat"><span>Total</span><strong>{stats.total}</strong></div>
//           <div className="stat"><span>Active</span><strong className="text-success">{stats.active}</strong></div>
//           <div className="stat"><span>Completed</span><strong className="text-info">{stats.completed}</strong></div>
//         </div>
//       </aside>

//       <main className="content">
//         <header className="page-header">
//           <div className="title">
//             {/* Hamburger Button */}
//             <button className="menu-btn d-md-none me-3" onClick={toggleMenu}>☰</button>
//             <img src={doctor} alt="Doctor" />
//             <div>
//               <h1 className="h5 m-0">E‑Prescription & Pharmacy</h1>
//             </div>
//           </div>
//         </header>
        
//         <div className="container-fluid px-2 px-md-4 py-4">
//           {children}
//         </div>
//       </main>
//     </div>
//   )
// }



// modules/m4/src/components/Layout.jsx
// import React, { useState } from 'react'
// import { NavLink, Outlet } from 'react-router-dom'
// import logo from '../assets/images/logo.svg'
// import doctor from '../assets/images/doctor.svg'
// import { useModule4 } from '../m4context/context'

// export default function Layout() {
//   const [isOpen, setIsOpen] = useState(false)
//   const { stats } = useModule4()   // ← ✅ context stats here

//   const toggleMenu = () => setIsOpen(!isOpen)
//   const closeMenu = () => setIsOpen(false)

//   return (
//     <div className={`layout ${isOpen ? 'sidebar-open' : ''}`}>
//       {isOpen && <div className="sidebar-overlay" onClick={closeMenu} />}

//       <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
//         <div className="brand">
//           <img src={logo} alt="Logo" />
//           <div>
//             <div className="brand-title">MediConnect</div>
//             <div className="brand-sub">Connecting Care, Simplifying Health</div>
//           </div>
//           <button className="menu-btn d-md-none ms-auto" onClick={closeMenu}>✕</button>
//         </div>

//         <nav className="nav">
//           <NavLink
//             className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}
//             to="/prescription/new"
//             onClick={closeMenu}
//           >
//             Generate E‑Prescription
//           </NavLink>
//           <NavLink
//             className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}
//             to="/prescription/pharmacy"
//             onClick={closeMenu}
//           >
//             Pharmacy Fulfillment
//           </NavLink>
//         </nav>

//         <div className="sidebar-footer">
//           <div className="stat"><span>Total</span><strong>{stats.total}</strong></div>
//           <div className="stat"><span>Active</span><strong className="text-success">{stats.active}</strong></div>
//           <div className="stat"><span>Completed</span><strong className="text-info">{stats.completed}</strong></div>
//         </div>
//       </aside>

//       <main className="content">
//         <header className="page-header">
//           <div className="title">
//             <button className="menu-btn d-md-none me-3" onClick={toggleMenu}>☰</button>
//             <img src={doctor} alt="Doctor" />
//             <div><h1 className="h5 m-0">E‑Prescription &amp; Pharmacy</h1></div>
//           </div>
//         </header>

//         <div className="container-fluid px-2 px-md-4 py-4">
//           {/* Nested routes render here */}
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   )
// }









import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import logo from '../assets/images/logo.svg'
import doctor from '../assets/images/doctor.svg'
import { useModule4 } from '../m4context/context'

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false)
  const { stats } = useModule4()

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] min-h-screen">
      
      {/* Sidebar Overlay (Mobile Only) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-[4px] z-[999] lg:hidden animate-in fade-in duration-240" 
          onClick={closeMenu} 
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-[280px] z-[1000] bg-white border-r border-black/[0.08] p-6 flex flex-col h-screen transition-transform duration-240 ease-[cubic-bezier(.32,.72,.12,.98)]
        lg:static lg:w-auto lg:translate-x-0 lg:h-screen lg:sticky lg:top-0
        ${isOpen ? 'translate-x-0 shadow-[0_12px_40px_rgba(0,0,0,0.44)]' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand */}
        <div className="flex items-center gap-3 mb-10">
          <img src={logo} alt="Logo" className="h-9 drop-shadow-[0_2px_10px_rgba(124,92,255,0.25)]" />
          <div className="flex-1">
            <div className="font-bold tracking-tight text-[#1b2a33] leading-tight">MediConnect</div>
            <div className="text-[0.8rem] text-[#5b6b78]">Connecting Care</div>
          </div>
          <button className="lg:hidden p-1 text-[#19303a]" onClick={closeMenu}>✕</button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3 mt-2">
          <NavLink
            to="/prescription/new"
            onClick={closeMenu}
            className={({ isActive }) => `
              relative px-4 py-3 rounded-[0.6rem] border transition-all duration-240 ease-[cubic-bezier(.2,.8,.2,1)] text-[0.95rem] no-underline
              ${isActive 
                ? 'bg-[#7c5cff]/18 border-[#7c5cff]/32 text-[#5b39f5] font-semibold shadow-[0_0_0_6px_rgba(124,92,255,0.14)]' 
                : 'bg-white/50 border-transparent text-[#1f2d36] hover:bg-white hover:border-black/[0.06] hover:-translate-y-[1px]'
              }
            `}
          >
            Generate E‑Prescription
          </NavLink>
          <NavLink
            to="/prescription/pharmacy"
            onClick={closeMenu}
            className={({ isActive }) => `
              relative px-4 py-3 rounded-[0.6rem] border transition-all duration-240 ease-[cubic-bezier(.2,.8,.2,1)] text-[0.95rem] no-underline
              ${isActive 
                ? 'bg-[#7c5cff]/18 border-[#7c5cff]/32 text-[#5b39f5] font-semibold shadow-[0_0_0_6px_rgba(124,92,255,0.14)]' 
                : 'bg-white/50 border-transparent text-[#1f2d36] hover:bg-white hover:border-black/[0.06] hover:-translate-y-[1px]'
              }
            `}
          >
            Pharmacy Fulfillment
          </NavLink>
        </nav>

        {/* Sidebar Footer Stats */}
        <div className="mt-auto pt-6 border-t border-black/[0.08]">
          <div className="flex justify-between mb-2 text-[0.85rem]">
            <span className="text-[#5b6b78]">Total</span>
            <strong className="text-[#21313b]">{stats.total}</strong>
          </div>
          <div className="flex justify-between mb-2 text-[0.85rem]">
            <span className="text-[#5b6b78]">Active</span>
            <strong className="text-[#22c55e]">{stats.active}</strong>
          </div>
          <div className="flex justify-between text-[0.85rem]">
            <span className="text-[#5b6b78]">Completed</span>
            <strong className="text-[#38bdf8]">{stats.completed}</strong>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="relative w-full min-w-0">
        <header className="sticky top-0 z-[50] flex items-center justify-between px-4 py-4 bg-white border-b border-black/[0.08]">
          <div className="flex items-center gap-2 text-[#19303a]">
            <button className="lg:hidden text-2xl p-1 leading-none" onClick={toggleMenu}>☰</button>
            <img src={doctor} alt="Doctor" className="h-7" />
            <h1 className="text-[0.90rem] font-bold m-0">E‑Prescription & Pharmacy</h1>
          </div>
        </header>

        <div className="max-w-[1200px] mx-auto w-full px-2 md:px-4 py-4">
          <Outlet />
        </div>
      </main>
    </div>
  )
}