import { Timestamp } from "firebase/firestore";

export interface Customer {
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

export interface CreateCustomerData {
  names: string;
  lastNames: string;
  cost: number;
  durationDays: number;
  email: string;
  password: string;
  gymId: string;
}
