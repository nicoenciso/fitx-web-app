import { Box, Stack, Typography } from "@mui/material";
import greenCircle from "../assets/green-circle.svg";
import redCircle from "../assets/red-circle.svg";
import theme from "../styles/theme";
import { OwnerGym } from "../interfaces/OwnerGym";

interface OwnerGymBadgeProps {
  owner: OwnerGym;
  onClick: (owner: OwnerGym) => void;
}

const OwnerGymBadge: React.FC<OwnerGymBadgeProps> = ({ owner, onClick }) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      spacing={{ xs: 3, sm: 10 }}
      onClick={() => onClick(owner)}
      sx={{
        width: { xs: "100%", sm: 600 },
        border: `1px solid ${theme.palette.primary.contrastText}`,
        borderRadius: 3,
        background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        py: 0.5,
        px: 1,
        cursor: "pointer",
        ":hover": { borderColor: theme.palette.primary.dark },
      }}
    >
      {owner.active ? (
        <img src={greenCircle} width={20} height={20} />
      ) : (
        <img src={redCircle} width={20} height={20} />
      )}
      <Typography
        color="primary.contrastText"
        fontWeight="bold"
        align="center"
        fontFamily="Instrument Sans, sans-serif"
        width={150}
        noWrap
      >
        {owner.gymName ? `${owner.gymName}`.toUpperCase() : "SIN ASIGNAR"}
      </Typography>
      <Box width={20} />
    </Stack>
  );
};

export default OwnerGymBadge;
