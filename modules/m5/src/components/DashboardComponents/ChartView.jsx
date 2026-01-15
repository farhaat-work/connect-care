import React from 'react'
import LineChart from './ChartComponents/LineChart';
import PieChart from './ChartComponents/PieChart';

function ChartView() {
    return (<div>

        <div className='flex flex-row flex-wrap justify-center gap-10 m-10'>
            <PieChart />
            <LineChart />
        </div>
        
    </div>

    )
}

export default ChartView
