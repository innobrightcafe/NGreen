// ReferralPayoutsCard.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

interface ReferralPayoutsCardProps {
  data: {
    agent: string;
    totalReferrals: number;
    earnings: number;
    bonus: number;
    totalPayout: number;
  }[];
}

const ReferralPayoutsCard: React.FC<ReferralPayoutsCardProps> = ({ data }) => {
  return (
    <Card className="bg-[#FFBE58]/20 hover:bg-[#FFBE58]/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-black">
          Referral Payouts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Total Referrals</TableHead>
                <TableHead>Earnings</TableHead>
                <TableHead>Bonus</TableHead>
                <TableHead>Total Payout</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.agent}</TableCell>
                  <TableCell>{row.totalReferrals}</TableCell>
                  <TableCell>{`$${row.earnings.toFixed(2)}`}</TableCell>
                  <TableCell>{`$${row.bonus.toFixed(2)}`}</TableCell>
                  <TableCell>{`$${row.totalPayout.toFixed(2)}`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralPayoutsCard;
