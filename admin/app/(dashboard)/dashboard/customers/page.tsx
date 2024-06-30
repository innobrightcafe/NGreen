 'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Cards } from "@/app/mycomponents/card/card"; 
import {
  getAllOrdersForUser,
  getAllTransactionsForUser,
  getUser,
  getCarrier,
  getTransactionById,
} from "@/app/api/actions";
import {
  ShoppingCartIcon,
  CircleCheckIcon,
  ClockIcon,
  CircleXIcon,
} from "@/app/mycomponents/icons";
import OrdersSkeleton from "@/app/mycomponents/skelecton/orderskelecton"; 
import { CustomersTable } from "@/app/mycomponents/tables/customersTables";

const Customers = () => {
  const router = useRouter();
  
  const [orderData, setOrderData] = useState<any[]>([]);
  const [cardData, setCardData] = useState<any[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token") ?? ""; // Provide a fallback value

    if (!token) {
      console.log("no login access, please login");
      router.push("/login");
      return;
    }

    async function fetchData() {
      try {
        const fetchedOrderData = await getAllOrdersForUser(token);
        const fetchedTransactionData = await getAllTransactionsForUser(token);

        const totalOrders = fetchedOrderData.length;
        const completedOrders = fetchedOrderData.filter(order => order.status === "delivered").length;
        const pendingOrders = fetchedOrderData.filter(order => order.status === "pending").length;
        const cancelledOrders = fetchedOrderData.filter(order => order.status === "cancelled").length;

        const totalRevenue = fetchedTransactionData
          .filter(transaction => transaction.status === "completed")
          .reduce((total, transaction) => total + transaction.amount, 0);

        const cardData = [
          {
            title: "Total Orders",
            icon: <ShoppingCartIcon className="h-6 w-6 text-[#7F1945] dark:text-[#FFBE58]" />,
            num: totalOrders,
            changes: "",
          },
          {
            title: "Completed Orders",
            icon: <CircleCheckIcon className="h-6 w-6 text-[#7F1945] dark:text-[#FFBE58]" />,
            num: completedOrders,
            changes: "",
          },
          {
            title: "Pending Orders",
            icon: <ClockIcon className="h-6 w-6 text-[#7F1945] dark:text-[#FFBE58]" />,
            num: pendingOrders,
            changes: "",
          },
          {
            title: "Cancelled Orders",
            icon: <CircleXIcon className="h-6 w-6 text-[#7F1945] dark:text-[#FFBE58]" />,
            num: cancelledOrders,
            changes: "",
          },
        ];

        setCardData(cardData);

        const tableData = await Promise.all(
          fetchedOrderData.map(async (order: any) => {
            const customer = await getUser(order.user_id, token);
            const driver = await getCarrier(order.carrier_id, token);
            const transaction = await getTransactionById(order.transaction_id, token);
            
            return {
              id: customer._id,
              name: `${customer.fname} ${customer.lname}`,
              email: customer.email,
              phone: customer.pnumber,
              orders: fetchedOrderData.length,  // Number of orders by the customer
              totalspent: transaction.amount,
            };
          })
        );

        setTableData(tableData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }

    fetchData();
  }, [router]);

  if (loading) {
    return <OrdersSkeleton />;
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-white dark:bg-white">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cardData.map((card, index) => (
          <Cards key={index} data={card} />
        ))}
      </div>
      <CustomersTable users={tableData} />
    </main>
  );
};

export default Customers;
