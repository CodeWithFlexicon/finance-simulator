"use client";

import { useEffect, useState } from "react";
import AuthCard from "../components/auth/AuthCard";
import AuthField from "../components/auth/AuthField";
import Link from "next/link";
import Navbar from "../components/landing/Navbar";
import { useRouter } from "next/navigation";
import { register } from "@/lib/api";
import { getToken, saveToken } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const data = await register(firstName, lastName, email, password);
      saveToken(data.token);
      router.push("/dashboard");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    }
  }

  useEffect(() => {
    const token = getToken();

    if (token) {
      router.replace("/dashboard");
    }
  }, [router]);

  return (
    <>
      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}
      <Navbar />
      <main className="min-h-screen bg-background px-6 py-12">
        <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl items-center justify-center">
          <AuthCard
            title="Create your account"
            subtitle="Start building healthier financial habits with a cleaner view of your money"
          >
            <form onSubmit={handleRegister} className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <AuthField
                  id="firstName"
                  label="First Name"
                  type="text"
                  placeholder="Bob"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />

                <AuthField
                  id="lastName"
                  label="Last Name"
                  type="text"
                  placeholder="Smith"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              <AuthField
                id="register-email"
                label="Email"
                type="email"
                placeholder="flexfinance@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <AuthField
                id="register-password"
                label="Password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="submit"
                className="mt-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                Create Account
              </button>
            </form>

            <p className="mt-6 text-sm text-text-main/65">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary transition hover:opacity-80"
              >
                Log In
              </Link>
            </p>
          </AuthCard>
        </div>
      </main>
    </>
  );
}
