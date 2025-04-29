import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/connection";

const getCustomers = async (gymId: string) => {
  const clientRef = collection(db, "customers");
  const q = query(clientRef, where("gymId", "==", gymId));
  const snapshot = await getDocs(q);
  const customers = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return customers;
};

export { getCustomers };
