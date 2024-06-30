'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/app/mycomponents/loginForm";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_URL}/auth/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        router.push("/dashboard");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to login");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
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
