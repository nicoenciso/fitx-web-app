import { Route, Routes } from "react-router";
import Dashboard from "../pages/Dashboard";
import Layout from "../components/Layout";
import CustomersList from "../pages/CustomersList";
import Auth from "../pages/Login";
import Help from "../pages/Help";

/**
 * Component that defines the application routes.
 * This component uses React Router to define the routes for the application.
 * @returns {JSX.Element}
 */
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="clientes" element={<CustomersList />} />
        <Route path="ayuda" element={<Help />} />
        <Route path="iniciar" element={<Auth />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
