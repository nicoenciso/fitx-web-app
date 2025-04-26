import { CircularProgress, Stack, Typography } from "@mui/material";

/**
 * Loading component
 * @returns {JSX.Element}
 */
const Loading = () => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: "primary.main",
        height: "100vh",
        color: "primary.contrastText",
      }}
    >
      <CircularProgress color="inherit" />
      <Typography>Cargando...</Typography>
    </Stack>
  );
};

export default Loading;
