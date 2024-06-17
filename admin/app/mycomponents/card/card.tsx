"use client";
import React from "react";
import "@/app/globals.css";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type CardProps = {
  title: string;
  icon: React.ReactNode;
  num: number | string;
  changes: string;
};

export function Cards({ data }: { data: CardProps }) {
  const { title, icon, num, changes } = data;
  return (
    <Card className="bg-[#FFBE58]/20 hover:bg-[#FFBE58]/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-black">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-black">
          {num.toLocaleString()}
        </div>
        <p className="text-sm text-[#7F1945] dark:text-[#FFBE58]">{changes}</p>
      </CardContent>
    </Card>
  );
}
