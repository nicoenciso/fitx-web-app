import { Route, Routes } from "react-router";
import Dashboard from "../pages/Dashboard";
import Layout from "../components/layout/Layout";

/**
 * Component that defines the application routes.
 * This component uses React Router to define the routes for the application.
 * @returns {JSX.Element}
 */
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
