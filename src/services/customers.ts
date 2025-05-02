import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/connection";
import { toast } from "react-toastify";
import { CreateCustomerData } from "../interfaces/Customer";
import { createUserWithoutAffectingSession } from "./authentication";

const getCustomers = async (gymId: string) => {
  const customerRef = collection(db, "customers");
  const q = query(customerRef, where("gymId", "==", gymId));
  const snapshot = await getDocs(q);
  const customers = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return customers;
};

const createCustomer = async (data: CreateCustomerData) => {
  try {
    const uid = await createUserWithoutAffectingSession(
      data.email,
      data.password
    );
    await setDoc(doc(db, "customers", uid), {
      active: false,
      names: data.names,
      lastNames: data.lastNames,
      cost: data.cost,
      durationDays: data.durationDays,
      email: data.email,
      gymId: data.gymId,
      expirationDate: null,
      paymentDate: null,
    });
    toast.success("Usuario creado con éxito");
  } catch (error) {
    console.error(error);
    toast.error("Error al crear el usuario");
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const editCustomer = async (id: string, data: any) => {
  try {
    const customerRef = doc(db, "customers", id);
    await updateDoc(customerRef, data);
    toast.success("Usuario editado con éxito");
  } catch (error) {
    console.error(error);
    toast.error("Error al editar el usuario");
  }
};

const deleteCustomer = async (customerId: string) => {
  try {
    const customerRef = doc(db, "customers", customerId);
    await deleteDoc(customerRef);
    toast.success("Cliente eliminado correctamente");
  } catch (error) {
    console.error(error);
    toast.error("Error al eliminar cliente");
    throw error;
  }
};

export { getCustomers, createCustomer, editCustomer, deleteCustomer };
