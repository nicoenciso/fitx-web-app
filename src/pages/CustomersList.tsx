import { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { db } from "../firebase/connection";
import { collection, getDocs } from "firebase/firestore";

interface Customers {
  id: string;
  active?: boolean;
  cost?: number;
  durationDays?: number;
  email?: string;
  expirationDate?: string;
  gymId?: string;
  lastNames?: string;
  names?: string;
  paymentDate?: string;
}

/**
 * Customers list page component
 * @returns {JSX.Element}
 */
const CustomersList = () => {
  const [customers, setCustomers] = useState<Customers[] | []>([]);

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
    </Stack>
  );
};

export default CustomersList;
