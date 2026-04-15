import { FaUserPlus, FaChartLine } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create your profile",
      description:
        "Sign up and get access to a clean workspace designed to help you understand and organize your finances.",
      icon: FaUserPlus,
    },
    {
      number: "02",
      title: "Track accounts and activity",
      description:
        "Monitor balances, review transactions, and stay aware of where your money is moving every month.",
      icon: FaArrowTrendUp,
    },
    {
      number: "03",
      title: "Plan with budgets and reports",
      description:
        "Set budget goals, compare spending patterns, and use reports to make better financial decisions over time.",
      icon: FaChartLine,
    },
  ];

  return (
    <section id="how-it-works" className="w-full bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary">
            How it works
          </p>

          <h2 className="text-4xl font-semibold tracking-tight text-text-main sm:text-5xl">
            A simple flow for better financial habits
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-text-main/70 sm:text-lg">
            FlexFinance is designed to help you move from confusiion to clarity
            with a workflow that is simple, visual, and easy to maintain.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="rounded-4xl bg-background p-8 ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>

                  <span className="text-sm font-semibold tracking-wide text-text-main/35">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-semibold tracking-tight text-text-main">
                  {step.title}
                </h3>

                <p className="mt-4 text-base leading-7 text-text-main/70">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
