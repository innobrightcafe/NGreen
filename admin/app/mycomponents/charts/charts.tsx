import React from 'react' 
import { Card, CardHeader, CardTitle, CardContent, } from "@/components/ui/card"
import { BarChart, UsersIcon, StarIcon, LineChart, ClockIcon, BarChartIcon } from "@/app/mycomponents/icons"
type Props = {}

export function Charts({}: Props) {
  return (
    <>
    <Card className="bg-[#FFBE58]/20 hover:bg-[#FFBE58]/50">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-black">Delivery Time</CardTitle>
          <ClockIcon className="h-4 w-4 text-[#7F1945] dark:text-[#FFBE58]" />
        </CardHeader>
        <CardContent>
          <LineChart className="w-full aspect-[4/3]" />
        </CardContent>
      </Card>
      <Card className="bg-[#FFBE58]/20 hover:bg-[#FFBE58]/50">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-black">Order Volume</CardTitle>
          <BarChartIcon className="h-4 w-4 text-[#7F1945] dark:text-[#FFBE58]" />
        </CardHeader>
        <CardContent>
          <BarChart className="w-full aspect-[4/3]" />
        </CardContent>
      </Card>
      <Card className="bg-[#FFBE58]/20 hover:bg-[#FFBE58]/50">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-black">Customer Satisfaction</CardTitle>
          <StarIcon className="h-4 w-4 text-[#7F1945] dark:text-[#FFBE58]" />
        </CardHeader>
        <CardContent>
          <LineChart className="w-full aspect-[4/3]" />
        </CardContent>
      </Card>
      <Card className="bg-[#FFBE58]/20 hover:bg-[#FFBE58]/50">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-black">Driver Performance</CardTitle>
          <UsersIcon className="h-4 w-4 text-[#7F1945] dark:text-[#FFBE58]" />
        </CardHeader>
        <CardContent>
          <BarChart className="w-full aspect-[4/3]" />
        </CardContent>
      </Card>
    </>
  )
}

export default Charts