import { useState } from "react";
import { Customer } from "../interfaces/Customer";

const useCustomerDetailModal = () => {
  const [open, setOpen] = useState(false);
  const [customerDetail, setCustomerDetail] = useState<Customer | null>(null);

  const handleOpen = (customer: Customer) => {
    setCustomerDetail(customer);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCustomerDetail(null);
  };

  return { open, customerDetail, handleOpen, handleClose };
};

export default useCustomerDetailModal;
