import { Grid } from "@mui/material";
import RegisteredCustomersBadge from "../registered-customers-badge/RegisteredCustomersBadge";
import CurrentEarningsBadge from "../current-earnings-badge/CurrentEarningsBadge";
import ActiveCustomersBadge from "../active-customers-badge/ActiveCustomersBadge";
import DelinquentCustomersBadge from "../delinquent-customers-badge/DelinquentCustomersBadge";
import SeeCustomersBadge from "../see-customers-badge/SeeCustomersBadge";
import MonthlyIncome from "../monthly-income/MonthlyIncome";

/**
 * Container component for badges.
 * @returns {JSX.Element}
 */
const BadgesContainer = () => {
  return (
    <Grid
      container
      spacing={3}
      direction="row"
      justifyContent="center"
      sx={{
        marginY: 5,
        p: 0,
      }}
    >
      <Grid
        container
        spacing={3}
        justifyContent={{ xs: "center", lg: "end" }}
        alignItems="center"
        size={{ xs: 12, lg: 6 }}
        sx={{ maxWidth: 500 }}
      >
        <RegisteredCustomersBadge />
        <CurrentEarningsBadge />
        <ActiveCustomersBadge />
        <DelinquentCustomersBadge />
      </Grid>
      <Grid
        container
        spacing={3}
        justifyContent={{ xs: "center", lg: "start" }}
        alignItems="center"
        size={{ xs: 12, lg: 6 }}
        sx={{ maxWidth: 500 }}
      >
        <SeeCustomersBadge />
        <MonthlyIncome />
      </Grid>
    </Grid>
  );
};

export default BadgesContainer;
