import { useState } from "react";
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
import theme from "../styles/theme";
import dayjs, { Dayjs } from "dayjs";
import { addPaymentToCustomer } from "../services/payments";
import { toast } from "react-toastify";
import { usePaymentsContext } from "../hooks/usePaymentsContext";
import { Customer } from "../interfaces/Customer";

interface NewPaymentModalProps {
  customer: Customer
  open: boolean;
  onClose: () => void;
}

const NewPaymentModal: React.FC<NewPaymentModalProps> = ({
  customer,
  open,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(customer.cost || 0);
  const [date, setDate] = useState<Dayjs | null>(dayjs(new Date()));
  const { fetchPayments } = usePaymentsContext();

  const handleAddPayment = async () => {
    try {
      setLoading(true);
      await addPaymentToCustomer({
        customerId: customer.id,
        amount: amount,
        date: date?.toDate(),
      });
      toast.success("Pago registrado con éxito");
      fetchPayments();
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Error al registrar el pago");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      keepMounted
      open={open}
      sx={{
        "& .MuiPaper-root": {
          background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          borderRadius: 1,
          border: `2px solid ${theme.palette.primary.dark}`,
          boxShadow: 24,
          p: 4,
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
      <DialogTitle align="center">NUEVO PAGO</DialogTitle>
      <DialogContent
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Stack spacing={4} mt={4} width={200}>
          <TextField
            type="number"
            label="Monto ($)"
            variant="outlined"
            size="small"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
          />
          <TextField
            type="date"
            label="Fecha"
            variant="outlined"
            size="small"
            name="date"
            value={date ? date.format("YYYY-MM-DD") : ""}
            onChange={(e) => setDate(dayjs(e.target.value))}
          />
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
          gap: 1,
        }}
      >
        <Button
          onClick={onClose}
          size="small"
          sx={{
            width: 90,
            color: "primary.contrastText",
            backgroundColor: "primary.dark",
            borderRadius: 0,
            border: `1px solid ${theme.palette.primary.contrastText}`,
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleAddPayment}
          loading={loading}
          size="small"
          sx={{
            width: 90,
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

export default NewPaymentModal;
