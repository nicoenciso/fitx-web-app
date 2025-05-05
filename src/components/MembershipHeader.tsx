import { Stack, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useCustomerContext } from "../hooks/useCustomerContext";

/**
 * Component for the membership header.
 * This component displays the membership value.
 * @returns {JSX.Element}
 */
const MembershipHeader = () => {
  const { highestCostCustomer } = useCustomerContext()
  return (
    <Stack sx={{ p: 1, bgcolor: "secondary.main" }}>
      <Typography
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
        color="primary.contrastText"
        fontWeight="bold"
      >
        <StarIcon />
        VALOR MEMBRESIA {highestCostCustomer}
        <StarIcon />
      </Typography>
    </Stack>
  );
};

export default MembershipHeader;
