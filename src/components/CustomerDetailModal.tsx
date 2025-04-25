import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Customer from "../interfaces/Customer";
import theme from "../styles/theme";
import CustomerTitle from "./CustomerTitle";
import { Stack } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import formatTimestamp from "../utils/FormatTimestamp";

interface CustomerDetailModalProps {
  open: boolean;
  data: Customer | null;
  onClose: () => void;
}

const CustomerDetailModal: React.FC<CustomerDetailModalProps> = ({
  open,
  data,
  onClose,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: theme.palette.primary.dark,
          background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          borderRadius: 1,
          border: `3px solid ${theme.palette.primary.dark}`,
          boxShadow: 24,
          px: 4,
          pt: 1,
          pb: 4,
          "& .MuiTypography-root": {
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
              bgcolor: theme.palette.primary.main,
              cursor: "pointer",
            }}
          />
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <CustomerTitle customer={data} />
        </Stack>
        <Stack spacing={2} mt={3}>
          <Typography variant="subtitle1">
            Duración: {data?.durationDays}
          </Typography>
          <Typography variant="subtitle1">Costo: {data?.cost}</Typography>
          <Typography variant="subtitle1">Email: {data?.email}</Typography>
          {data?.expirationDate && (
            <Typography variant="subtitle1">
              Vemcimiento:{" "}
              {formatTimestamp(
                data.expirationDate.seconds,
                data.expirationDate.nanoseconds
              )}
            </Typography>
          )}
          {data?.paymentDate && (
            <Typography variant="subtitle1">
              Pago:{" "}
              {formatTimestamp(
                data.paymentDate.seconds,
                data.paymentDate.nanoseconds
              )}
            </Typography>
          )}
        </Stack>
      </Box>
    </Modal>
  );
};

export default CustomerDetailModal;
