import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import theme from "../styles/theme";

interface NewPaymentModalProps {
  open: boolean;
  onClose: () => void;
}

const NewPaymentModal: React.FC<NewPaymentModalProps> = ({ open, onClose }) => {
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
      <DialogTitle>NUEVO PAGO</DialogTitle>
      <DialogContent>
        <Typography>Aqui va el formulario</Typography>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default NewPaymentModal;
