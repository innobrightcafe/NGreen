'use client'
import { LoginForm } from "@/app/mycomponents/loginForm";
import { ArrowBigRight } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";
'use client'
export default function HomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(""); // Reset error state

    try {
      const response = await fetch("/auth/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Store the token in localStorage or cookies
        localStorage.setItem("token", data.token);
        // Redirect to the admin dashboard
        router.push("/admin/dashboard");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to login");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
      <div className="hidden bg-[#7F1945] dark:bg-[#7F1945] lg:block">
        <div className="flex h-full max-h-screen flex-col justify-center gap-8 px-12">
          <div className="space-y-2">
            <h1 className="text-4xl text-center font-bold tracking-tighter text-white dark:text-white">
              Welcome To Nicolas Green Logistics Admin Dashboard
            </h1>
            <p className="text-lg text-center text-white dark:text-white">
              If you can login successfully to the app, then you are a master
              admin.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-[2px] flex-1 bg-white dark:bg-white" />
            <p className="text-sm font-medium text-white dark:text-white">
              Don't have access?
            </p>
            <div className="h-[2px] flex-1 bg-white dark:bg-white" />
          </div>
          <div className="inline-flex items-center justify-center bg-[#FFBE58] py-10  text-sm font-medium text-gray-900 shadow-sm transition-colors   focus-visible:ring-gray-950   disabled:opacity-50 dark:bg-white dark:text-gray-900 dark:focus-visible:ring-gray-300">
            Ask master admin for access details <ArrowBigRight />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-8 lg:p-12 bg-[#FFBE58]">
        <LoginForm
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          error={error}
        />
      </div>
    </div>
  );
}
