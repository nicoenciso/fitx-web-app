import { Stack } from "@mui/material";
import AppBarCustom from "../appbar/AppBarCustom";
import { Outlet } from "react-router";

/**
 * Layout component for the application.
 * @returns {JSX.Element}
 */
const Layout = () => {
  return (
    <Stack sx={{ height: "100%", minHeight: "100vh", bgcolor: "primary.main" }}>
      <AppBarCustom />
      <Outlet />
    </Stack>
  );
};

export default Layout;
