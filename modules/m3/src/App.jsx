

import { Route, Routes } from 'react-router-dom'
import PatientList from './pages/PatientList'
import PatientOverview from './pages/PatientOverview'
import AccessAudit from './pages/AccessAudit'
import {Layout} from "../layout"

export default function App() {

  return (

    <Routes>
      <Route element={<Layout />}>
        <Route index element={<PatientList />} />            {/* default */}
        <Route path="/patient/:id" element={<PatientOverview />} />
        <Route path="/access/:id" element={<AccessAudit />} />
        <Route path="*" element={<PatientList />} />         {/* catch-all */}
      </Route>
    </Routes>

  )
}