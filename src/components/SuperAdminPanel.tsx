import { Stack, Typography } from "@mui/material";
import OwnersGymList from "./OwnersGymList";
import CreateOwnerGymModal from "./CreateOwnerGymModal";

const SuperAdminPanel = () => {
  return (
    <Stack
      justifyContent="space-between"
      alignItems="center"
      spacing={4}
      sx={{ mt: 6, color: "primary.contrastText" }}
    >
      <Typography variant="h4" fontWeight="bold">
        SUPER ADMIN
      </Typography>
      <Typography variant="h6" fontWeight="bold">
        LISTA DE GIMNASIOS
      </Typography>
      <OwnersGymList />
      <CreateOwnerGymModal />
    </Stack>
  );
};

export default SuperAdminPanel;
