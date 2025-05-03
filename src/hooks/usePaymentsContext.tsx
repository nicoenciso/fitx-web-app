import { useContext } from "react";
import PaymentsContext from "../contexts/PaymentsContext";

export const usePaymentsContext = () => {
  const context = useContext(PaymentsContext);
  if (!context) {
    throw new Error(
      "usePaymentsContext must be used within a PaymentsProvider"
    );
  }
  return context;
};