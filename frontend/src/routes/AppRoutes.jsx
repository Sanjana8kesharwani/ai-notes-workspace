import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Notes from "../pages/Notes";

import ProtectedRoute from "./ProtectedRoute";

import SharedNote from "../pages/SharedNote";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}

        <Route path="/" element={<Login />} />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* PROTECTED ROUTES */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        />

        <Route
  path="/shared/:shareId"
  element={<SharedNote />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;