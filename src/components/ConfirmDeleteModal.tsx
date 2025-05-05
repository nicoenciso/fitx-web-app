import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import theme from "../styles/theme";
import { deleteCustomer } from "../services/customers";
import { useCustomerContext } from "../hooks/useCustomerContext";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useUserContext } from "../hooks/useUserContext";
import { useOwnersGymContext } from "../hooks/useOwnersGymContext";
import { deleteOwner } from "../services/owners";

interface ConfirmDeleteModalProps {
  id: string;
  keepMounted: boolean;
  open: boolean;
  onClose: () => void;
  handleClose: () => void;
}

/**
 * Confirmation modal component for customer elimination
 * @param props
 * @returns {JSX.Element}
 */
const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = (props) => {
  const { onClose, handleClose, id, open, ...other } = props;
  const [loading, setLoading] = useState(false);
  const { fetchCustomers } = useCustomerContext();
  const { fetchOwners } = useOwnersGymContext();
  const { user } = useUserContext();

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    setLoading(true);
    if (user?.role === "ownergym") {
      deleteCustomer(id)
        .then(() => setLoading(false))
        .finally(() => {
          onClose();
          handleClose();
          fetchCustomers();
        });
    }
    if (user?.role === "superadmin") {
      deleteOwner(id)
        .then(() => setLoading(false))
        .finally(() => {
          onClose();
          handleClose();
          fetchOwners();
        });
    }
  };

  return (
    <Dialog
      open={open}
      {...other}
      fullWidth
      maxWidth="xs"
      disableEnforceFocus
      sx={{
        "& .MuiPaper-root": {
          background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          borderRadius: 1,
          border: `2px solid ${theme.palette.primary.dark}`,
          boxShadow: 24,
          p: 2,
        },
        "& .MuiTypography-root": {
          textAlign: "center",
          color: theme.palette.primary.contrastText,
        },
      }}
    >
      <Typography variant="inherit" align="right">
        <CloseOutlinedIcon
          onClick={onClose}
          sx={{
            width: { xs: 20, sm: 15 },
            height: { xs: 20, sm: 15 },
            position: "absolute",
            right: 8,
            top: 8,
            bgcolor: theme.palette.primary.main,
            cursor: "pointer",
          }}
        />
      </Typography>
      <DialogTitle>Confirmar eliminación del cliente</DialogTitle>
      <DialogContentText variant="subtitle1" fontWeight="bold">
        ¿Está seguro de que quiere eliminar éste cliente?
      </DialogContentText>
      <DialogContentText variant="body2">
        Todos los registros correspondientes al cliente seleccionado serán
        eliminados.
      </DialogContentText>
      <DialogActions sx={{ mt: 3 }}>
        <Button
          onClick={handleCancel}
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
          onClick={handleOk}
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
  );
};

export default ConfirmDeleteModal;
