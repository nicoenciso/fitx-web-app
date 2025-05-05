import { Stack, Typography } from "@mui/material";
import OwnersGymList from "./OwnersGymList";

const SuperAdminPanel = () => {
  return (
    <Stack justifyContent="start" alignItems="center" spacing={2} mt={10}>
      <Typography
        variant="h6"
        color="primary.contrastText"
        fontWeight="bold"
        align="center"
        my={4}
      >
        LISTA DE GIMNASIOS
      </Typography>
      <OwnersGymList />
    </Stack>
  );
};

export default SuperAdminPanel;
