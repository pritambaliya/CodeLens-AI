import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loader from "./Loader";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader size="lg" text="Loading..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}