// DriverPayoutsCard.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

interface DriverPayoutsCardProps {
  data: {
    driver: string;
    totalDeliveries: number;
    earnings: number;
    bonus: number;
    totalPayout: number;
  }[];
}

const DriverPayoutsCard: React.FC<DriverPayoutsCardProps> = ({ data }) => {
  return (
    <Card className="bg-[#FFBE58]/20 hover:bg-[#FFBE58]/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-black">
          Driver Payouts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Driver</TableHead>
                <TableHead>Total Deliveries</TableHead>
                <TableHead>Earnings</TableHead>
                <TableHead>Bonus</TableHead>
                <TableHead>Total Payout</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.driver}</TableCell>
                  <TableCell>{row.totalDeliveries}</TableCell>
                  <TableCell>{row.earnings}</TableCell>
                  <TableCell>{row.bonus}</TableCell>
                  <TableCell>{row.totalPayout}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DriverPayoutsCard;
