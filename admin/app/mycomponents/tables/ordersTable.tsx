// DeleteCancelTable.tsx
import React, { useState } from "react";
import "@/app/globals.css";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

interface Order {
  order: string;
  customer: string;
  driver: string;
  status: string;
  total: number;
  date: string;
}

interface DeleteCancelTableProps {
  data: Order[];
}

export const DeleteCancelTable: React.FC<DeleteCancelTableProps> = ({
  data,
}) => {
  const [displayedItems, setDisplayedItems] = useState<Order[]>(
    data.slice(0, 3)
  );

  return (
    <div>
      <Card className="bg-[#FFBE58]/20 hover:bg-[#FFBE58]/50">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-black">
            Recent Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order#</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Carrier</TableHead>
                <TableHead>Delivery Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedItems.map((order, index) => (
                <TableRow key={index}>
                  <TableCell>{order.order}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.driver}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{`₦${order.total.toFixed(2)}`}</TableCell> 
                  <TableCell>{order.date.slice(0, 10)}</TableCell> 
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 justify-content-center text-center mx-auto">
            <CardFooter className="flex mx-auto">
              <Link href="dashboard/orders" className="mx-auto">
                <Button variant="outline" size="sm" className=" iterm-center">
                  View All
                </Button>
              </Link>
            </CardFooter>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
