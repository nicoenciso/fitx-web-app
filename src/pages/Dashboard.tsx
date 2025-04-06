import { Stack } from "@mui/material";
import MembershipHeader from "../components/membership-header/MembershipHeader";
import BadgesContainer from "../components/badges-container/BadgesContainer";

/**
 * Dashboard page component.
 * This component serves as the main dashboard for the application.
 * @returns {JSX.Element}
 */
const Dashboard = () => {
  return (
    <Stack>
      <MembershipHeader />
      <BadgesContainer />
    </Stack>
  );
};

export default Dashboard;
