import Layout from "./src/components/Layout.jsx"
import GeneratePrescription from "./src/pages/GeneratePrescription.jsx"
import PharmacyFulfillment from "./src/pages/PharmacyFulfillment.jsx"

export const m4Routes = [
  {
    path: "/prescription",
    element: <Layout />,     // Layout reads stats via context
    children: [
      { index: true, element: <GeneratePrescription /> },
      { path: "new", element: <GeneratePrescription /> },
      { path: "pharmacy", element: <PharmacyFulfillment /> }, // root /pharmacy
      // or nested variant: { path: "pharmacy", element: <PharmacyFulfillment /> }
    ],
  },
]
