import CustomersTable from "@/app/mycomponents/tables/customersTables";
import React from "react";

type Props = {};

const Customers = (props: Props) => {
  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-white dark:bg-white">
        <CustomersTable />
      </main>
    </>
  );
};

export default Customers;
