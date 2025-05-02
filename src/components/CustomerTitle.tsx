import { Box, Typography } from "@mui/material";
import greenCircle from "../assets/green-circle.svg";
import redCircle from "../assets/red-circle.svg";
import { Customer } from "../interfaces/Customer";

interface CustomerTitleProps {
  customer: Customer | null;
}

const CustomerTitle: React.FC<CustomerTitleProps> = ({ customer }) => {
  return (
    customer && (
      <>
        {customer.active ? (
          <img src={greenCircle} width={20} height={20} />
        ) : (
          <img src={redCircle} width={20} height={20} />
        )}
        <Typography
          color="primary.contrastText"
          fontWeight="bold"
          align="center"
          fontFamily="Instrument Sans, sans-serif"
          width={150}
          noWrap
        >
          {`${customer.names} ${customer.lastNames}`.toUpperCase()}
        </Typography>
        <Box width={20} />
      </>
    )
  );
};

export default CustomerTitle;
