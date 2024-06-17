"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChevronDownIcon, MoveHorizontalIcon } from "../icons";

interface Order {
  order: string;
  customer: string;
  driver: string;
  status: string;
  total: number;
}

interface ActionTableProps {
  data: Order[];
}

export const ActionTable: React.FC<ActionTableProps> = ({ data }) => {
  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-3">
      <Card className="bg-[#FFBE58]/20 hover:bg-[#FFBE58]/50 transition-colors">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Orders</CardTitle>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Filter
                  <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-gradient-to-r from-[#7F1945] to-[#FFBE58] text-white"
              >
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Checkbox id="filter-delivered" />
                  <label htmlFor="filter-delivered" className="ml-2">
                    Delivered
                  </label>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Checkbox id="filter-in-progress" />
                  <label htmlFor="filter-in-progress" className="ml-2">
                    In Progress
                  </label>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Checkbox id="filter-cancelled" />
                  <label htmlFor="filter-cancelled" className="ml-2">
                    Cancelled
                  </label>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((order, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{order.order}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.driver}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "Delivered"
                          ? "success"
                          : order.status === "Shipped"
                          ? "warning"
                          : "danger"
                      }
                      className={`${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          : order.status === "Shipped"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                      }`}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{`NGN ${order.total.toFixed(2)}`}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoveHorizontalIcon className="h-4 w-4" />
                          <span className="sr-only">Order actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-gradient-to-r from-[#7F1945] to-[#FFBE58] text-white"
                      >
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
        </CardContent>
      </Card>
    </div>
  );
};
