import { Button, Paper } from "@mui/material";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import { useNavigate } from "react-router";

/**
 * See customers badge component.
 * @returns {JSX.Element}
 */
const SeeCustomersBadge = () => {
  const navigate = useNavigate();

  return (
    <Paper
      sx={(theme) => ({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.main} 50%, ${theme.palette.primary.dark} 100%)`,
        width: { xs: "100%", lg: 600 },
        height: "3rem",
        borderRadius: 0,
        p: 0,
      })}
    >
      <Button
        variant="outlined"
        startIcon={<ChecklistOutlinedIcon />}
        sx={{
          color: "primary.contrastText",
          px: 5,
          borderColor: "primary.contrastText",
          borderRadius: 0,
        }}
        onClick={() => navigate("/clientes")}
      >
        VER LISTA DE CLIENTES
      </Button>
    </Paper>
  );
};

export default SeeCustomersBadge;
