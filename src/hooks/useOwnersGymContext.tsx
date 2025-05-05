import { useContext } from "react";
import OwnersGymContext from "../contexts/OwnersGymContext";

export const useOwnersGymContext = () => {
  const context = useContext(OwnersGymContext);
  if (!context) {
    throw new Error(
      "useOwnersGymContext must be used within a OwnersGymProvider"
    );
  }
  return context;
};
