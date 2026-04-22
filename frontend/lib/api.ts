import { getToken } from "./auth";
import { LoginResponse, AccountResponse, RegisterResponse } from "./types";

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
): Promise<RegisterResponse> {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
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
