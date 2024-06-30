// 'use client';
// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuItem,
//   DropdownMenuCheckboxItem,
// } from "@/components/ui/dropdown-menu";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
// } from "@/components/ui/table";
// import {
//   ChevronDownIcon,
//   MoveHorizontalIcon,
//   PlusIcon,
//   FilterIcon,
// } from "../icons";
// import { Badge } from "@/components/ui/badge";
// import { OrderDrawer } from "../drawers/orderDrawer"; // Adjust the import path as needed

// type FilterKeys = "delivered" | "pending" | "cancelled";

// export interface Order {
//   order: string;
//   customer: string;
//   driver: string;
//   status: string;
//   total: number;
//   date: string;
// }

// interface OrderTableProps {
//   data: Order[];
// }

// export const ActionTable: React.FC<OrderTableProps> = ({ data }) => {
//   const [filters, setFilters] = useState({
//     delivered: false,
//     pending: false,
//     cancelled: false,
//   });
//   const [viewAll, setViewAll] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

//   const handleFilterChange = (filter: FilterKeys) => {
//     setFilters((prev) => ({
//       ...prev,
//       [filter]: !prev[filter],
//     }));
//   };

//   const filteredData = data.filter((order) => {
//     if (filters.delivered && order.status !== 'delivered') return false;
//     if (filters.pending && order.status !== 'pending') return false;
//     if (filters.cancelled && order.status !== 'cancelled') return false;
//     return true;
//   });

//   const displayedData = viewAll ? filteredData : filteredData.slice(0, 3);

//   const handleViewOrder = (order: Order) => {
//     setSelectedOrder(order);
//   };

//   const handleCloseDrawer = () => {
//     setSelectedOrder(null);
//   };

//   const handleUpdateStatus = (status: string) => {
//     if (selectedOrder) {
//       // Update the status of the selected order
//       selectedOrder.status = status;
//       setSelectedOrder({ ...selectedOrder }); // Trigger re-render
//     }
//   };

//   const handleCancelOrder = () => {
//     if (selectedOrder) {
//       // Perform cancellation logic
//       console.log(`Order ${selectedOrder.order} canceled`);
//       handleCloseDrawer();
//     }
//   };

//   return (
//     <div className="col-span-1 md:col-span-2 lg:col-span-3">
//       <Card className="bg-[#FFBE58]/20 hover:bg-[#FFBE58]/50 transition-colors">
//         <CardHeader className="flex flex-row items-center justify-between pb-5">
//           <CardTitle className="text-sm font-medium text-black">
//             Order Details
//           </CardTitle>
//           <div className="flex items-center gap-2">
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" size="sm">
//                   Filter
//                   <ChevronDownIcon className="ml-2 h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent
//                 align="end"
//                 className="bg-gradient-to-r from-[#7F1945] to-[#FFBE58] text-white"
//               >
//                 <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuCheckboxItem
//                   checked={filters.delivered}
//                   onCheckedChange={() => handleFilterChange("delivered")}
//                 >
//                   Delivered
//                 </DropdownMenuCheckboxItem>
//                 <DropdownMenuCheckboxItem
//                   checked={filters.pending}
//                   onCheckedChange={() => handleFilterChange("pending")}
//                 >
//                   Pending
//                 </DropdownMenuCheckboxItem>
//                 <DropdownMenuCheckboxItem
//                   checked={filters.cancelled}
//                   onCheckedChange={() => handleFilterChange("cancelled")}
//                 >
//                   Cancelled
//                 </DropdownMenuCheckboxItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//             {filteredData.length > 3 && (
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => setViewAll(!viewAll)}
//               >
//                 {viewAll ? "View Less" : "View All"}
//               </Button>
//             )}
//           </div>
//           <div className="flex items-end justify-end gap-2">
//             <Button variant="outline" size="icon">
//               <PlusIcon className="h-4 w-4" />
//               <span className="sr-only">Add Customer</span>
//             </Button>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Order</TableHead>
//                 <TableHead>Customer</TableHead>
//                 <TableHead>Driver</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Total</TableHead>
//                 <TableHead>Date</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {displayedData.map((order, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{order.order}</TableCell>
//                   <TableCell>{order.customer}</TableCell>
//                   <TableCell>{order.driver}</TableCell>
//                   <TableCell>
//                     <Badge
//                       variant={
//                         order.status === "delivered"
//                           ? "success"
//                           : order.status === "pending"
//                           ? "warning"
//                           : "danger"
//                       }
//                       className={`${
//                         order.status === "delivered"
//                           ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
//                           : order.status === "pending"
//                           ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
//                           : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
//                       }`}
//                     >
//                       {order.status}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>{order.total}</TableCell>
//                   <TableCell>{order.date.slice(0, 10)}</TableCell>
//                   <TableCell className="text-right">
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" size="icon">
//                           <MoveHorizontalIcon className="h-4 w-4" />
//                           <span className="sr-only">Actions</span>
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent
//                         align="end"
//                         className="bg-gradient-to-r from-[#7F1945] to-[#FFBE58] text-white"
//                       >
//                         <DropdownMenuItem onSelect={() => handleViewOrder(order)}>View Order</DropdownMenuItem>
//                         <DropdownMenuItem onSelect={() => handleUpdateStatus("pending")}>Update status</DropdownMenuItem>
//                         <DropdownMenuItem onSelect={handleCancelOrder}>Cancel Order</DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//       <OrderDrawer
//         order={selectedOrder}
//         isOpen={!!selectedOrder}
//         onClose={handleCloseDrawer}
//         onUpdateStatus={handleUpdateStatus}
//         onCancelOrder={handleCancelOrder}
//       />
//     </div>
//   );
// };
'use client';
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
} from "../icons";
import { Badge } from "@/components/ui/badge";
import { OrderDrawer } from "../drawers/orderDrawer"; // Adjust the import path as needed

type FilterKeys = "delivered" | "pending" | "cancelled";

export interface Order {
  order: string;
  customer: string;
  driver: string;
  status: string;
  total: number;
  date: string;
}

interface OrderTableProps {
  data: Order[];
  onUpdateOrder: (order: Order) => void; // New prop for updating order
}

export const ActionTable: React.FC<OrderTableProps> = ({ data, onUpdateOrder }) => {
  const [filters, setFilters] = useState({
    delivered: false,
    pending: false,
    cancelled: false,
  });
  const [viewAll, setViewAll] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleFilterChange = (filter: FilterKeys) => {
    setFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  const filteredData = data.filter((order) => {
    if (filters.delivered && order.status !== 'delivered') return false;
    if (filters.pending && order.status !== 'pending') return false;
    if (filters.cancelled && order.status !== 'cancelled') return false;
    return true;
  });

  const displayedData = viewAll ? filteredData : filteredData.slice(0, 3);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedOrder(null);
  };

  const handleUpdateStatus = (status: string) => {
    if (selectedOrder) {
      // Update the status of the selected order
      const updatedOrder = { ...selectedOrder, status };
      onUpdateOrder(updatedOrder);
      setSelectedOrder(updatedOrder); // Trigger re-render
    }
  };

  const handleCancelOrder = () => {
    if (selectedOrder) {
      // Perform cancellation logic
      console.log(`Order ${selectedOrder.order} canceled`);
      handleCloseDrawer();
    }
  };

  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-3">
      <Card className="bg-[#FFBE58]/20 hover:bg-[#FFBE58]/50 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between pb-5">
          <CardTitle className="text-sm font-medium text-black">
            Order Details
          </CardTitle>
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
                <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={filters.delivered}
                  onCheckedChange={() => handleFilterChange("delivered")}
                >
                  Delivered
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.pending}
                  onCheckedChange={() => handleFilterChange("pending")}
                >
                  Pending
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.cancelled}
                  onCheckedChange={() => handleFilterChange("cancelled")}
                >
                  Cancelled
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
          </div>
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
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedData.map((order, index) => (
                <TableRow key={index}>
                  <TableCell>{order.order}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.driver}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "delivered"
                          ? "success"
                          : order.status === "pending"
                          ? "warning"
                          : "danger"
                      }
                      className={`${
                        order.status ===                         "delivered"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                        : order.status === "pending"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                    }`}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{`₦${order.total.toFixed(2)}`}</TableCell>
                <TableCell>{order.date.slice(0, 10)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleViewOrder(order)}>
                    <MoveHorizontalIcon className="h-4 w-4" />
                    <span className="sr-only">Actions</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    {/* Drawer Component for Order Details */}
    <OrderDrawer
      order={selectedOrder}
      isOpen={isDrawerOpen}
      onClose={handleCloseDrawer}
      onUpdateStatus={handleUpdateStatus}
      onCancelOrder={handleCancelOrder}
    />
  </div>
);
};

