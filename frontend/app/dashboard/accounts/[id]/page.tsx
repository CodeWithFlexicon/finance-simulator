"use client";

import { getAccounts } from "@/lib/api";
import { getToken, removeToken } from "@/lib/auth";
import { formatCurrency } from "@/lib/format";
import { AccountResponse } from "@/lib/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AccountDetailPage() {
  const router = useRouter();
  const params = useParams();

  const [account, setAccount] = useState<AccountResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const transactions = [
    { name: "Starbucks", amount: -6.75, date: "Jan 20" },
    { name: "Salary", amount: 2400, date: "Jan 15" },
    { name: "Amazon", amount: -54.23, date: "Jan 14" },
  ];

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.replace("/login");
      return;
    }

    async function loadAccount() {
      try {
        const data = await getAccounts();

        const found = data.find(
          (account) => account.id.toString() === params.id,
        );

        if (!found) {
          router.replace("/dashboard/accounts");
          return;
        }

        setAccount(found);
      } catch {
        removeToken();
        router.replace("/login?error=session-expired");
      } finally {
        setLoading(false);
      }
    }

    loadAccount();
  }, [router, params.id]);

  if (loading) {
    return <p className="text-text-main/70">Loading account...</p>;
  }

  if (!account) {
    return null;
  }

  return (
    <section>
      <button
        onClick={() => router.push("/dashboard/accounts")}
        className="mb-6 flex items-center gap-2 text-sm font-medium text-primary hover:opacity-80"
      >
        ← Back to Accounts
      </button>
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
        Account
      </p>

      <h2 className="mt-3 text-4xl font-semibold tracking-tight text-text-main">
        {account.name}
      </h2>

      <p className="mt-2 text-text-main/70">{account.accountType}</p>

      <p className="mt-6 text-4xl font-semibold text-primary">
        {formatCurrency(account.balance)}
      </p>

      <div className="mt-12 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <p className="text-lg font-semibold text-text-main">Transactions</p>

        <div className="mt-6 flex flex-col gap-4">
          {transactions.length > 0 ? (
            transactions.map((txn, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-text-main/5 pb-4 last:border-none last:pb-0"
              >
                <div>
                  <p className="text-sm font-medium text-text-main">
                    {txn.name}
                  </p>
                  <p className="text-xs text-text-main/60">{txn.date}</p>
                </div>

                <p
                  className={`{text-sm font-semibold ${txn.amount < 0 ? "text-red-600" : "text-green-500"}`}
                >
                  {txn.amount < 0 ? "-" : "+"}
                  {formatCurrency(Math.abs(txn.amount))}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-text-main/60">No transactions yet.ß</p>
          )}
        </div>
      </div>
    </section>
  );
}
