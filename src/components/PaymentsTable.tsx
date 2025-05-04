import { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { getPaymentsByCustomer } from "../services/payments";
import { Payment } from "../interfaces/Payment";
import { usePaymentsContext } from "../hooks/usePaymentsContext";

interface PymentsTableProps {
  customerId: string;
}

const PaymentsTable: React.FC<PymentsTableProps> = ({ customerId }) => {
  const [paymentsByCustomer, setPaymentsByCustomer] = useState<Payment[] | []>(
    []
  );
  const { payments } = usePaymentsContext();

  useEffect(() => {
    getPaymentsByCustomer(customerId).then((res) => setPaymentsByCustomer(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payments]);

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        "& .MuiTableCell-root": { color: "primary.contrastText" },
      }}
    >
      <Table sx={{ minWidth: 200 }} aria-label="simple table">
        {paymentsByCustomer.length == 0 && (
          <caption style={{ color: "#fff" }}>
            No se ha registrado ningún pago aún.
          </caption>
        )}
        <TableHead>
          <TableRow>
            <TableCell>Monto ($)</TableCell>
            <TableCell>Mes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paymentsByCustomer.length > 0 &&
            paymentsByCustomer.map((payment) => (
              <TableRow
                key={payment.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {payment.amount}
                </TableCell>
                <TableCell>{payment.period}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PaymentsTable;
