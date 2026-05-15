import { formatCurrency } from "@/lib/format";
import { FaMoneyBillWave, FaShoppingCart } from "react-icons/fa";

type Transaction = {
  name: string;
  amount: number;
  date: string;
};

type TransactionItemProps = {
  transaction: Transaction;
};

export default function TransactionItem({ transaction }: TransactionItemProps) {
  const isExpense = transaction.amount < 0;

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
            {transaction.name}
          </p>

          <p className="text-xs text-text-main/60">{transaction.date}</p>
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
