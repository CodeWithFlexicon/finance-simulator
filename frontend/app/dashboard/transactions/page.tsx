"use client";

import TransactionItem from "@/app/components/dashboard/TransactionItem";
import { getTransactions } from "@/lib/api";
import { getToken, removeToken } from "@/lib/auth";
import { TransactionResponse } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TransactionPage() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const [sort, setSort] = useState("createdAt,desc");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.replace("/login");
      return;
    }

    async function loadTransactions() {
      setLoading(true);

      try {
        const data = await getTransactions({
          sort,
          type: type || undefined,
        });

        setTransactions(data);
      } catch {
        removeToken();
        router.replace("/login?error=session-expired");
      } finally {
        setLoading(false);
      }
    }

    loadTransactions();
  }, [router, sort, type]);

  return (
    <section>
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
        Transactions
      </p>

      <h2 className="mt-3 text-4xl font-semibold tracking-tight text-text-main">
        All transactions
      </h2>

      <div className="mt-6 flex flex-col gap-3 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium uppercase tracking-wide text-text-main/50">
            Sort by
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-2xl border border-text-main/10 bg-background px-4 py-3 text-sm text-text-main outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
          >
            <option value="createdAt,desc">Newest first</option>
            <option value="createdAt,asc">Oldest first</option>
            <option value="amount,desc">Highest amount</option>
            <option value="amount,asc">Lowest amount</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium uppercase tracking-wide text-text-main/50">
            Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="rounded-2xl border border-text-main/10 bg-background px-4 py-3 text-sm text-text-main outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
          >
            <option value="">All types</option>
            <option value="DEPOSIT">Deposits</option>
            <option value="WITHDRAWAL">Withdrawals</option>
            <option value="TRANSFER_IN">Transfers in</option>
            <option value="TRANSFER_OUT">Transfers out</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="mt-8 text-text-main/70">Loading transactions...</p>
      ) : (
        <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <div className="flex flex-col gap-3">
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                  showAccount
                />
              ))
            ) : (
              <p className="py-6 text-center text-sm text-text-main/60">
                No transactions yet.
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
