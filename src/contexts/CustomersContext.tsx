import { createContext, useState, ReactNode, useEffect } from "react";
import { db } from "../firebase/connection";
import { collection, getDocs } from "firebase/firestore";
import Customer from "../interfaces/Customer";

interface CustomerContextType {
  customers: Customer[];
  setCustomers: (customers: Customer[]) => void;
  registeredCustomers: number;
  activeCustomers: number;
  delinquentCustomers: number;
}

const CustomerContext = createContext<CustomerContextType | undefined>(
  undefined
);

export const CustomerProvider = ({ children }: { children: ReactNode }) => {
  const [customers, setCustomers] = useState<Customer[] | []>([]);

  useEffect(() => {
    const fetCustomers = async () => {
      const querySnapshot = await getDocs(collection(db, "customers"));
      setCustomers(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetCustomers();
  }, []);

  const registeredCustomers = customers.length;
  const activeCustomers = customers.filter(
    (customer) => customer.active
  ).length;
  const delinquentCustomers = customers.filter(
    (customer) => !customer.active
  ).length;

  return (
    <CustomerContext.Provider
      value={{
        customers,
        setCustomers,
        registeredCustomers,
        activeCustomers,
        delinquentCustomers,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerContext;
