import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  // Change "token" → whatever key you use in localStorage after login
  const isLoggedIn = !!localStorage.getItem("token");

  // If not logged in → redirect to login
  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  // If logged in → render child routes
  return <Outlet />;
}

export default ProtectedRoute;