import { Routes, Route } from "react-router-dom";
import UserRegister from "./Components/auth/UserRegister";
import PlannerRegister from "./Components/auth/PlannerRegister";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserRegister />} />
      <Route path="/user-register" element={<UserRegister />} />
      <Route path="/planner-register" element={<PlannerRegister />} />
    </Routes>
  );
}

export default App;
