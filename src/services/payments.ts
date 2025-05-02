import {
  collection,
  addDoc,
  updateDoc,
  doc,
  Timestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase/connection";
import { PaymentData } from "../interfaces/Payment";

export const addPaymentToCustomer = async ({
  customerId,
  amount,
  date,
}: PaymentData) => {
  const now = date || new Date();
  const period = `${String(now.getMonth() + 1).padStart(2, "0")}-${now.getFullYear()}`;
  const timestamp = Timestamp.fromDate(now);

  const customerRef = doc(db, "customers", customerId);
  const customerSnap = await getDoc(customerRef);

  if (!customerSnap.exists()) {
    throw new Error("El cliente no existe");
  }

  const customerData = customerSnap.data();
  const { durationDays, gymId } = customerData;

  const expiration = new Date(now);
  expiration.setDate(expiration.getDate() + durationDays);

  await addDoc(collection(db, "payments"), {
    customerId,
    gymId,
    amount,
    period,
    timestamp,
  });

  // Update the customer fields
  await updateDoc(customerRef, {
    paymentDate: timestamp,
    expirationDate: Timestamp.fromDate(expiration),
  });
};
