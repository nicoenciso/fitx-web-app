import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import theme from "../styles/theme";
import NewPaymentModal from "./NewPaymentModal";

interface PaymentsModalProps {
  id: string;
  open: boolean;
  onClose: () => void;
}

const PaymentsModal: React.FC<PaymentsModalProps> = ({ open, onClose }) => {
  const [openNewPayment, setOpenNewPayment] = useState(false);

  const handleOpenNewPayment = () => {
    setOpenNewPayment((prev) => !prev);
  };

  return (
    <Dialog
      keepMounted
      open={open}
      fullWidth
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
        "& .MuiInputBase-root": {
          boxShadow: `0px 4px 4px ${theme.palette.primary.light}`,
        },
      }}
    >
      <Typography variant="inherit" align="right">
        <CloseOutlinedIcon
          onClick={onClose}
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
      <DialogTitle>PAGOS</DialogTitle>
      <DialogContent>
        <Typography>Aqui va la lista de pagos</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleOpenNewPayment}
          size="small"
          startIcon={<PaidOutlinedIcon />}
          sx={{
            width: 120,
            mx: "auto",
            color: "primary.contrastText",
            borderRadius: 3,
            border: `2px solid ${theme.palette.primary.dark}`,
            boxShadow: `0px 4px 4px rgba(255, 0, 0, 0.4)`,
            "& .MuiButton-loadingIndicator": {
              color: "primary.contrastText",
            },
          }}
        >
          Añadir Pago
        </Button>
      </DialogActions>
      <NewPaymentModal open={openNewPayment} onClose={handleOpenNewPayment} />
    </Dialog>
  );
};

export default PaymentsModal;
