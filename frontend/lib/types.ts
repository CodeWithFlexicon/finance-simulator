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

export type TransactionResponse = {
  id: number;
  accountId: number;
  accountName: string;
  type: "DEPOSIT" | "WITHDRAWAL" | "TRANSFER_IN" | "TRANSFER_OUT";
  amount: number;
  balanceAfter: number;
  createdAt: string;
  categoryId: number | null;
  categoryName: string | null;
  memo: string | null;
};
