// src/admin/AdminApp.jsx
import React, { useState } from "react";
import AdminDashboard from "./AdminDashboard";
import Login from "./Login";

export default function AdminApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return isLoggedIn ? (
    <AdminDashboard />
  ) : (
    <Login onLogin={setIsLoggedIn} />
  );
}
