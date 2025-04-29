import { useState } from "react";
import {
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useUserContext } from "../hooks/useUserContext";
import { logout } from "../services/authentication";

/**
 * Component for the main menu of the application.
 * It displays a user icon and a menu with options for the user.
 * @returns {JSX.Element}
 */
const MainMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, gym } = useUserContext();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout()
  };

  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={(theme) => ({
          "& .MuiPaper-root": {
            background: `linear-gradient(${theme.palette.primary.main},${theme.palette.primary.main} 50%, ${theme.palette.primary.dark} 100%)`,
            color: "primary.contrastText",
            border: `1px solid ${theme.palette.primary.dark}`,
          },
        })}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AccountCircle sx={{ color: "primary.contrastText" }} />
          </ListItemIcon>
          <Stack>
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ fontFamily: "Instrument Sans, sans-serif" }}
            >
              {user?.displayName}
            </Typography>
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ fontFamily: "Instrument Sans, sans-serif" }}
            >
              {gym?.name}
            </Typography>
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ fontFamily: "Instrument Sans, sans-serif" }}
            >
              {user?.email}
            </Typography>
          </Stack>
        </MenuItem>
        <Divider sx={{ bgcolor: "primary.dark" }} />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <SettingsIcon sx={{ color: "primary.contrastText" }} />
          </ListItemIcon>
          Configuración
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonIcon sx={{ color: "primary.contrastText" }} />
          </ListItemIcon>
          Perfil
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon sx={{ color: "primary.contrastText" }} />
          </ListItemIcon>
          Cerrar sesión
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MainMenu;
