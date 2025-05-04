import { AppBar, Toolbar, Typography } from "@mui/material";
import Logo from "./Logo";
import MainMenu from "./MainMenu";
import DrawerCustom from "./DrawerCustom";
import { useNavigate } from "react-router";

/**
 * Component for the application AppBar.
 * @returns {JSX.Element}
 */
const AppBarCustom = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
      <Toolbar>
        <DrawerCustom />
        <Typography
          onClick={() => navigate("/")}
          display="flex"
          justifyContent={{ xs: "center", sm: "left" }}
          alignItems="center"
          variant="h6"
          sx={{
            fontFamily: "Cheque, sans-serif",
            flexGrow: 1,
            cursor: "pointer",
          }}
        >
          <Logo />
          FITX
        </Typography>
        <MainMenu />
      </Toolbar>
    </AppBar>
  );
};

export default AppBarCustom;
