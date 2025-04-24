import { Typography } from "@mui/material";
import DataBadge from "../components/DataBadge";
import GroupsIcon from "@mui/icons-material/Groups";

/**
 * Component that displays a badge for registered customers.
 * This component uses the DataBadge component to display the number of registered customers.
 * @returns {JSX.Element}
 */
const RegisteredCustomersBadge = () => {
  return (
    <DataBadge
      variant="special"
      icon={<GroupsIcon sx={{ color: "primary.contrastText", fontSize: 50 }} />}
      title="CLIENTES REGISTRADOS"
    >
      <Typography
        color="primary.contrastText"
        variant="h3"
        fontWeight="bold"
        sx={{ fontFamily: "Instrument Sans, sans-serif" }}
      >
        169
      </Typography>
    </DataBadge>
  );
};

export default RegisteredCustomersBadge;
