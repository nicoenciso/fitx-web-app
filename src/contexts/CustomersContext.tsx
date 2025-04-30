import { createContext, useState, ReactNode, useEffect } from "react";
import { Customer } from "../interfaces/Customer";
import { useUserContext } from "../hooks/useUserContext";
import { getCustomers } from "../services/customers";

interface CustomerContextType {
  customers: Customer[];
  setCustomers: (customers: Customer[]) => void;
  fetchCustomers: () => void;
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

  const fetchCustomers = () => {
    if (gym) {
      getCustomers(gym?.id).then((res) => setCustomers(res));
    }
  };

  useEffect(() => {
    fetchCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        fetchCustomers,
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
