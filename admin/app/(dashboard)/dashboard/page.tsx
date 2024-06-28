"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getAllUsers,
  getAllOrdersForUser,
  getApprovedCarriers,
  fetchUsersByMonth,
  getOrdersByMonth,
  getUser,
  getCarrier,
  getAllTransactionsForUser,
  getTransactionById,
} from "@/app/api/actions";
import { Cards } from "@/app/mycomponents/card/card";
import Charts from "@/app/mycomponents/charts/charts";
import {
  DollarSignIcon,
  PackageIcon,
  UsersIcon,
} from "@/app/mycomponents/icons";
import { DeleteCancelTable } from "@/app/mycomponents/tables/ordersTable";
import { format, subMonths } from "date-fns";
import DashboardSkeleton from "@/app/mycomponents/skelecton/dashboardskeleton";

export interface cardData {
  cardData: []
 }
export default function Dashboard( cardData:cardData) {
  const router = useRouter();

  const [userData, setUserData] = useState<any[]>([]);
  const [orderData, setOrderData] = useState<any[]>([]);
  const [dashboardCardData, setDashboardCardData] = useState<any[]>([]);
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
        const currentMonth = format(new Date(), "yyyy-MM");
        const previousMonth = format(subMonths(new Date(), 1), "yyyy-MM");
        console.log("fetching all users...");
        const fetchedUserData = await getAllUsers(token);

        console.log("Users fetched:", fetchedUserData);
        const fetchedOrderData = await getAllOrdersForUser(token);
        const fetchedDriverData = await getApprovedCarriers(token);
        const fetchedTransactionData = await getAllTransactionsForUser(token);

        const previousMonthUsers = await fetchUsersByMonth(token, previousMonth);
        const previousMonthOrders = await getOrdersByMonth(token, previousMonth);

        const userCount = fetchedUserData.length;
        const orderCount = fetchedOrderData.length;

        const previousUserCount = previousMonthUsers.length;
        const previousOrderCount = previousMonthOrders.length;

        const userChange = previousUserCount > 0
          ? ((userCount - previousUserCount) / previousUserCount) * 100
          : 0;
        const orderChange = previousOrderCount > 0
          ? ((orderCount - previousOrderCount) / previousOrderCount) * 100
          : 0;

        const totalRevenue = fetchedTransactionData
          .filter(transaction => transaction.status === "completed")
          .reduce((total, transaction) => total + transaction.amount, 0);

        const cardData = [
          {
            title: "Total Orders",
            icon: (
              <PackageIcon className="h-6 w-6 text-[#7F1945] dark:text-[#FFBE58]" />
            ),
            num: orderCount,
            changes: `${orderChange.toFixed(1)}% from last month`,
          },
          {
            title: "Total Revenue",
            icon: (
              <DollarSignIcon className="h-6 w-6 text-[#7F1945] dark:text-[#FFBE58]" />
            ),
            num: `NGN${totalRevenue.toFixed(2)}`,
            changes: `${orderChange.toFixed(1)}% from last month`,
          },
          {
            title: "Active Drivers",
            icon: (
              <UsersIcon className="h-6 w-6 text-[#7F1945] dark:text-[#FFBE58]" />
            ),
            num: fetchedDriverData.length,
            changes: `${userChange.toFixed(1)}% from last month`,
          },
          {
            title: "Customers",
            icon: (
              <UsersIcon className="h-6 w-6 text-[#7F1945] dark:text-[#FFBE58]" />
            ),
            num: userCount,
            changes: `${userChange.toFixed(1)}% from last month`,
          },
        ];

        setDashboardCardData(cardData);

        const tableData = await Promise.all(
          fetchedOrderData.map(async (order: any) => {
            const customer = await getUser(order.user_id, token);
            const driver = await getCarrier(order.carrier_id, token);
            const transaction = await getTransactionById(order.transaction_id, token);
            return {
              order: order.id,
              customer: `${customer.fname} ${customer.lname}`,
              driver: `${driver.fname} ${driver.lname}`,
              status: order.status,
              total: order.amount,
              date: order.createdAt ,
            };
          })
        );

        console.log("Table data:", tableData);
        

        setTableData(tableData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }

    fetchData();
  }, [router]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-white dark:bg-white">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {dashboardCardData.map((card, index) => (
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
