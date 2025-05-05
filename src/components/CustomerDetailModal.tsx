import { useState } from "react";
import Typography from "@mui/material/Typography";
import { Customer } from "../interfaces/Customer";
import theme from "../styles/theme";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import formatTimestamp from "../utils/FormatTimestamp";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import greenCircle from "../assets/green-circle.svg";
import redCircle from "../assets/red-circle.svg";
import { editCustomer } from "../services/customers";
import { useCustomerContext } from "../hooks/useCustomerContext";
import PriceChangeOutlinedIcon from "@mui/icons-material/PriceChangeOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import PaymentsModal from "./PaymentsModal";

interface CustomerDetailModalProps {
  open: boolean;
  data: Customer;
  onClose: () => void;
}

const label = { inputProps: { "aria-label": "Size switch demo" } };

const CustomerDetailModal: React.FC<CustomerDetailModalProps> = ({
  open,
  data,
  onClose,
}) => {
  const [edit, setEdit] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openPayments, setOpenPayments] = useState(false);
  const [form, setForm] = useState({
    active: data.active,
    names: data.names,
    lastNames: data.lastNames,
    durationDays: data.durationDays,
    cost: data.cost,
  });
  const { fetchCustomers } = useCustomerContext();

  const resetForm = () => {
    setForm({
      active: data.active,
      names: data.names,
      lastNames: data.lastNames,
      durationDays: data.durationDays,
      cost: data.cost,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayments = () => {
    setOpenPayments((prev) => !prev);
  };

  const handleEdit = () => {
    if (edit) {
      resetForm();
    }
    setEdit((prev) => !prev);
  };

  const handleSave = () => {
    editCustomer(data.id, { ...form }).finally(() => {
      fetchCustomers();
    });
    setEdit(false);
  };

  const handleClose = () => {
    onClose();
    setEdit(false);
  };

  const handleConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      disableEnforceFocus
      maxWidth="xs"
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
        "& .MuiInputBase-root": {
          boxShadow: `0px 4px 4px ${theme.palette.primary.light}`,
        },
      }}
    >
      <Typography variant="inherit" align="right">
        <CloseOutlinedIcon
          onClick={handleClose}
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
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="start"
          alignItems="center"
          spacing={3}
        >
          {form.active ? (
            <img src={greenCircle} width={20} height={20} />
          ) : (
            <img src={redCircle} />
          )}
          {edit ? (
            <Stack direction="row" spacing={1}>
              <TextField
                label="Nombres"
                variant="outlined"
                size="small"
                name="names"
                value={form.names}
                onChange={handleChange}
                sx={{ width: "40%" }}
              />
              <TextField
                label="Apellidos"
                variant="outlined"
                size="small"
                name="lastNames"
                value={form.lastNames}
                onChange={handleChange}
                sx={{ width: "40%" }}
              />
            </Stack>
          ) : (
            <Typography
              fontWeight="bold"
              align="center"
              fontFamily="Instrument Sans, sans-serif"
            >
              {`${form.names} ${form.lastNames}`.toUpperCase()}
            </Typography>
          )}
        </Stack>
        {edit && (
          <Stack direction="row" sx={{ alignItems: "center", mt: 1 }}>
            <Typography>Inactivo</Typography>
            <Switch
              {...label}
              name="active"
              checked={form.active}
              color="success"
              size="small"
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
              slotProps={{ input: { "aria-label": "controlled" } }}
            />
            <Typography>Activo</Typography>
          </Stack>
        )}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={2}>
          <Typography
            variant="subtitle1"
            display="flex"
            alignItems="center"
            gap={1}
          >
            Costo:{" "}
            {edit ? (
              <TextField
                hiddenLabel
                variant="outlined"
                size="small"
                name="cost"
                value={form.cost}
                onChange={handleChange}
              />
            ) : (
              form.cost
            )}
          </Typography>
          <Typography
            variant="subtitle1"
            display="flex"
            alignItems="center"
            gap={1}
          >
            Duración:{" "}
            {edit ? (
              <TextField
                hiddenLabel
                variant="outlined"
                size="small"
                name="durationDays"
                value={form.durationDays}
                onChange={handleChange}
              />
            ) : (
              form.durationDays
            )}
          </Typography>
          <Typography
            variant="subtitle1"
            display="flex"
            alignItems="center"
            gap={1}
          >
            Email: {data.email}
          </Typography>
          <Typography
            variant="subtitle1"
            display="flex"
            alignItems="center"
            gap={2}
          >
            Vto:{" "}
            {data.expirationDate
              ? formatTimestamp(
                  data.expirationDate.seconds,
                  data.expirationDate.nanoseconds
                )
              : "-"}
          </Typography>
          <Typography
            variant="subtitle1"
            display="flex"
            alignItems="center"
            gap={2}
          >
            Pago:{" "}
            {data.paymentDate
              ? formatTimestamp(
                  data.paymentDate.seconds,
                  data.paymentDate.nanoseconds
                )
              : "-"}
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        {!edit && (
          <Button
            onClick={handlePayments}
            startIcon={<PriceChangeOutlinedIcon />}
            size="small"
            sx={{
              color: "primary.contrastText",
              background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              borderRadius: 0,
              mr: 3,
              px: 1,
              border: `1px solid ${theme.palette.primary.contrastText}`,
              "& .MuiButton-loadingIndicator": {
                color: "primary.contrastText",
              },
            }}
          >
            Pagos
          </Button>
        )}
        {edit ? (
          <Button
            onClick={handleEdit}
            size="small"
            sx={{
              color: "primary.contrastText",
              backgroundColor: "primary.dark",
              borderRadius: 0,
              border: `1px solid ${theme.palette.primary.contrastText}`,
            }}
          >
            Cancelar edición
          </Button>
        ) : (
          <Button
            onClick={handleEdit}
            startIcon={<EditOutlinedIcon />}
            size="small"
            sx={{
              color: "primary.contrastText",
              backgroundColor: "primary.dark",
              borderRadius: 0,
              px: 1,
              border: `1px solid ${theme.palette.primary.contrastText}`,
            }}
          >
            Editar
          </Button>
        )}
        {edit ? (
          <Button
            onClick={handleSave}
            size="small"
            sx={{
              color: "primary.contrastText",
              backgroundColor: "primary.main",
              borderRadius: 0,
              border: `1px solid ${theme.palette.primary.contrastText}`,
            }}
          >
            Guardar
          </Button>
        ) : (
          <Button
            onClick={handleConfirm}
            startIcon={<DeleteForeverOutlinedIcon />}
            size="small"
            sx={{
              color: "primary.contrastText",
              backgroundColor: "primary.main",
              borderRadius: 0,
              px: 1,
              border: `1px solid ${theme.palette.primary.contrastText}`,
              "& .MuiButton-loadingIndicator": {
                color: "primary.contrastText",
              },
            }}
          >
            Eliminar
          </Button>
        )}
      </DialogActions>
      <ConfirmDeleteModal
        id={data.id}
        keepMounted
        open={openConfirm}
        onClose={handleCloseConfirm}
        handleClose={handleClose}
      />
      <PaymentsModal
        customer={data}
        open={openPayments}
        onClose={handlePayments}
      />
    </Dialog>
  );
};

export default CustomerDetailModal;
