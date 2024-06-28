'use client';
import React from "react";
import { driverCardData } from "@/app/data/data";
import { driverTableData } from "@/app/data/data";
import { Cards } from "@/app/mycomponents/card/card"; 
import DriversTable from "@/app/mycomponents/tables/driversTable";


type Props = {}

const Carriers = (props: Props) => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-white dark:bg-white">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {driverCardData.map((card, index) => (
          <Cards key={index} data={card} />
        ))}
      </div>
      <DriversTable data={driverTableData} />
    </main>
  );
};
export default Carriers