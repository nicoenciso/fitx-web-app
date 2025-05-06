import { Stack } from "@mui/material";
import { useOwnersGymContext } from "../hooks/useOwnersGymContext";
import OwnerGymBadge from "./OwnerGymBadge";
import useOwnerDetailModal from "../hooks/useOwnerDetailModal";
import OwnerGymDetailModal from "./OwnerGymDetailModal";

const OwnersGymList = () => {
  const { owners } = useOwnersGymContext();
  const { open, ownerDetail, handleOpen, handleClose } = useOwnerDetailModal();

  return (
    <Stack
      justifyContent="start"
      alignItems="center"
      spacing={2}
      sx={{ mt: 3, height: "40vh", overflowY: "auto" }}
    >
      {owners.map((owner) => (
        <OwnerGymBadge key={owner.id} owner={owner} onClick={handleOpen} />
      ))}
      {ownerDetail && (
        <OwnerGymDetailModal
          open={open}
          onClose={handleClose}
          data={ownerDetail}
        />
      )}
    </Stack>
  );
};

export default OwnersGymList;
