import React from 'react'
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { BellIcon, ClockIcon, PackageIcon, UsersIcon } from '../icons'
import { Button } from "@/components/ui/button"
type Props = {}

export default function Notifications({}: Props) {
  return (
    <>
    <Popover>
            <PopoverTrigger asChild>
              <Button variant="hover" size="icon" className="rounded-full">
                <BellIcon className="h-6 w-6" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-gradient-to-r from-[#7F1945] to-[#FFBE58] text-white">
              <div className="space-y-4 p-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    <PackageIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium">New Order Received</p>
                    <p className="text-sm text-gray-300">Order #12345 from John Doe</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    <UsersIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium">New Driver Assigned</p>
                    <p className="text-sm text-gray-300">Driver: Jane Smith</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <ClockIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium">New Driver Assigned</p>
                    <p className="text-sm text-gray-300">Order #12346 delayed by 15 min</p>
                  </div>
                </div>
                {/* <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    <ClockIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium">Delivery Delayed</p>
                    <p className="text-sm text-gray-300">Order #12346 delayed by 15 minutes</p>
                  </div>
                </div> */}
              </div>
            </PopoverContent>
          </Popover>
    </>
  )
}
