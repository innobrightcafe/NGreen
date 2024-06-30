'use client';
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const OrdersSkeleton = () => {
  const renderCardSkeletons = () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, index) => (
        <Card key={index} className="bg-[#FFBE58]/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-black">
              <Skeleton className="h-4 w-1/2" />
            </CardTitle>
            <Skeleton className="h-6 w-6" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">
              <Skeleton className="h-8 w-3/4" />
            </div>
            <div className="text-sm text-[#7F1945] dark:text-[#FFBE58]">
              <Skeleton className="h-4 w-1/2" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );


  const renderChartSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, index) => (
        <Card key={index} className="bg-[#FFBE58]/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-black">
              <Skeleton className="h-4 w-1/2" />
            </CardTitle>
            <Skeleton className="h-6 w-6" />
          </CardHeader>
          <CardContent>
            <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 rounded-lg">
              <Skeleton className="w-full h-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderBoxkeleton = () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      {[...Array(4)].map((_, index) => (
        <Card key={index} className="bg-[#FFBE58]/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-black">
              <Skeleton className="h-4 w-1/4" />
            </CardTitle>
            <Skeleton className="h-6 w-6" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
  
  const renderTableSkeleton = () => (
    <div className="col-span-1 md:col-span-2 lg:col-span-3">
      <Card className="bg-[#FFBE58]/20">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>
            <Skeleton className="h-4 w-1/4" />
          </CardTitle>
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </CardHeader>
        <CardContent>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <Skeleton className="h-4 w-12" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <Skeleton className="h-4 w-16" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <Skeleton className="h-4 w-16" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <Skeleton className="h-4 w-12" />
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <Skeleton className="h-4 w-12" />
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <Skeleton className="h-4 w-12" />
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...Array(3)].map((_, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-16" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-16" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Skeleton className="h-4 w-16" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Skeleton className="h-4 w-16" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-white dark:bg-white">
      {renderCardSkeletons()}
      {renderChartSkeleton()}
      {renderTableSkeleton()}
    </main>
  );
};

export default OrdersSkeleton;
