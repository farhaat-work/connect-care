import React, { useEffect, useState } from 'react'
import { getPatientInOutData } from '../../Services/analyticsService'
import { StatCard } from './StatCard';
import { PatientsProgress } from './PatientProgress';

export const PatientInOutCard = () => {

    const [PatientData, setPatientData] = useState([]);

    useEffect(() => {
        const Data = getPatientInOutData();
        setPatientData(Data)}, []);

    return (
        // <div className='flex flex-col flex-wrap items-center gap-3 '>
        //     {PatientData.length === 0 ? (
        //         <p className="text-gray-500">No data available.</p>
        //     ) : (
        //         PatientData.map((item) => (
        //             <div className="flex flex-row w-full items-center justify-start max-w-[40%] shadow-md rounded-lg p-4 bg-blue-100">
        //                 {/* Left section */}
        //                 <div className="flex flex-row w-full justify-between">
        //                     <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
        //                     <h1 className="text-2xl font-bold text-blue-600">{item.count}</h1>
        //                 </div>
        //             </div>

        //         ))
        //     )}
        // </div>
        <>
            <PatientsProgress 
            total = {1200} 
            inPatients = {880} 
            outpatients = {320}
            />
        </>

    )
}


