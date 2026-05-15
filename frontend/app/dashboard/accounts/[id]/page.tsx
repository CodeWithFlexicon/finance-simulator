"use client";

import TransactionItem from "@/app/components/dashboard/TransactionItem";
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

  const transactionGroups = [
    {
      label: "Today",
      transactions: [
        { name: "Netflix", amount: -24.99, date: "2:14 PM" },
        { name: "Coffee Shop", amount: -8.25, date: "9:10 AM" },
      ],
    },
    {
      label: "Earlier This Week",
      transactions: [
        { name: "Salary", amount: 2400, date: "Jan 15" },
        { name: "Amazon", amount: -54.23, date: "Jan 14" },
      ],
    },
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
      <div className="rounded-4xl bg-white p-8 shadow-sm ring-1 ring-black/5">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
          Account
        </p>

        <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight text-text-main">
              {account.name}
            </h2>

            <p className="mt-2 text-text-main/70">{account.accountType}</p>
          </div>

          <div className="sm:text-right">
            <p className="text-sm text-text-main/60">Current Balance</p>
            <p className="mt-2 text-4xl font-semibold text-primary">
              {formatCurrency(account.balance)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <p className="text-lg font-semibold text-text-main">Transactions</p>

        <div className="mt-6 flex flex-col gap-8">
          {transactionGroups.map((group) => (
            <div key={group.label}>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-text-main/50">
                {group.label}
              </h3>

              <div className="flex flex-col gap-3">
                {group.transactions.map((txn, index) => (
                  <TransactionItem key={index} transaction={txn} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
