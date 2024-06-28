import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

interface EarningsReportCardProps {
  data: {
    month: string;
    totalRevenue: number;
    payouts: number;
    netProfit: number;
  }[];
}

const EarningsReportCard: React.FC<EarningsReportCardProps> = ({ data }) => {
  return (
    <Card className="bg-[#FFBE58]/20 hover:bg-[#FFBE58]/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-black">
          Earnings Report
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Total Revenue</TableHead>
                <TableHead>Payouts</TableHead>
                <TableHead>Net Profit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.month}</TableCell>
                  <TableCell>{row.totalRevenue}</TableCell>
                  <TableCell>{row.payouts}</TableCell>
                  <TableCell>{row.netProfit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default EarningsReportCard;
