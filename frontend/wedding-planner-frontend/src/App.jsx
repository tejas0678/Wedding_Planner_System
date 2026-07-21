import { Routes, Route } from "react-router-dom";
import UserRegister from "./Components/auth/UserRegister";
import PlannerRegister from "./Components/auth/PlannerRegister";
import Login from "./Components/auth/Login";
import ForgotPassword from "./Components/auth/ForgetPassword";

// Import all Planner Dashboard components
import {
  PlannerDashboard,
  PlannerProfile,
  PlannerServices,
  PlannerGallery,
  PlannerBookings,
  PlannerTasks,
  PlannerPayments,
  PlannerReviews
} from "./Components/Planner/PlannerDashboard";

function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={<UserRegister />} />
      <Route path="/user-login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
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
    </Routes>
  );
}

export default App;