"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";
import { useState } from "react";

type CardProps = {
  order: string;
  customer: string;
  driver: string;
  status: string;
  total: number;
};

export function Cards({ data }: { data: CardProps }) {
  const { order, customer, driver, status, total } = data;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleCancel = () => {
    setIsDrawerOpen(false);
  };

  const handlePrint = () => {
    const printContent = document.getElementById("print-content");
    if (printContent) {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Print Receipt</title>
              <style>
                @page { size: A4; margin: 20mm; }
                body { font-family: Arial, sans-serif; padding: 20mm; }
                .print-content { width: 210mm; height: 297mm; }
                .drawer-header, .drawer-footer { display: none; }
              </style>
            </head>
            <body>
              ${printContent.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
        printWindow.close();
      }
    }
  };

  return (
    <>
      <Button variant="outline" onClick={() => setIsDrawerOpen(true)}>
        Open Drawer
      </Button>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="print-content" id="print-content" style={{ width: "210mm", height: "297mm" }}>
          <DrawerHeader>
            <div>
              <h3>NICOLAS GREEN LOGISTICS</h3>
              <h3>Transaction Details</h3>
            </div>
            <h3>Transaction Receipt</h3>
          </DrawerHeader>
          <div className="text-2xl py-10 gap-10 font-bold text-black">
            <div>
              <div>
                <p>Amount Spent</p>
                <p>1000</p>
              </div>
              <div>
                <p>Package Name</p>
                <p>Status</p>
                <p>Successful</p>
              </div>
            </div>
          </div>
          <DrawerFooter className="drawer-footer">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="outline" onClick={handlePrint}>
              Print
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
