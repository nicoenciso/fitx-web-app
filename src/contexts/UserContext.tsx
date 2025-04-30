import { createContext, ReactNode, useEffect, useState } from "react";
import Gym from "../interfaces/Gym";
import User from "../interfaces/User";
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";
import { db } from "../firebase/connection";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

interface UserContextType {
  user: User | null;
  gym: Gym | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [gym, setGym] = useState<Gym | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence);
    setLoading(true); // Asegúrate de que el estado de carga sea verdadero al inicio

    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      try {
        console.log(currentUser)
        if (currentUser) {
          const { uid, displayName } = currentUser;

          const userDocRef = doc(db, "users", uid);
          const userSnap = await getDoc(userDocRef);

          if (userSnap.exists()) {
            const userData = userSnap.data() as User;
            setUser({ ...userData, displayName });

            const gymSRef = collection(db, "gyms");
            const q = query(gymSRef, where("ownerId", "==", uid));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
              const gymDoc = querySnapshot.docs[0];
              const gymData = gymDoc.data() as Gym;
              setGym({ ...gymData, id: gymDoc.id });
            } else {
              setGym(null);
            }
          } else {
            setUser(null);
            setGym(null);
          }
        } else {
          setUser(null);
          setGym(null);
        }
      } catch (error) {
        console.error("Error al cargar los datos del usuario:", error);
        setUser(null);
        setGym(null);
      } finally {
        setLoading(false); // Asegúrate de que el estado de carga se actualice al final
      }
    });

    return () => unsub();
  }, []);

  return (
    <UserContext.Provider value={{ user, gym, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
