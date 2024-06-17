"use client";
import { dashbordCardData, tableData } from "@/app/data/data";
import { Cards } from "@/app/mycomponents/card/card";
import Charts from "@/app/mycomponents/charts/charts";
import { DeleteCancelTable } from "@/app/mycomponents/tables/deleteCancelTable";
export default function Dashboard() {
  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-white dark:bg-white">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {dashbordCardData.map((card, index) => (
            <Cards key={index} data={card} />
          ))}
          <Charts />
        </div>
        
        <div>
          <DeleteCancelTable data={tableData} />
        </div>
      </main>
    </>
  );
}
