// import React, { useEffect, useState } from 'react';
// import { StatCard } from './StatCard';
// import { getCardsData } from '../../Services/analyticsService';
// import { Title } from 'chart.js';

// export const DashboardData = () => {

//     const [cards, setCards] = useState([]);
    
//         useEffect(() => {
//             const data = getCardsData(); 
//             setCards(data);
//         }, []);

//     return (
//         <>

                

//         <div className='StatsData flex flex-row flex-wrap justify-center gap-6 p-2 transition-all delay-300'>
                                
//                         {cards.length === 0 ? (
//                             <p className="text-gray-500">No data available.</p>
//                         ) : (
//                             cards.map((item) => (
//                                item.name === "Recovery Rate"|item.name ==="Readmission Rate"?
//                                <StatCard
//                                     key={item.id ?? item.name}  
//                                     Title={item.name}
//                                     count={item.count+"%"}
//                                 />
                               
//                                : <StatCard
//                                     key={item.id ?? item.name}  
//                                     Title={item.name}
//                                     count={item.count}
//                                 />

//                             ))
//                         )}
//                     </div>
//         </>        
//     )
// }


import React, { useEffect, useState } from 'react';
import { StatCard } from './StatCard';
import { getCardsData } from '../../Services/analyticsService';
// import { Title } from 'chart.js'; // optional: this import is unused

export const DashboardData = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const data = getCardsData();
    setCards(data);
  }, []);

  return (
    <>
      {/* Heading */}
      <div className=" flex justify-center w-full px-3 pt-3 md:px-4">
        <h2 className="  mb-4 max-w-[1200px] text-xl font-semibold tracking-tight text-slate-800">
          Dashboard Overview
        </h2>
      </div>

      <div className="StatsData flex flex-row flex-wrap justify-center gap-6 p-2 transition-all delay-300">
        {cards.length === 0 ? (
          <p className="text-gray-500">No data available.</p>
        ) : (
          cards.map((item) =>
            item.name === 'Recovery Rate' | item.name === 'Readmission Rate' ? (
              <StatCard
                key={item.id ?? item.name}
                Title={item.name}
                count={`${item.count}%`}
              />
            ) : (
              <StatCard
                key={item.id ?? item.name}
                Title={item.name}
                count={item.count}
              />
            )
          )
        )}
      </div>
    </>
  );
};
