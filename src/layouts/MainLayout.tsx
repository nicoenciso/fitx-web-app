import { Stack } from "@mui/material";
import AppBarCustom from "../components/AppBarCustom";
import { Outlet } from "react-router";

/**
 * Layout component for the application.
 * @returns {JSX.Element}
 */
const MainLayout = () => {
  return (
    <Stack
      sx={{
        width: "100w",
        height: "100%",
        minHeight: "100vh",
        bgcolor: "primary.main",
        overflow: "hidden",
      }}
    >
      <AppBarCustom />
      <Outlet />
    </Stack>
  );
};

export default MainLayout;
