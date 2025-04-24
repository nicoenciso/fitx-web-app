import { Stack } from "@mui/material";
import MembershipHeader from "../components/MembershipHeader";
import BadgesContainer from "../components/BadgesContainer";

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
