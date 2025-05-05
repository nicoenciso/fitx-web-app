import { useState } from "react";
import { OwnerGym } from "../interfaces/OwnerGym";

const useOwnerDetailModal = () => {
  const [open, setOpen] = useState(false);
  const [ownerDetail, setOwnerDetail] = useState<OwnerGym | null>(null);

  const handleOpen = (owner: OwnerGym) => {
    setOwnerDetail(owner);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOwnerDetail(null);
  };

  return { open, ownerDetail, handleOpen, handleClose };
};

export default useOwnerDetailModal;
