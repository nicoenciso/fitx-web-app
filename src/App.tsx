import { BrowserRouter } from "react-router";
import AppRoutes from "./router/routes";
import "./assets/fonts/fonts.css";

/**
 * Main application component
 * @module App
 * @description This component serves as the entry point for the application.
 * It imports the necessary styles and renders the main content of the app.
 * @author Nicolas Enciso for FITX
 * @date 2025-04-02
 * @version 1.0.0
 * @returns {JSX.Element}
 */
const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
