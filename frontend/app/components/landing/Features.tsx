import { FaWallet, FaExchangeAlt, FaChartPie } from "react-icons/fa";
import Reveal from "../animations/Reveal";

export default function Features() {
  const features = [
    {
      title: "Track Accounts",
      description:
        "See checking, savings, and investment balances in one place with a clear overview of your finances.",
      icon: FaWallet,
    },
    {
      title: "Monitor Transactions",
      description:
        "Review deposits, withdrawals, and transfers with organized history and better visibility into your spending habits.",
      icon: FaExchangeAlt,
    },
    {
      title: "Plan with Budgets",
      description:
        "Set monthly budgets by category and compare your spending against your goals through the month.",
      icon: FaChartPie,
    },
  ];

  return (
    <section id="features" className="w-full py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Features
            </p>

            <h2 className="text-4xl font-semibold tracking-tight text-text-main sm:text-5xl">
              Everything you need to understand your money
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-text-main/70 sm:text-lg">
              Build healthier financial habits with tools designed to simplify
              tracking, planning, and day-to-day visiblity.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <Reveal key={feature.title} delay={index * 0.25}>
                <div className="rounded-4xl bg-white p-8 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight text-text-main">
                    {feature.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-text-main/70">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
