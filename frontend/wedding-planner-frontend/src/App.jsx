import { Routes, Route,  } from "react-router-dom";
import { BrowserRouter, Navigate } from 'react-router-dom'

import UserRegister from "./Components/auth/UserRegister";
import PlannerRegister from "./Components/auth/PlannerRegister";
import Login from "./Components/auth/Login";
import ForgetPassword from "./Components/auth/ForgetPassword";

// Import Planner Dashboard components
import {
  PlannerDashboard,
  PlannerProfile,
  PlannerServices,
  PlannerGallery,
  PlannerBookings,
  PlannerTasks,
  PlannerPayments,
  PlannerReviews,
} from "./Components/Planner/PlannerDashboard";

import { AppDataProvider } from './Components/client/context/AppDataContext'
import ClientLayout from './Components/client/pages/ClientLayout'
import Dashboard from './Components/client/pages/Dashboard'
import Planners from './Components/client/pages/Planners'
import Packages from './Components/client/pages/Packages'
import Bookings from './Components/client/pages/Bookings'
import Payments from './Components/client/pages/Payments'
import Feedback from './Components/client/pages/Feedback'
import Profile from './Components/client/pages/Profile'

function App() {
  return (
    <Routes>
      {/* Auth Routes */}
     
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgetPassword />} />
      <Route path="/user-register" element={<UserRegister />} />
      <Route path="/planner-register" element={<PlannerRegister />} />

      {/* Planner Dashboard Routes */}
      <Route path="/planner-dashboard" element={<PlannerDashboard />} />
      <Route path="/planner-profile" element={<PlannerProfile />} />
      <Route path="/planner-services" element={<PlannerServices />} />
      <Route path="/planner-gallery" element={<PlannerGallery />} />
      <Route path="/planner-bookings" element={<PlannerBookings />} />
      <Route path="/planner-tasks" element={<PlannerTasks />} />
      <Route path="/planner-payments" element={<PlannerPayments />} />
      <Route path="/planner-reviews" element={<PlannerReviews />} />

      {/* Client Dashboard Routes */}
      <Route
        path="/client"
        element={
          <AppDataProvider>
            <ClientLayout />
          </AppDataProvider>
        }
      >
        <Route index element={<Navigate to="/client/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="planners" element={<Planners />} />
        <Route path="packages" element={<Packages />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="payments" element={<Payments />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/client/dashboard" replace />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// 404 Page
const NotFound = () => (
  <div>
    <h1>404</h1>
    <p>Page not found</p>
  </div>
);

export default App;