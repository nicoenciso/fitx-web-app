import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import { createOwner } from "../services/owners";
import { useOwnersGymContext } from "../hooks/useOwnersGymContext";
import theme from "../styles/theme";

const CreateOwnerGymModal = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { fetchOwners } = useOwnersGymContext();
  const [form, setForm] = useState({
    gymName: "",
    email: "",
    password: "",
  });

  const handleModal = () => {
    setOpen((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setLoading(true);
    createOwner({ ...form })
      .then(() => setLoading(false))
      .finally(() => {
        handleModal();
        fetchOwners();
      });
  };

  return (
    <>
      <Button
        onClick={handleModal}
        size="small"
        startIcon={<PersonAddAlt1OutlinedIcon />}
        sx={{
          width: 120,
          mx: "auto",
          color: "primary.contrastText",
          borderRadius: 3,
          border: `2px solid ${theme.palette.primary.dark}`,
          textTransform: "inherit",
          boxShadow: `0px 4px 4px rgba(255, 0, 0, 0.4)`,
          "& .MuiButton-loadingIndicator": {
            color: "primary.contrastText",
          },
        }}
      >
        Añadir usuario
      </Button>
      <Dialog
        open={open}
        onClose={handleModal}
        fullWidth
        disableEnforceFocus
        maxWidth="sm"
        sx={{
          "& .MuiPaper-root": {
            background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            borderRadius: 1,
            border: `2px solid ${theme.palette.primary.dark}`,
            boxShadow: 24,
            p: 2,
          },
          "& .MuiTypography-root": {
            color: theme.palette.primary.contrastText,
          },
        }}
      >
        <Typography variant="inherit" align="right">
          <CloseOutlinedIcon
            onClick={handleModal}
            sx={{
              width: 20,
              height: 20,
              position: "absolute",
              right: 8,
              top: 8,
              bgcolor: theme.palette.primary.main,
              cursor: "pointer",
            }}
          />
        </Typography>
        <DialogTitle>Crear nuevo usuario</DialogTitle>
        <DialogContent>
          <Stack
            spacing={3}
            sx={{
              mt: 1,
              "& .MuiInputBase-root": {
                boxShadow: `0px 4px 4px ${theme.palette.primary.light}`,
              },
            }}
          >
            <TextField
              label="Nombre del gimnasio"
              variant="outlined"
              size="small"
              name="gymName"
              value={form.gymName}
              onChange={handleChange}
            />
            <TextField
              label="Correo electrónico"
              variant="outlined"
              size="small"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <TextField
              label="Contraseña"
              variant="outlined"
              size="small"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleModal}
            size="small"
            sx={{
              color: "primary.contrastText",
              backgroundColor: "primary.dark",
              borderRadius: 0,
              border: `1px solid ${theme.palette.primary.contrastText}`,
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            loading={loading}
            size="small"
            sx={{
              color: "primary.contrastText",
              backgroundColor: "primary.main",
              borderRadius: 0,
              border: `1px solid ${theme.palette.primary.contrastText}`,
              "& .MuiButton-loadingIndicator": {
                color: "primary.contrastText",
              },
            }}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateOwnerGymModal;
