import { Stack, Typography } from "@mui/material";
import CustomersList from "../components/CustomersList";

/**
 * Customers list page component
 * @returns {JSX.Element}
 */
const Customers = () => {
  return (
    <Stack>
      <Typography
        variant="h6"
        color="primary.contrastText"
        fontWeight="bold"
        align="center"
        mt={4}
      >
        LISTA DE CLIENTES
      </Typography>
      <CustomersList />
    </Stack>
  );
};

export default Customers;
