export type LoginResponse = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
};

export type RegisterResponse = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
};

export type AccountResponse = {
  id: number;
  name: string;
  accountType: string;
  balance: number;
  interestRate: number;
  createdAt: string;
};
