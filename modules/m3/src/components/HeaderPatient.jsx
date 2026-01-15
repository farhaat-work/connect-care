import React, { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useRole } from "../../../../src/Context/RoleContext";


export const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { clearRole } = useRole();
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    return (
        <div className=" bg-slate-50">
            {/* GLOBAL CLINICAL HEADER */}
            <header className="bg-white border-b border-slate-200  top-0 z-[100]">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">

                    {/* LEFT: BRANDING */}
                    <div className="flex flex-col cursor-pointer" onClick={() => navigate('/dashboard')}>
                        <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">
                            MediConnect
                        </h1>
                        {/* <h2 className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mt-1">
                            EHR Management
                        </h2> */}
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200 cursor-pointer"
                        >
                            {/* Avatar Circle with Initials or Icon */}
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-black shadow-sm">
                                DP
                            </div>
                            <div className="hidden sm:block text-left">
                                <div className="text-[11px] font-black text-slate-900 leading-none">Mr. Manokar Singh</div>
                            </div>
                            <svg className={`w-3 h-3 text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* DROPDOWN MENU */}
                        {isProfileOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 animate-in fade-in zoom-in-95 duration-200">

                                <button className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                                    onClick={() => {
                                        navigate("/doctor-dashboard");
                                    }}>
                                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                    Go To Dashboard
                                </button>


                                <div className="h-px bg-slate-100 my-1 mx-2"></div>

                                <button className="w-full text-left px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                                    onClick={() => {
                                        clearRole();
                                        navigate("/login");
                                    }}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                    Sign Out
                                </button>


                            </div>
                        )}
                    </div>
                </div>
            </header >
        </div >
    )

}

