"use client";

import { motion } from "motion/react";

export default function HeroPreview() {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-xl"
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <motion.div
          className="rounded-4xl bg-primary-dark p-6 text-white shadow-sm"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-sm text-white/70">Total Balance</p>
          <h3 className="mt-4 text-4xl font-semibold tracking-tight">
            $24,580
          </h3>

          <div className="mt-10 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">Checking</span>
              <span>$6,420</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">Savings</span>
              <span>$12,160</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">Investments</span>
              <span>$6,000</span>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col gap-4">
          <motion.div
            className="rounded-4xl bg-white p-6 shadow-sm"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-text-main/60">Monthly Budget</p>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                On track
              </span>
            </div>

            <p className="mt-4 text-3xl font-semibold text-text-main">$1,840</p>
            <p className="mt-1 text-sm text-text-main/60">
              Remaining this month
            </p>

            <div className="mt-5 h-3 w-full rounded-full bg-background">
              <motion.div
                className="h-3 w-2/3 rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: "66%" }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-text-main/60">
              <span>66% used</span>
              <span>$3,560 / $5,400</span>
            </div>
          </motion.div>

          <motion.div
            className="rounded-4xl bg-primary p-6 text-white shadow-sm"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-sm text-white/70">Spending Trend</p>

            <div className="mt-6 flex h-28 items-end gap-2">
              {[10, 14, 20, 24, 16].map((height, index) => (
                <motion.div
                  key={index}
                  className="w-6 rounded-full bg-white/70"
                  initial={{ height: 0 }}
                  animate={{ height: `${height * 4}px` }}
                  transition={{ duration: 0.45, delay: 0.3 + index * 0.05 }}
                />
              ))}
            </div>

            <p className="mt-4 text-sm text-white/80">
              Spending is down 8% from last month
            </p>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute -bottom-6 left-6 rounded-2xl broder border-text-main/5 bg-white px-4 py-3 shadow-md"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <p className="text-xs text-text-main/60">Latest Activity</p>
        <p className="mt-1 text-sm font-medium text-text-main">
          Groceries • $128.40
        </p>
      </motion.div>
    </motion.div>
  );
}
