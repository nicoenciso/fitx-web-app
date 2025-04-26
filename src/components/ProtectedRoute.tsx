import { Navigate, Outlet } from "react-router";
import useUserSession from "../hooks/useUserSession";
import Loading from "./Loading";

/**
 * Protected route component with user and loading states for react-router
 * @returns react-router Outlet component
 */
const ProtectedRoute = () => {
  const { user, loading } = useUserSession();

  if (loading) return <Loading />;
  if (!user) return <Navigate to="/iniciar" />;

  return <Outlet />;
};

export default ProtectedRoute;
