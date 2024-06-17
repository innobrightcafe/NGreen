import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LoginFormProps {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleSubmit: (event: React.FormEvent) => void;
  error: string;
}

export const LoginForm = ({
  email,
  password,
  setEmail,
  setPassword,
  handleSubmit,
  error,
}: LoginFormProps) => {
  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
          Login in as the Admin
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your email and password to login.
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && <p className="text-red-500">{error}</p>}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-900 dark:text-gray-50">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            required
            className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-gray-900 dark:text-gray-50"
          >
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            required
            className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-white text-gray-900 hover:bg-gray-200 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
        >
          Login
        </Button>
      </form>
    </div>
  );
};
