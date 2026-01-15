import AnalyticsHeader from "../components/AnalyticsComponents/AnalyticsHeader";
import AnalyticsFilter from "../components/AnalyticsComponents/AnalyticsFilter";
import RecoveryReadmissionChart from "../components/AnalyticsComponents/Chartcomponents/RecoveryReadmissionChart";
import PatientFlowChart from "../components/AnalyticsComponents/Chartcomponents/PatientFlowChart";
import DiseaseAnalyticsTable from "../components/AnalyticsComponents/DiseaseAnalyticsTable";
import AnalyticsInsights from "../components/AnalyticsComponents/AnalyticsInsights";

export default function Analytics() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <AnalyticsHeader />

      <AnalyticsFilter />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <RecoveryReadmissionChart 
        
        data = {[{ month: "Jan", recoveryRate: 82, readmissionRate: 12 },
  { month: "Feb", recoveryRate: 85, readmissionRate: 10 },
  { month: "Mar", recoveryRate: 80, readmissionRate: 43 },
  { month: "Apr", recoveryRate: 75, readmissionRate: 34 },
  { month: "Jun", recoveryRate: 50, readmissionRate: 18 },
  { month: "jul", recoveryRate: 81, readmissionRate: 16 }

]}/>
        <PatientFlowChart 
        data = {[
  { month: "Jan", inPatients: 450, outPatients: 720 },
  { month: "Feb", inPatients: 380, outPatients: 690 },
  { month: "Mar", inPatients: 380, outPatients: 690 },
  { month: "Apr", inPatients: 380, outPatients: 690 },
  { month: "May", inPatients: 380, outPatients: 690 },
  { month: "Jun", inPatients: 380, outPatients: 690 }

]
}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <DiseaseAnalyticsTable />
        <AnalyticsInsights />
      </div>
    </div>
  );
}
