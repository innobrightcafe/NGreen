"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  DeleteIcon,
  FilterIcon,
  PlusIcon,
  TrashIcon,
} from "../icons";
import { customerTableData } from "@/app/data/data";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type FilterKeys = "low" | "medium" | "high";

export default function CustomersTable() {
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
  
    const filteredData = customerTableData.filter((customer) => {
      if (filters.low && customer.totalspent > 2000) return false;
      if (filters.medium && (customer.totalspent <= 2000 || customer.totalspent > 6000)) return false;
      if (filters.high && customer.totalspent <= 6000) return false;
      return true;
    });
  
    return (
      <>
       <Card className="bg-[#FFBE58]/20 hover:bg-[#FFBE58]/50">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-black">
            Customer Details
          </CardTitle>
          <div className="flex items-center gap-2">
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
                {filteredData.map((customer, index) => (
                  <TableRow key={index}>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.orders}</TableCell>
                    <TableCell>${customer.totalspent.toFixed(2)}</TableCell>
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
          </CardContent>
        </Card>
      </>
    );
  }
