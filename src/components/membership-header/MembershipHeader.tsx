import { Stack, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

/**
 * Component for the membership header.
 * This component displays the membership value.
 * @returns {JSX.Element}
 */
const MembershipHeader = () => {
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
        VALOR MEMBRESIA 13000
        <StarIcon />
      </Typography>
    </Stack>
  );
};

export default MembershipHeader;
