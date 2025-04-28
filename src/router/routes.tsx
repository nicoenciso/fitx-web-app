import { Route, Routes } from "react-router";
import Dashboard from "../pages/Dashboard";
import MainLayout from "../layouts/MainLayout";
import Customers from "../pages/Customers";
import Login from "../pages/Login";
import Help from "../pages/Help";
import ProtectedRoute from "../components/ProtectedRoute";

/**
 * Component that defines the application routes.
 * This component uses React Router to define the routes for the application.
 * @returns {JSX.Element}
 */
const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="clientes" element={<Customers />} />
          <Route path="ayuda" element={<Help />} />
        </Route>
      </Route>
      <Route path="iniciar" element={<Login />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
