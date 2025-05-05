import { Stack } from "@mui/material";
import MembershipHeader from "../components/MembershipHeader";
import BadgesContainer from "../components/BadgesContainer";
import { useUserContext } from "../hooks/useUserContext";
import SuperAdminPanel from "../components/SuperAdminPanel";

/**
 * Dashboard page component.
 * This component serves as the main dashboard for the application.
 * @returns {JSX.Element}
 */
const Dashboard = () => {
  const { user } = useUserContext();
  return (
    <Stack>
      {user?.role === "ownergym" && (
        <>
          <MembershipHeader />
          <BadgesContainer />
        </>
      )}
      {user?.role === "superadmin" && <SuperAdminPanel />}
    </Stack>
  );
};

export default Dashboard;
