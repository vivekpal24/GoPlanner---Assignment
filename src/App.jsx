import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SchedulePage from "./pages/SchedulePage";
import WeekendPlanner from "./pages/Home"; // <-- Import your new page
import ViewPlan from "./components/ViewPlan"; // <-- Import the shared plan view page
import "./index.css";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/schedule"
          element={
            <PrivateRoute>
              <SchedulePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/weekendly"
          element={
            <PrivateRoute>
              <WeekendPlanner />
            </PrivateRoute>
          }
        />
        {/* ✅ Route for viewing shared weekend plans (no login required) */}
        <Route path="/view-plan" element={<ViewPlan />} />
      </Routes>
    </AuthProvider>
  );
}
