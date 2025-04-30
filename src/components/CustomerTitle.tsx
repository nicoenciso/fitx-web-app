import { Box, Typography } from "@mui/material";
import greenCircle from "../assets/green-circle.svg";
import redCircle from "../assets/red-circle.svg";
import { Customer } from "../interfaces/Customer";

const CustomerTitle = ({ customer }: { customer: Customer | null }) => {
  return (
    customer && (
      <>
        {customer.active ? (
          <img src={greenCircle} width={20} height={20} />
        ) : (
          <img src={redCircle} />
        )}
        <Typography
          color="primary.contrastText"
          fontWeight="bold"
          align="center"
          fontFamily="Instrument Sans, sans-serif"
        >
          {`${customer.names} ${customer.lastNames}`.toUpperCase()}
        </Typography>
        <Box width={20} />
      </>
    )
  );
};

export default CustomerTitle;
