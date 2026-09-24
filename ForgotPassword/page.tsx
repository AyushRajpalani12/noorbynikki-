"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your registered email");
      return;
    }

    router.push("/forgot-password/otp");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

        {/* Heading */}
        <h1 className="mb-3 text-center text-3xl font-bold text-gray-800">
          Forgot Password?
        </h1>

        {/* Description */}
        <p className="mb-7 text-center text-sm leading-6 text-gray-500">
          Enter your registered email address and we will send you an OTP
          to reset your password.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Email */}
          <div className="flex flex-col gap-2">

            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-700"
            >
              Registered Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>

          {/* Continue Button */}
          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Continue
          </button>

        </form>

        {/* Back to Login */}
        <Link
          href="/login"
          className="mt-6 block text-center text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
        >
          ← Back to Login
        </Link>

      </div>

    </main>
  );
}