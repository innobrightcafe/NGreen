'use client';
import React from "react";
import { cardData } from "@/app/data/data";
import { actionTableData } from "@/app/data/data";
import { Cards } from "@/app/mycomponents/card/card";
import { ActionTable } from "@/app/mycomponents/tables/actionTable";

const Orders = () => {
  
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-white dark:bg-white">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cardData.map((card, index) => (
          <Cards key={index} data={card} />
        ))}
      </div>
      <ActionTable data={actionTableData} />
    </main>
  );
};

export default Orders;
