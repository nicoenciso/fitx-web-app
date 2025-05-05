import { createContext, useState, ReactNode, useEffect } from "react";
import { useUserContext } from "../hooks/useUserContext";
import { OwnerGym } from "../interfaces/OwnerGym";
import { getOwners } from "../services/owners";

interface OwnersGymContextType {
  owners: OwnerGym[];
  fetchOwners: () => void;
}

const OwnersGymContext = createContext<OwnersGymContextType | undefined>(
  undefined
);

export const OwnersGymProvider = ({ children }: { children: ReactNode }) => {
  const [owners, setOwners] = useState<OwnerGym[] | []>([]);
  const { user } = useUserContext();

  const fetchOwners = () => {
    getOwners().then((res) => setOwners(res));
  };

  useEffect(() => {
    if (user?.role == "superadmin") {
      fetchOwners();
    }
  }, [user]);

  return (
    <OwnersGymContext.Provider
      value={{
        owners,
        fetchOwners,
      }}
    >
      {children}
    </OwnersGymContext.Provider>
  );
};

export default OwnersGymContext;
