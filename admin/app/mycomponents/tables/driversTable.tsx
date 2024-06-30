import { useState } from "react" 
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { driverTableData } from "@/app/data/data"
import { ChevronDownIcon, MoveHorizontalIcon, StarIcon, UsersIcon } from "../icons"

type FilterKeys = 'active' | 'offline' | 'new';

interface Driver {
  driver: string;
  status: string;
  deliveries: string;
  rating: number;
}

interface DriversTableProps {
  data: Driver[];
}

export default function DriversTable({ data }: DriversTableProps) {
  const [filters, setFilters] = useState({
    active: false,
    offline: false,
    new: false
  });

  const handleFilterChange = (filter: FilterKeys) => {
    setFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

  const filteredData = driverTableData.filter((driver) => {
    if (filters.active && driver.status !== "Active") return false;
    if (filters.offline && driver.status !== "Offline") return false;
    if (filters.new && driver.status !== "New") return false;
    return true;
  });

      return (
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <Card className="bg-[#FFBE58]/20 hover:bg-[#FFBE58]/50 transition-colors">
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Drivers</CardTitle>
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Filter
                      <ChevronDownIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-gradient-to-r from-[#7F1945] to-[#FFBE58] text-white">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleFilterChange('active')}>
                      <Checkbox id="filter-active" checked={filters.active} />
                      <label htmlFor="filter-active" className="ml-2">
                        Active
                      </label>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFilterChange('offline')}>
                      <Checkbox id="filter-offline" checked={filters.offline} />
                      <label htmlFor="filter-offline" className="ml-2">
                        Offline
                      </label>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFilterChange('new')}>
                      <Checkbox id="filter-new" checked={filters.new} />
                      <label htmlFor="filter-new" className="ml-2">
                        New
                      </label>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" size="sm" onClick={() => setFilters({ active: false, offline: false, new: false })}>
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Driver</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Deliveries</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((driver, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback>{driver.driver[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div>{driver.driver}</div>
                            <div className="text-sm text-gray-500">ID: {index + 12345}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={driver.status === "Active" ? "success" : "warning"}
                          className={`bg-${driver.status === "Active" ? "green" : "yellow"}-100 text-${driver.status === "Active" ? "green" : "yellow"}-800 dark:bg-${driver.status === "Active" ? "green" : "yellow"}-900 dark:text-${driver.status === "Active" ? "green" : "yellow"}-100`}
                        >
                          {driver.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{driver.deliveries}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, starIndex) => (
                            <StarIcon
                              key={starIndex}
                              className={`h-4 w-4 fill-${starIndex < driver.rating ? "[#FFBE58]" : "gray-300 dark:fill-gray-600"}`}
                            />
                          ))}
                          <span className="text-sm">{driver.rating}.0</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoveHorizontalIcon className="h-4 w-4" />
                              <span className="sr-only">Driver actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="bg-gradient-to-r from-[#7F1945] to-[#FFBE58] text-white"
                          >
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Update Status</DropdownMenuItem>
                            <DropdownMenuItem>Suspend Driver</DropdownMenuItem>
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
      )
    }
