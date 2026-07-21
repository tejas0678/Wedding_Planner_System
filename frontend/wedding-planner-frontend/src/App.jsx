import { Routes, Route } from "react-router-dom";
import UserRegister from "./Components/auth/UserRegister";
import PlannerRegister from "./Components/auth/PlannerRegister";
import Login from "./Components/auth/Login";
import ForgotPassword from "./Components/auth/ForgetPassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserRegister />} />
      <Route path="/user-login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="/user-register" element={<UserRegister />} />
      <Route path="/planner-register" element={<PlannerRegister />} />
    </Routes>
  );
}

export default App;
