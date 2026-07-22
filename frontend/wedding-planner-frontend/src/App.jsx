import { Routes, Route } from "react-router-dom";

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

function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={/* Home Component */} />
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