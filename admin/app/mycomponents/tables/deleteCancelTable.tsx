import React from "react";
import '@/app/globals.css';
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
import { DeleteIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

interface Order {
  order: string;
  customer: string;
  driver: string;
  status: string;
  total: number;
}

interface DeleteCancelTableProps {
  data: Order[];
}

export const DeleteCancelTable: React.FC<DeleteCancelTableProps> = ({ data }) => {
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
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((order, index) => (
                <TableRow key={index}>
                  <TableCell>{order.order}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.driver}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="icon">
                      <DeleteIcon className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="outline" size="icon">
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 justify-content-center">
            <CardFooter className="flex">
              <Link href={"/orders"} className="mx-auto" prefetch={false}>
                <Button variant="outline" size="sm">
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
