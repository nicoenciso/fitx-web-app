import { Stack, Typography } from "@mui/material";
import CustomersList from "../components/CustomersList";
import CreateCustomerModal from "../components/CreateCustomerModal";

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
        my={4}
      >
        LISTA DE CLIENTES
      </Typography>
      <CustomersList />
      <CreateCustomerModal />
    </Stack>
  );
};

export default Customers;
