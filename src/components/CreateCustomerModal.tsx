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
import theme from "../styles/theme";
import { useUserContext } from "../hooks/useUserContext";
import { createCustomer } from "../services/customers";
import { useCustomerContext } from "../hooks/useCustomerContext";

const CreateCustomerModal = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { gym } = useUserContext();
  const { fetchCustomers } = useCustomerContext();
  const [form, setForm] = useState({
    names: "",
    lastNames: "",
    cost: 0,
    durationDays: 0,
    email: "",
    password: "",
  });

  const handleModal = () => {
    setOpen((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: type === "number" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = () => {
    if (gym) {
      setLoading(true);
      createCustomer({ ...form, gymId: gym.id })
        .then(() => setLoading(false))
        .finally(() => {
          handleModal();
          fetchCustomers();
        });
    }
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
        Añadir cliente
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
        <DialogTitle>Crear nuevo cliente</DialogTitle>
        <DialogContent>
          <Stack
            spacing={3}
            sx={{
              mt: 1,
              "& .MuiInputBase-root": {
                boxShadow: `0px 4px 4px ${theme.palette.primary.light}`,
              },
              "& .MuiFormHelperText-root": {
                color: "primary.contrastText",
              },
            }}
          >
            <TextField
              label="Nombres"
              variant="outlined"
              size="small"
              name="names"
              value={form.names}
              onChange={handleChange}
            />
            <TextField
              label="Apellidos"
              variant="outlined"
              size="small"
              name="lastNames"
              value={form.lastNames}
              onChange={handleChange}
            />
            <TextField
              type="number"
              label="Valor membresía"
              variant="outlined"
              size="small"
              name="cost"
              value={form.cost}
              onChange={handleChange}
            />
            <TextField
              type="number"
              label="Duración (días)"
              variant="outlined"
              size="small"
              name="durationDays"
              value={form.durationDays}
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
              helperText="* La contraseña debe contener al menos 6 carácteres."
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

export default CreateCustomerModal;
