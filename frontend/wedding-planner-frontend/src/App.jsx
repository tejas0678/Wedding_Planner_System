// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import UserRegister from './Components/auth/UserRegister';
import PlannerRegister from './Components/auth/PlannerRegister';
import Layout from './Components/admin/Layout';
import Dashboard from './Components/admin/pages/Dashboard';
import ManageClients from './Components/admin/pages/ManageClients';
import ManagePlanners from './Components/admin/pages/ManagePlanners';
import ManagePackages from './Components/admin/pages/ManagePackages';
import ManageBookings from './Components/admin/pages/ManageBookings';
import MonitorPayments from './Components/admin/pages/MonitorPayments';
import FeedbackReports from './Components/admin/pages/FeedbackReports';

function App() {
  return (
    <Routes>
      {/* Public routes – no Layout */}
      <Route path="/" element={<UserRegister />} />
      <Route path="/user-register" element={<UserRegister />} />
      <Route path="/planner-register" element={<PlannerRegister />} />

      {/* Admin routes – all under /admin, with Layout */}
      <Route path="/admin" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="clients" element={<ManageClients />} />
        <Route path="planners" element={<ManagePlanners />} />
        <Route path="packages" element={<ManagePackages />} />
        <Route path="bookings" element={<ManageBookings />} />
        <Route path="payments" element={<MonitorPayments />} />
        <Route path="feedback" element={<FeedbackReports />} />
      </Route>
    </Routes>
  );
}

export default App;