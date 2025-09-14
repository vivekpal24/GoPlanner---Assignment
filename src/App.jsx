import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import WeekendPlanner from "./pages/Home"; 
import ViewPlan from "./components/ViewPlan"; 
import NotFound from "./pages/NotFound"; // <-- Create this page
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
          path="/weekendly"
          element={
            <PrivateRoute>
              <WeekendPlanner />
            </PrivateRoute>
          }
        />
        <Route path="/view-plan" element={<ViewPlan />} />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}
