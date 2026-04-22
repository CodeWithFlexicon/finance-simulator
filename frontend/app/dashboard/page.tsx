"use client";

import { getAccounts } from "@/lib/api";
import { getToken, removeToken } from "@/lib/auth";
import { AccountResponse } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [accounts, setAccounts] = useState<AccountResponse[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.replace("/login");
      return;
    }

    async function loadAccounts() {
      try {
        const data = await getAccounts();
        setAccounts(data);
      } catch {
        removeToken();
        setError("Your session has expired. Please log in again.");
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    }

    loadAccounts();
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background px-6 py-12">
        <div className="mx-auto max-w-7xl">Loading dashboard...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-3xl font-semibold text-text-main">Accounts</h1>

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        <div className="flex flex-col gap-4">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5"
            >
              <h2 className="text-xl font-semibold text-text-main">
                {account.name}
              </h2>
              <p className="mt-2 text-text-main/70">{account.accountType}</p>
              <p className="mt-4 text-2xl font-semibold text-primary">
                ${account.balance}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
