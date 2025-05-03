import { Timestamp } from "firebase/firestore";

export interface Payment {
  id: string;
  customerId?: string;
  gymId?: string;
  amount?: number;
  period?: string;
  timestamp?: Timestamp;
}

export interface PaymentData {
  customerId: string;
  amount: number;
  date?: Date;
}
