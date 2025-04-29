import { createContext, useState, ReactNode, useEffect } from "react";
import Customer from "../interfaces/Customer";
import { useUserContext } from "../hooks/useUserContext";
import { getCustomers } from "../services/customers";

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
  const { user, gym } = useUserContext();

  useEffect(() => {
    if (gym) {
      getCustomers(gym?.id).then((res) => setCustomers(res));
    }
  }, [user, gym]);

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
