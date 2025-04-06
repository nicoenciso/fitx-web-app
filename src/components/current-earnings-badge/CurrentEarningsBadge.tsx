import { Typography } from "@mui/material";
import DataBadge from "../data-badge/DataBadge";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

/**
 * CurrentEarningsBadge component
 * This component displays the current earnings in a badge format.
 * @returns {JSX.Element}
 */
const CurrentEarningsBadge = () => {
  return (
    <DataBadge
      variant="special"
      icon={
        <MonetizationOnOutlinedIcon
          sx={{ color: "primary.contrastText", fontSize: 50 }}
        />
      }
      title="GANANCIAS ACTUALES"
    >
      <Typography
        color="primary.contrastText"
        variant="h3"
        fontWeight="bold"
        sx={{ fontFamily: "Instrument Sans, sans-serif" }}
      >
        195.000
      </Typography>
    </DataBadge>
  );
};

export default CurrentEarningsBadge;
