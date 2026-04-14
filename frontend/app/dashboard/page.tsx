"use client";

import { getAccounts } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { AccountResponse } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [accounts, setAccounts] = useState<AccountResponse[]>([]);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    getAccounts().then(setAccounts).catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Accounts</h1>

      <div className="flex flex-col gap-4">
        {accounts.map((account) => (
          <div key={account.id} className="border p-4 rounded">
            <h2>{account.name}</h2>
            <p>Balance: ${account.balance}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
