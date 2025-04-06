import { useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MenuIcon from "@mui/icons-material/Menu";

/**
 * Component for the application drawer.
 * @returns {JSX.Element}
 */
const DrawerCustom = () => {
  const [open, setOpen] = useState(false);

  const icons = [
    <HomeOutlinedIcon sx={{ color: "primary.contrastText" }} />,
    <ChecklistOutlinedIcon sx={{ color: "primary.contrastText" }} />,
  ];

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {["Inicio", "Ver lista de clientes"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{icons[index]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ bgcolor: "primary.dark" }} />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HelpOutlineIcon sx={{ color: "primary.contrastText" }} />
            </ListItemIcon>
            <ListItemText primary="Ayuda" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        sx={(theme) => ({
          "& .MuiDrawer-paper": {
            color: "primary.contrastText",
            border: `1px solid ${theme.palette.primary.dark}`,
            background: `linear-gradient(${theme.palette.primary.main},${theme.palette.primary.main} 50%, ${theme.palette.primary.dark} 100%)`,
          },
        })}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default DrawerCustom;
