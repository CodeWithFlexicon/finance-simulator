import { formatCurrency } from "@/lib/format";
import { TransactionResponse } from "@/lib/types";
import { FaMoneyBillWave, FaShoppingCart } from "react-icons/fa";

type TransactionItemProps = {
  transaction: TransactionResponse;
};

function getTransactionLabel(transaction: TransactionResponse) {
  if (transaction.memo) return transaction.memo;
  if (transaction.categoryName) return transaction.categoryName;

  switch (transaction.type) {
    case "DEPOSIT":
      return "Deposit";

    case "WITHDRAWAL":
      return "Withdrawal";

    case "TRANSFER_IN":
      return "Transfer In";

    case "TRANSFER_OUT":
      return "Transfer Out";

    default:
      return "Transaction";
  }
}

function formatTransactionDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();

  if (isToday) {
    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
  const isExpense =
    transaction.type === "WITHDRAWAL" || transaction.type === "TRANSFER_OUT";

  return (
    <div className="flex items-center justify-between rounded-2xl px-3 py-3 transition hover:bg-background">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            isExpense
              ? "bg-red-100 text-red-500"
              : "bg-green-100 text-green-500"
          }`}
        >
          {isExpense ? <FaShoppingCart /> : <FaMoneyBillWave />}
        </div>

        <div>
          <p className="text-sm font-medium text-text-main">
            {getTransactionLabel(transaction)}
          </p>

          <p className="text-xs text-text-main/60">
            {formatTransactionDate(transaction.createdAt)}
          </p>
        </div>
      </div>

      <p
        className={`text-sm font-semibold ${isExpense ? "text-red-500" : "text-green-500"}`}
      >
        {isExpense ? "-" : "+"}
        {formatCurrency(Math.abs(transaction.amount))}
      </p>
    </div>
  );
}
