import { Timestamp } from "firebase/firestore";

interface Customer {
  id: string;
  active?: boolean;
  cost?: number;
  durationDays?: number;
  email?: string;
  expirationDate?: Timestamp;
  gymId?: string;
  lastNames?: string;
  names?: string;
  paymentDate?: Timestamp;
}

export default Customer;
