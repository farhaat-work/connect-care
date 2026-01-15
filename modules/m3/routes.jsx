
// routes/patientRoutes.js
import PatientList from './src/pages/PatientList';
import PatientOverview from './src/pages/PatientOverview';
import AccessAudit from './src/pages/AccessAudit';
import {Layout} from "./layout"

export const m3Routes = [
  {
    path: "/EHR",
    element: <Layout />,     // Layout reads stats via context
    children: [
      { index: true, element: <PatientList /> },
      { path: "patient/:id", element: <PatientOverview /> },
      { path: "access/:id", element: <AccessAudit /> }, // root /pharmacy
      // or nested variant: { path: "pharmacy", element: <PharmacyFulfillment /> }
    ],
  },
]
