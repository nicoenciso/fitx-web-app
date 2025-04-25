import { Stack } from "@mui/material";
import theme from "../styles/theme";
import Customer from "../interfaces/Customer";
import CustomerTitle from "./CustomerTitle";

interface CustomerBadgeProps {
  customer: Customer
  onClick: (customer: Customer) => void;
}

/**
 * Customer badge component
 */
const CustomerBadge: React.FC<CustomerBadgeProps> = ({
  customer,
  onClick,
}) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      spacing={{ xs: 3, sm: 10 }}
      onClick={() => onClick(customer)}
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
      <CustomerTitle customer={customer} />
    </Stack>
  );
};

export default CustomerBadge;
