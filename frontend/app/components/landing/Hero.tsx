"use client";

import Link from "next/link";
import HeroPreview from "./HeroPreview";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="w-full">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-12 lg:grid-cols-2 lg:items-center lg:px-10 lg:py-20">
        <div className="max-w-2xl">
          <motion.p
            className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            Smarter personal finance
          </motion.p>

          <motion.h1
            className="max-w-xl text-5xl leading-tight font-semibold tracking-tight text-text-main sm:text-6xl"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
          >
            Change the way you use your money
          </motion.h1>

          <motion.p
            className="mt-6 max-w-lg text-base leading-7 text-text-main/70 sm:text-lg"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: "easeOut" }}
          >
            Track accounts, monitor transactions, set budgets, and understand
            your financial habits through one clean, modern dashboard.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease: "easeOut" }}
          >
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/register"
                className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                Get Started
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/login"
                className="rounded-full border border-text-main/10 bg-white px-6 py-3 text-sm font-medium text-text-main transition hover:border-primary hover:text-primary"
              >
                Log In
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        <HeroPreview />
      </div>
    </section>
  );
}
