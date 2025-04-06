import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import Logo from "../logo/Logo";
import MainMenu from "../main-menu/MainMenu";

/**
 * Component for the application AppBar.
 * @returns {JSX.Element}
 */
const AppBarCustom = () => {

  return (
    <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
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
