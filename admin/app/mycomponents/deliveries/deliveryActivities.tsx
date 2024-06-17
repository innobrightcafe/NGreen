import React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoveHorizontalIcon, TruckIcon, UsersIcon  } from "../icons"; 

interface Order {
  order: string;
  customer: string;
  date: string;
  status: string;

}
interface Activity {
  label: string;
  value: number;
  Icon: React.ElementType;
}

interface DeliveryProps {
  data: Order[];
  activityData: Activity[];
}

const Delivery = ({ data, activityData }: DeliveryProps) => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-white dark:bg-white">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-[#FFBE58]/20 hover:bg-[#FFBE58]/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-black">Delivery Activity</CardTitle>
          </CardHeader>
          <div className="grid md:grid-cols-3 gap-4 p-2">
              {activityData.map((activity, index) => (
                <div key={index} className="bg-[#FFBE58]/40 p-4 rounded-lg">
                  <div className="flex items-center justify-between ">
                    <div>
                      <p className="text-sm font-medium text-black">{activity.label}</p>
                      <p className="text-2xl font-bold text-black">{activity.value}</p>
                    </div>
                    <activity.Icon className="h-8 w-8 text-[#7F1945] dark:text-[#FFBE58]" />
                  </div>
                </div>
              ))}
            </div>
        </Card>
        <Card className="bg-[#FFBE58]/20 hover:bg-[#FFBE58]/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-black">Order History</CardTitle>
            <Button variant="outline" className="bg-[#FFBE58] text-black hover:bg-[#FFBE58]/80">
              Add New Order
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order #</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((order, index) => (
                    <TableRow key={index}>
                      <TableCell>{order.order}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <Badge variant={order.status === "Delivered" ? "success" : order.status === "Shipped" ? "warning" : order.status === "Cancelled" ? "danger" : "default"}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoveHorizontalIcon className="w-4 h-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Order</DropdownMenuItem>
                            <DropdownMenuItem>Update Status</DropdownMenuItem>
                            <DropdownMenuItem>Cancel Order</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Delivery;
