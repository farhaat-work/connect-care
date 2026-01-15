import React from 'react';
import { DashboardData } from '../components/DashboardComponents/DashboardData';
import ChartView from '../components/DashboardComponents/ChartView';
import { PatientInOutCard } from '../components/DashboardComponents/PatientInOutCard';

export const AdminDashboard = () => {

    return (
        <>

            <DashboardData />

            <ChartView />

            <PatientInOutCard />
        </>
    );
};

