import { AppBar, Toolbar, Typography } from "@mui/material";
import Logo from "../logo/Logo";
import MainMenu from "../main-menu/MainMenu";
import DrawerCustom from "../drawer/DrawerCustom";

/**
 * Component for the application AppBar.
 * @returns {JSX.Element}
 */
const AppBarCustom = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
      <Toolbar>
        <DrawerCustom />
        <Typography
          display="flex"
          justifyContent={{ xs: "center", sm: "left" }}
          alignItems="center"
          variant="h6"
          sx={{
            fontFamily: "Cheque, sans-serif",
            flexGrow: 1,
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
