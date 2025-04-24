import { Grid } from "@mui/material";
import RegisteredCustomersBadge from "./RegisteredCustomersBadge";
import CurrentEarningsBadge from "./CurrentEarningsBadge";
import ActiveCustomersBadge from "./ActiveCustomersBadge";
import DelinquentCustomersBadge from "./DelinquentCustomersBadge";
import SeeCustomersBadge from "./SeeCustomersBadge";
import MonthlyIncome from "./MonthlyIncome";

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
