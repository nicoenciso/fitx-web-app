import { useState } from "react";
import Typography from "@mui/material/Typography";
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
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import greenCircle from "../assets/green-circle.svg";
import redCircle from "../assets/red-circle.svg";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { OwnerGym } from "../interfaces/OwnerGym";
import { useOwnersGymContext } from "../hooks/useOwnersGymContext";
import { editOwner } from "../services/owners";

interface OwnerGymDetailModalProps {
  open: boolean;
  data: OwnerGym;
  onClose: () => void;
}

const label = { inputProps: { "aria-label": "Size switch demo" } };

const OwnerGymDetailModal: React.FC<OwnerGymDetailModalProps> = ({
  open,
  data,
  onClose,
}) => {
  const [edit, setEdit] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [form, setForm] = useState({
    active: data.active,
    gymName: data.gymName,
  });
  const { fetchOwners } = useOwnersGymContext();

  const resetForm = () => {
    setForm({
      active: data.active,
      gymName: data.gymName,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    if (edit) {
      resetForm();
    }
    setEdit((prev) => !prev);
  };

  const handleSave = () => {
    editOwner(data.id, { ...form }).finally(() => {
      fetchOwners();
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
            <TextField
              hiddenLabel
              variant="outlined"
              size="small"
              name="gymName"
              value={form.gymName}
              onChange={handleChange}
              sx={{ width: "40%" }}
            />
          ) : (
            <Typography
              fontWeight="bold"
              align="center"
              fontFamily="Instrument Sans, sans-serif"
            >
              {form.gymName ? `${form.gymName}`.toUpperCase() : "SIN ASIGNAR"}
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
            Email: {data.email}
          </Typography>
          <Typography
            variant="subtitle1"
            display="flex"
            alignItems="center"
            gap={1}
          >
            Clientes activos: {data.activeCustomerCount}
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
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
    </Dialog>
  );
};

export default OwnerGymDetailModal;
