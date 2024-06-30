// 'use client';
// import React from "react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/drawer";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Order } from "../tables/orderDetailsTable"; // Adjust the import path as needed

// interface OrderDrawerProps {
//   order: Order | null;
//   isOpen: boolean;
//   onClose: () => void;
//   onUpdateStatus: (status: string) => void;
//   onCancelOrder: () => void;
// }

// export const OrderDrawer: React.FC<OrderDrawerProps> = ({ order, isOpen, onClose, onUpdateStatus, onCancelOrder }) => {
//   if (!order) return null;

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Order Details</DialogTitle>
//           <DialogClose asChild>
//             <Button variant="ghost" size="icon">
//               Close
//             </Button>
//           </DialogClose>
//         </DialogHeader>
//         <div className="p-4">
//           <div className="flex flex-col gap-2">
//             <div>
//               <strong>Order ID:</strong> {order.order}
//             </div>
//             <div>
//               <strong>Customer:</strong> {order.customer}
//             </div>
//             <div>
//               <strong>Driver:</strong> {order.driver}
//             </div>
//             <div>
//               <strong>Status:</strong>
//               <Badge
//                 variant={
//                   order.status === "delivered"
//                     ? "success"
//                     : order.status === "pending"
//                     ? "warning"
//                     : "danger"
//                 }
//                 className={`${
//                   order.status === "delivered"
//                     ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
//                     : order.status === "pending"
//                     ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
//                     : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
//                 }`}
//               >
//                 {order.status}
//               </Badge>
//             </div>
//             <div>
//               <strong>Total:</strong> ${order.total.toFixed(2)}
//             </div>
//             <div>
//               <strong>Date:</strong> {order.date.slice(0, 10)}
//             </div>
//           </div>
//         </div>
//         <DialogFooter>
//           <Button variant="outline" onClick={() => onUpdateStatus("delivered")}>
//             Mark as Delivered
//           </Button>
//           <Button variant="outline" onClick={() => onUpdateStatus("pending")}>
//             Mark as Pending
//           </Button>
//           <Button variant="danger" onClick={onCancelOrder}>
//             Cancel Order
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };
'use client';
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { Order } from "../tables/orderDetailsTable"; // Adjust the import path as needed

interface OrderDrawerProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (status: string) => void;
  onCancelOrder: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({ order, isOpen, onClose, onUpdateStatus, onCancelOrder }) => {
  if (!order) return null;

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Order Details</DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon">
              Close
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <DrawerDescription>
          <div className="p-4">
            <div className="flex flex-col gap-2">
              <div>
                <strong>Order ID:</strong> {order.order}
              </div>
              <div>
                <strong>Customer:</strong> {order.customer}
              </div>
              <div>
                <strong>Driver:</strong> {order.driver}
              </div>
              <div>
                <strong>Status:</strong>
                <Badge
                  variant={
                    order.status === "delivered"
                      ? "success"
                      : order.status === "pending"
                      ? "warning"
                      : "danger"
                  }
                  className={`${
                    order.status === "delivered"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                      : order.status === "pending"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                  }`}
                >
                  {order.status}
                </Badge>
              </div>
              <div>
                <strong>Total:</strong> ${order.total.toFixed(2)}
              </div>
              <div>
                <strong>Date:</strong> {order.date.slice(0, 10)}
              </div>
            </div>
          </div>
        </DrawerDescription>
        <DrawerFooter>
          <Button variant="outline" onClick={() => onUpdateStatus("delivered")}>
            Mark as Delivered
          </Button>
          <Button variant="outline" onClick={() => onUpdateStatus("pending")}>
            Mark as Pending
          </Button>
          <Button variant="danger" onClick={onCancelOrder}>
            Cancel Order
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
