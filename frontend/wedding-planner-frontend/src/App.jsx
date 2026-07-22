import { Routes, Route,  } from "react-router-dom";
import { BrowserRouter, Navigate } from 'react-router-dom'

import UserRegister from "./Components/auth/UserRegister";
import PlannerRegister from "./Components/auth/PlannerRegister";
import Login from "./Components/auth/Login";
import ForgetPassword from "./Components/auth/ForgetPassword";
import Layout from "./Components/admin/Layout";

import AdminDashboard from "./Components/admin/pages/Dashboard";
import ManageClients from "./Components/admin/pages/ManageClients";
import ManagePlanners from "./Components/admin/pages/ManagePlanners";
import ManagePackages from "./Components/admin/pages/ManagePackages";
import ManageBookings from "./Components/admin/pages/ManageBookings";
import MonitorPayments from "./Components/admin/pages/MonitorPayments";
import FeedbackReports from "./Components/admin/pages/FeedbackReports";

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
import ClientDashboard from './Components/client/pages/Dashboard'
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

      {/* Admin Dashboard Routes */}
      <Route path="/admin" element={<Layout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="clients" element={<ManageClients />} />
        <Route path="planners" element={<ManagePlanners />} />
        <Route path="packages" element={<ManagePackages />} />
        <Route path="bookings" element={<ManageBookings />} />
        <Route path="payments" element={<MonitorPayments />} />
        <Route path="feedback" element={<FeedbackReports />} />
      </Route>

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
        <Route path="dashboard" element={<ClientDashboard />} />
        <Route path="planners" element={<Planners />} />
        <Route path="packages" element={<Packages />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="payments" element={<Payments />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="profile" element={<Profile />} />
      </Route>

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