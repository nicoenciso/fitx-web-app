import { useState } from "react";
import { Stack } from "@mui/material";
import CustomerBadge from "./CustomerBadge";
import CustomerDetailModal from "./CustomerDetailModal";
import useCustomerDetailModal from "../hooks/useCustomerDetailModal";
import FilterBar from "./FilterBar";
import { useCustomerContext } from "../hooks/useCustomerContext";

/**
 * Customers list component
 * @returns {JSX.Element}
 */
const CustomersList = () => {
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");
  const { customers } = useCustomerContext();
  const { open, customerDetail, handleOpen, handleClose } =
    useCustomerDetailModal();

  const filteredCustomers = customers.filter((customer) => {
    if (filter === "active") return customer.active;
    if (filter === "inactive") return !customer.active;
    return true;
  });

  return (
    <>
      <FilterBar actualFilter={filter} setFilter={setFilter} />
      <Stack
        justifyContent="start"
        alignItems="center"
        spacing={2}
        sx={{ mt: 3, height: "50vh", overflowY: "auto" }}
      >
        {filteredCustomers.map((customer) => (
          <CustomerBadge
            key={customer.id}
            onClick={handleOpen}
            customer={customer}
          />
        ))}
        <CustomerDetailModal
          open={open}
          onClose={handleClose}
          data={customerDetail}
        />
      </Stack>
    </>
  );
};

export default CustomersList;
