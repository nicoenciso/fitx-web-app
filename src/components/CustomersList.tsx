import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import CustomerBadge from "./CustomerBadge";
import { db } from "../firebase/connection";
import { collection, getDocs } from "firebase/firestore";
import CustomerDetailModal from "./CustomerDetailModal";
import useCustomerDetailModal from "../hooks/useCustomerDetailModal";
import Customer from "../interfaces/Customer";

/**
 * Customers list component
 * @returns {JSX.Element}
 */
const CustomersList = () => {
  const [customers, setCustomers] = useState<Customer[] | []>([]);
  const { open, customerDetail, handleOpen, handleClose } =
    useCustomerDetailModal();

  // Obtener datos en tiempo real
  useEffect(() => {
    const fetCustomers = async () => {
      const querySnapshot = await getDocs(collection(db, "customers"));
      setCustomers(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetCustomers();
  }, []);
  console.log(customers);

  return (
    <Stack
      justifyContent="start"
      alignItems="center"
      sx={{ mt: 3, height: "70vh", overflowY: "auto" }}
    >
      {customers.map((customer) => (
        <CustomerBadge
          key={customer.id}
          onClick={handleOpen}
          customer={customer}
        />
      ))}
      <CustomerDetailModal
        open={open}
        onClose={handleClose}
        data={customerDetail}
      />
    </Stack>
  );
};

export default CustomersList;
