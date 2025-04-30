import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/connection";
import { toast } from "react-toastify";
import { CreateCustomerData, Customer } from "../interfaces/Customer";
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
    createUserWithoutAffectingSession(data.email, data.password);
    await addDoc(collection(db, "customers"), {
      active: false,
      ...data,
      expirationDate: null,
      paymentDate: null,
    });
    toast.success("Usuario creado con éxito");
  } catch (error) {
    console.error(error);
    toast.error("Error al crear el usuario");
  }
};

const editCustomer = async (data: Customer) => {
  try {
    const customerRef = doc(db, "customers", data.id);
    await updateDoc(customerRef, { ...data });
    toast.success("Usuario editado con éxito");
  } catch (error) {
    console.error(error);
    toast.error("Error al editar el usuario");
  }
};

export { getCustomers, createCustomer, editCustomer };
