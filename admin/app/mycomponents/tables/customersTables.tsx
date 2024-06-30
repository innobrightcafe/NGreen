"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  ChevronDownIcon,
  MoveHorizontalIcon,
  PlusIcon,
  FilterIcon,
} from "../icons";

type FilterKeys = "low" | "medium" | "high";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalspent: number;
};

type CustomersTableProps = {
  users: Customer[];
};

export const CustomersTable : React.FC<CustomersTableProps> = ({ users }) => {
  const [viewAll, setViewAll] = useState(false);
  const [filters, setFilters] = useState({
    low: false,
    medium: false,
    high: false,
  });

  const handleFilterChange = (filter: FilterKeys) => {
    setFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  const filteredData = users.filter((user) => {
    if (filters.low && user.totalspent > 2000) return false;
    if (filters.medium && (user.totalspent <= 2000 || user.totalspent > 6000))
      return false;
    if (filters.high && user.totalspent <= 6000) return false;
    return true;
  });

  const displayedData = viewAll ? filteredData : filteredData.slice(0, 3);

  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-3">
      <Card className="bg-[#FFBE58]/20 hover:bg-[#FFBE58]/50 transition-colors">
     
          <CardHeader className="flex flex-row items-center justify-between pb-5">
            <CardTitle className="text-sm font-medium text-black">Customer Details</CardTitle>
            <div className="flex items-center gap-2">
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
                <DropdownMenuCheckboxItem
                  checked={filters.low}
                  onCheckedChange={() => handleFilterChange("low")}
                >
                  Low Spend
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.medium}
                  onCheckedChange={() => handleFilterChange("medium")}
                >
                  Medium Spend
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.high}
                  onCheckedChange={() => handleFilterChange("high")}
                >
                  High Spend
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {filteredData.length > 3 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewAll(!viewAll)}
              >
                {viewAll ? "View Less" : "View All"}
              </Button>
            )}
          </div>

          <div className="flex items-end justify-end gap-2">
            <Button variant="outline" size="icon">
              <PlusIcon className="h-4 w-4" />
              <span className="sr-only">Add Customer</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <FilterIcon className="h-4 w-4" />
                  <span className="sr-only">Filter Customers</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuCheckboxItem
                  checked={filters.low}
                  onCheckedChange={() => handleFilterChange("low")}
                >
                  Low Spend
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.medium}
                  onCheckedChange={() => handleFilterChange("medium")}
                >
                  Medium Spend
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.high}
                  onCheckedChange={() => handleFilterChange("high")}
                >
                  High Spend
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.orders}</TableCell>
                  <TableCell>{`₦${user.totalspent.toFixed(2)}`}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoveHorizontalIcon className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-gradient-to-r from-[#7F1945] to-[#FFBE58] text-white"
                      >
                        <DropdownMenuItem>View User</DropdownMenuItem>
                        <DropdownMenuItem>Update User</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
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
