
import React, { useEffect, useState } from "react";

export default function PrescriptionModal({ patientId,setViewPrescriptions }) {
  const [meds, setMeds] = useState([]);

//   useEffect(() => {

//     fetch(`http://localhost:8080/prescriptions/${patientId}`)
//       .then((res) => res.json())
//       .then((data) => setMeds(data))
//       .catch(() => setMeds([]));
//   }, [isOpen, patientId]);


  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center"
      onClick={()=>setViewPrescriptions(prev=>!prev)}
    >
      <div
        className="bg-white p-5 rounded-lg w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Prescription</h2>
          <button onClick={()=>setViewPrescriptions(prev=>!prev)} className="text-xl">×</button>
        </div>

        {meds.length === 0 ? (
          <p className="text-gray-500">No prescriptions.</p>
        ) : (
          <ul className="space-y-3 max-h-64 overflow-y-auto">
            {meds.map((m) => (
              <li key={m.id} className="p-3 border rounded">
                <p className="font-medium">{m.name}</p>
                <p className="text-sm text-gray-600">{m.dosage}</p>
                <p className="text-sm text-gray-600">{m.frequency}</p>
              </li>
            ))}
          </ul>
        )}

        <div className="text-right mt-4">
          <button
            onClick={()=>setViewPrescriptions(prev=>!prev)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
