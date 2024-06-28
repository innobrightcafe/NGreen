"use client";
import { useEffect, useState } from "react";
import {
  getAllCarriers,
  getAllOrders,
  getAllUsers,
  getOrdersByMonth,
  getAllRatings,
  Order,
  User,
  Carrier,
  Rate
} from "@/app/api/actions";
import DriverPayoutsCard from "@/app/mycomponents/card/driverPayoutsCard";
import EarningsReportCard from "@/app/mycomponents/card/earningsReportCard";
import ReferralPayoutsCard from "@/app/mycomponents/card/referralPayoutsCard";
import Charts from "@/app/mycomponents/charts/charts";
import CustomerSatisfactionCard from "@/app/mycomponents/card/customerSatisfactionCard";
import ReportsSkeleton from "@/app/mycomponents/skelecton/reportskeleton";

interface EarningsData {
  month: string;
  totalRevenue: number;
  payouts: number;
  netProfit: number;
}

interface PayoutsData {
  driver: string;
  totalDeliveries: number;
  earnings: number;
  bonus: number;
  totalPayout: number;
}

interface ReferralData {
  agent: string;
  totalReferrals: number;
  earnings: number;
  bonus: number;
  totalPayout: number;
}

const Reports = () => {
  const [earningsReportData, setEarningsReportData] = useState<EarningsData[]>([]);
  const [driverPayoutsData, setDriverPayoutsData] = useState<PayoutsData[]>([]);
  const [customerSatisfactionData, setCustomerSatisfactionData] = useState<any[]>([]);
  const [referralPayoutsData, setReferralPayoutsData] = useState<ReferralData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token") ?? ""; // Provide a fallback value

        // Fetch orders, users, carriers, and ratings
        const [orders, users, carriers, ratings] = await Promise.all([
          getAllOrders(token),
          getAllUsers(token),
          getAllCarriers(token),
          getAllRatings(token),
        ]);

        // Process earnings report data
        const earningsData = await Promise.all(
          ["2023-03", "2023-04", "2023-05", "2023-06"].map(async (month) => {
            const monthlyOrders: Order[] = await getOrdersByMonth(token, month);
            const totalRevenue = monthlyOrders.reduce((sum: number, order: Order) => sum + order.amount, 0);
            
            // Calculate total driver payouts for the month
            const monthlyCarrierIds = monthlyOrders.map(order => order.carrier_id).filter(_id => _id !== undefined) as string[];
            const monthlyCarriers = carriers.filter(carrier => monthlyCarrierIds.includes(carrier._id));
            const driverPayouts = monthlyCarriers.reduce((sum: number, carrier: Carrier) => {
              const carrierOrders = monthlyOrders.filter(order => order.carrier_id === carrier._id);
              const earnings = carrierOrders.reduce((sum: number, order: Order) => sum + order.amount, 0);
              const bonus = earnings * 0.05; // Assuming a 5% bonus
              return sum + (earnings + bonus);
            }, 0);

            // Calculate total referral payouts for the month
            const referralPayouts = users.reduce((sum: number, user: User) => {
              const totalReferrals = user.refer;
              const earnings = totalReferrals * 100; // Assuming $100 per referral
              const bonus = earnings * 0.1; // Assuming a 10% bonus
              return sum + (earnings + bonus);
            }, 0);

            const payouts = driverPayouts + referralPayouts;
            const netProfit = totalRevenue - payouts;

            return {
              month,
              totalRevenue,
              payouts,
              netProfit,
            };
          })
        );
        setEarningsReportData(earningsData);

        // Process driver payouts data
        const payoutsData = carriers.map((carrier: Carrier) => {
          const carrierOrders = orders.filter(order => order.carrier_id === carrier._id);
          const totalDeliveries = carrierOrders.length;
          const earnings = carrierOrders.reduce((sum: number, order: Order) => sum + order.amount, 0);
          const bonus = earnings * 0.05; // Assuming a 5% bonus
          return {
            driver: `${carrier.fname} ${carrier.lname}`,
            totalDeliveries,
            earnings,
            bonus,
            totalPayout: earnings + bonus,
          };
        });
        setDriverPayoutsData(payoutsData);

        // Process customer satisfaction data
        const satisfactionData = ratings.map((rating: Rate) => {
          const user = users.find(user => user.id === rating.user_id); // Updated line
          const order = orders.find(order => order._id === rating.order_id);
          const carrierName = carriers.find(carrier => carrier._id === order?.carrier_id)?.fname || "Unknown Carrier";
          return {
            customer: `${user?.fname} ${user?.lname}`,
            rating: rating.rating.toString(), // Convert rating to string
            carrier: carrierName,
          };
        });
        setCustomerSatisfactionData(satisfactionData);

        // Process referral payouts data
        const referralData = users.map((user: User) => {
          const totalReferrals = user.refer;
          const earnings = totalReferrals * 100; // Assuming $100 per referral
          const bonus = earnings * 0.1; // Assuming a 10% bonus
          return {
            agent: `${user.fname} ${user.lname}`,
            totalReferrals,
            earnings,
            bonus,
            totalPayout: earnings + bonus,
          };
        });
        setReferralPayoutsData(referralData);

      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <ReportsSkeleton />;
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-white dark:bg-white">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Charts />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <EarningsReportCard data={earningsReportData} />
        <DriverPayoutsCard data={driverPayoutsData} />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <CustomerSatisfactionCard data={customerSatisfactionData} />
        <ReferralPayoutsCard data={referralPayoutsData} />
      </div>
    </main>
  );
};

export default Reports;
