export interface OwnerGym {
  id: string;
  active?: boolean;
  email?: string;
  gymName?: string;
  activeCustomerCount?: number;
  role?: string;
}

export interface CreateOwnerGymData {
  gymName: string;
  email: string;
  password: string;
}
