import { getToken, removeToken } from "./auth";
import { LoginResponse, AccountResponse, TransactionResponse } from "./types";

const BASE_URL = "http://localhost:8080/api";

export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Invalid email or password");
  }

  return res.json();
}

export async function register(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
): Promise<LoginResponse> {
  const res = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstName, lastName, email, password }),
  });

  if (!res.ok) {
    let message = "Unable to create account";

    try {
      const errorData = await res.json();
      message = errorData.message ?? message;
    } catch {}

    throw new Error(message);
  }

  return res.json();
}

export async function getAccounts(): Promise<AccountResponse[]> {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/accounts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch accounts: ${res.status} ${text}`);
  }

  return res.json();
}

export async function getTransactionsForAccount(
  accountId: number,
): Promise<TransactionResponse[]> {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/accounts/${accountId}/transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    removeToken();
    window.location.href = "/login?error=session-expired";
  }

  if (!res.ok) {
    throw new Error("Failed to fetch transactions");
  }

  return res.json();
}

export async function getRecentTransactions(): Promise<TransactionResponse[]> {
  const token = getToken();

  const res = await fetch(
    `${BASE_URL}/transactions?size=5&sort=createdAt,desc`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (res.status === 401) {
    removeToken();
    window.location.href = "/login?error=session-expired";
  }

  if (!res.ok) {
    throw new Error("Failed to fetch recent transactions");
  }

  const page = await res.json();

  return page.content;
}
