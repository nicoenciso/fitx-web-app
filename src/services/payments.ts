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
import dayjs from "dayjs";
import { monthNames } from "../utils/MonthNames";

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

  // Convert the month number to month name
  const period = `${monthNames[now.getMonth()]}-${now.getFullYear()}`;
  const timestamp = Timestamp.fromDate(now);

  const paymentsRef = doc(db, "customers", customerId);
  const customerSnap = await getDoc(paymentsRef);

  if (!customerSnap.exists()) {
    throw new Error("El cliente no existe");
  }

  const customerData = customerSnap.data();
  const { durationDays, gymId } = customerData;

  // Calc expiration date with dayjs
  const expiration = dayjs(now).add(durationDays, "day").toDate();

  await addDoc(collection(db, "payments"), {
    customerId,
    gymId,
    amount,
    period,
    timestamp,
  });

  // Update customer data
  await updateDoc(paymentsRef, {
    paymentDate: timestamp,
    expirationDate: Timestamp.fromDate(expiration),
  });
};

export { getPaymentsByGym, getPaymentsByCustomer, addPaymentToCustomer };
