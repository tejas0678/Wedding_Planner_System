import { Routes, Route } from "react-router-dom";
import UserRegister from "./Components/auth/UserRegister";
import PlannerRegister from "./Components/auth/PlannerRegister";
import Login from "./Components/auth/Login";
import ForgetPassword from "./Components/auth/ForgetPassword";

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
      <Route path="/login" element={<Login />} />
      <Route path="/user-login" element={<Login />} />
      <Route path="/planner-login" element={<Login />} />
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

      {/* Catch all - 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// 404 Page Component
const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#f8f4f0] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-3xl font-bold text-gray-800">404</h1>
        <p className="text-gray-600 mt-2">Page not found</p>
        <a 
          href="/" 
          className="mt-4 inline-block bg-pink-600 text-white px-6 py-2.5 rounded-lg hover:bg-pink-700 transition"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default App;