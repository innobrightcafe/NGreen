'use client'
import { activityData, orderData } from "@/app/data/data";
import Delivery from "@/app/mycomponents/deliveries/deliveryActivities";

type Props = {}; 

const DeliveryPage = (props: Props) => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-white dark:bg-white">
      <Delivery data={orderData} activityData={activityData} />
    </main>
  );
};

export default DeliveryPage;