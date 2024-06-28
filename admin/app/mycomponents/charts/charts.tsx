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




// import React from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { BarChart } from './barChart'; 
// import { LineChart } from './lineChart'; 
 
 
// type Props = {
//   orders: any[];
//   transactions: any[];
// };

// const Charts: React.FC<Props> = ({ orders, transactions }) => {
//   // Example data for LineChart and BarChart
//   const lineChartData = [
//     {
//       id: 'Desktop',
//       data: [
//         { x: 'Jan', y: 43 },
//         { x: 'Feb', y: 137 },
//         { x: 'Mar', y: 61 },
//         { x: 'Apr', y: 145 },
//         { x: 'May', y: 26 },
//         { x: 'Jun', y: 154 },
//       ],
//     },
//     {
//       id: 'Mobile',
//       data: [
//         { x: 'Jan', y: 60 },
//         { x: 'Feb', y: 48 },
//         { x: 'Mar', y: 177 },
//         { x: 'Apr', y: 78 },
//         { x: 'May', y: 96 },
//         { x: 'Jun', y: 204 },
//       ],
//     },
//   ];

//   const barChartData = [
//     {
//       id: 'BarChart',
//       data: [
//         { x: 'Jan', y: 111 },
//         { x: 'Feb', y: 157 },
//         { x: 'Mar', y: 129 },
//         { x: 'Apr', y: 150 },
//         { x: 'May', y: 119 },
//         { x: 'Jun', y: 72 },
//       ],
//     },
//   ];

//   return (
//     <>
//       <Card className="bg-[#FFBE58]/20 hover:bg-[#FFBE58]/50">
//         <CardHeader className="flex flex-row items-center justify-between pb-2">
//           <CardTitle className="text-sm font-medium text-black">Delivery Time</CardTitle>
//           {/* Add appropriate icon here */}
//         </CardHeader>
//         <CardContent>
//           <LineChart
//             data={lineChartData}
//             margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
//             xScale={{ type: 'point' }}
//             yScale={{ type: 'linear' }}
//             axisBottom={{ tickSize: 0, tickPadding: 16 }}
//             axisLeft={{ tickSize: 0, tickValues: [0, 50, 100, 150, 200, 250], tickPadding: 16 }}
//             colors={['#2563eb', '#e11d48']}
//             pointSize={6}
//             useMesh={true}
//             gridYValues={6}
//             theme={{
//               tooltip: { chip: { borderRadius: '9999px' }, container: { fontSize: '12px', textTransform: 'capitalize', borderRadius: '6px' } },
//               grid: { line: { stroke: '#f3f4f6' } },
//             }}
//             role="application"
//           />
//         </CardContent>
//       </Card>
//       <Card className="bg-[#FFBE58]/20 hover:bg-[#FFBE58]/50">
//         <CardHeader className="flex flex-row items-center justify-between pb-2">
//           <CardTitle className="text-sm font-medium text-black">Order Volume</CardTitle>
//           {/* Add appropriate icon here */}
//         </CardHeader>
//         <CardContent>
//           <BarChart
//             data={barChartData}
//             keys={['count']}
//             indexBy="name"
//             margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
//             padding={0.3}
//             colors={['#2563eb']}
//             axisBottom={{ tickSize: 0, tickPadding: 16 }}
//             axisLeft={{ tickSize: 0, tickValues: [0, 50, 100, 150, 200], tickPadding: 16 }}
//             gridYValues={4}
//             theme={{
//               tooltip: { chip: { borderRadius: '9999px' }, container: { fontSize: '12px', textTransform: 'capitalize', borderRadius: '6px' } },
//               grid: { line: { stroke: '#f3f4f6' } },
//             }}
//             tooltipLabel={({ id }: { id: string }) => `${id}`}
//             enableLabel={false}
//             role="application"
//             ariaLabel="A bar chart showing data"
//           />
//         </CardContent>
//       </Card>
//     </>
//   );
// };

// export default Charts;