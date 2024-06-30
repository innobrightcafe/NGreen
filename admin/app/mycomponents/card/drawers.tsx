
import { Button } from "@/components/ui/button";
import { Drawer, DrawerHeader, DrawerContent, DrawerFooter } from "@/components/ui/drawer"; 

import { CircleAlertIcon, TrashIcon } from "lucide-react";
import { useActionState, useState } from "react";
type Props = {}

const Drawers = (props: Props) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);  
  return (
    
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
    <DrawerContent>
      <DrawerHeader>
        <h2 className="text-black font-semibold text-center">Delete Confirmation</h2>
      </DrawerHeader>
      <div className=" flex gap-2 p-4 text-red-500 text-center justify-center">
        <div>
        <CircleAlertIcon />
        </div> 
        <p className=" ">This Order will be deleted permanently. Are you sure you want to do?</p>
      </div>
      <DrawerFooter>
        <Button variant="outline"  >
          Cancel
        </Button>
        <Button variant="outline" >
          OK
        </Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
  )
}