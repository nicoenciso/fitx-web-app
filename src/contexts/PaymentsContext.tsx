import { createContext, useState, ReactNode, useEffect } from "react";
import { useUserContext } from "../hooks/useUserContext";
import { Payment } from "../interfaces/Payment";
import { getPaymentsByGym } from "../services/payments";

interface PaymentsContextType {
  payments: Payment[];
  totalPayments: number;
  calculateMonthlyPayments: (
    payments: Payment[],
    targetMonthYear: string
  ) => number;
}

const PaymentsContext = createContext<PaymentsContextType | undefined>(
  undefined
);

export const PaymentsProvider = ({ children }: { children: ReactNode }) => {
  const [payments, setPayments] = useState<Payment[] | []>([]);
  const { user, gym } = useUserContext();

  const fetchPayments = () => {
    if (gym) {
      getPaymentsByGym(gym?.id).then((res) => setPayments(res));
    }
  };

  useEffect(() => {
    fetchPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, gym]);

  const totalPayments = payments.reduce(
    (sum, payment) => sum + (payment.amount || 0),
    0
  );

  const calculateMonthlyPayments = (
    payments: Payment[],
    targetMonthYear: string
  ) => {
    return payments
      .filter((p) => p.period === targetMonthYear)
      .reduce((sum, p) => sum + (p.amount || 0), 0);
  };

  return (
    <PaymentsContext.Provider
      value={{
        payments,
        totalPayments,
        calculateMonthlyPayments,
      }}
    >
      {children}
    </PaymentsContext.Provider>
  );
};

export default PaymentsContext;
