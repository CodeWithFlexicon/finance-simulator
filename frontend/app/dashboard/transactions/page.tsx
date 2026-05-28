"use client";

import TransactionItem from "@/app/components/dashboard/TransactionItem";
import { getTransactions } from "@/lib/api";
import { getToken, removeToken } from "@/lib/auth";
import { PageResponse, TransactionResponse } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TransactionPage() {
  const router = useRouter();
  const [transactionPage, setTransactionPage] =
    useState<PageResponse<TransactionResponse> | null>(null);
  const [page, setPage] = useState(0);
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
          page,
          sort,
          type: type || undefined,
        });

        setTransactionPage(data);
      } catch {
        removeToken();
        router.replace("/login?error=session-expired");
      } finally {
        setLoading(false);
      }
    }

    loadTransactions();
  }, [router, page, sort, type]);

  const transactions = transactionPage?.content ?? [];

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
            onChange={(e) => {
              setSort(e.target.value);
              setPage(0);
            }}
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
            onChange={(e) => {
              setType(e.target.value);
              setPage(0);
            }}
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

      <div className="mt-6 flex items-center justify-between">
        <button
          disabled={transactionPage?.first}
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          className="rounded-full border border-text-main/10 bg-white px-5 py-2.5 text-sm font-medium text-text-main disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        <p className="text-sm text-text-main/60">
          Page {(transactionPage?.number ?? 0) + 1} of{" "}
          {transactionPage?.totalPages ?? 1}
        </p>

        <button
          disabled={transactionPage?.last}
          onClick={() => setPage((prev) => prev + 1)}
          className="rounded-full border border-text-main/10 bg-white px-5 py-2.5 text-sm font-medium text-text-main disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
}
