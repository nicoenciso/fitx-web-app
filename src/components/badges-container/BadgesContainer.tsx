import { Container } from "@mui/material";
import RegisteredCustomersBadge from "../registered-customers-badge/RegisteredCustomersBadge";
import CurrentEarningsBadge from "../current-earnings-badge/CurrentEarningsBadge";
import ActiveCustomersBadge from "../active-customers-badge/ActiveCustomersBadge";
import DelinquentCustomersBadge from "../delinquent-customers-badge/DelinquentCustomersBadge";
import SeeCustomersBadge from "../see-customers-badge/SeeCustomersBadge";

/**
 * Container component for badges.
 * @returns {JSX.Element}
 */
const BadgesContainer = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
        marginY: 2,
        p: 0,
      }}
    >
      <RegisteredCustomersBadge />
      <CurrentEarningsBadge />
      <ActiveCustomersBadge />
      <DelinquentCustomersBadge />
      <SeeCustomersBadge />
    </Container>
  );
};

export default BadgesContainer;
