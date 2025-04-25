import { createContext, useState, ReactNode, useEffect } from "react";
import { db } from "../firebase/connection";
import { collection, getDocs } from "firebase/firestore";
import Customer from "../interfaces/Customer";

interface CustomerContextType {
  customers: Customer[];
  setCustomers: (customers: Customer[]) => void;
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

  return (
    <CustomerContext.Provider value={{ customers, setCustomers }}>
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerContext;
