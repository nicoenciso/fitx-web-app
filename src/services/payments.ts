import {
  collection,
  addDoc,
  updateDoc,
  doc,
  Timestamp,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/connection";
import { PaymentData } from "../interfaces/Payment";

const getPaymentsByGym = async (gymId: string) => {
  const paymentsRef = collection(db, "payments");
  const q = query(paymentsRef, where("gymId", "==", gymId));
  const snapshot = await getDocs(q);
  const payments = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return payments;
};

const getPaymentsByCustomer = async (customerId: string) => {
  const paymentsRef = collection(db, "payments");
  const q = query(paymentsRef, where("customerId", "==", customerId));
  const snapshot = await getDocs(q);
  const payments = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return payments;
};

const addPaymentToCustomer = async ({
  customerId,
  amount,
  date,
}: PaymentData) => {
  const now = date || new Date();
  const period = `${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )}-${now.getFullYear()}`;
  const timestamp = Timestamp.fromDate(now);

  const paymentsRef = doc(db, "customers", customerId);
  const customerSnap = await getDoc(paymentsRef);

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
  await updateDoc(paymentsRef, {
    paymentDate: timestamp,
    expirationDate: Timestamp.fromDate(expiration),
  });
};

export { getPaymentsByGym, getPaymentsByCustomer, addPaymentToCustomer };
