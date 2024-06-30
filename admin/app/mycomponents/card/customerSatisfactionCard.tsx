import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { StarIcon } from "@/app/mycomponents/icons";

interface CustomerSatisfactionCardProps {
  data: {
    customer: string;
    rating: number; 
    carrier: string;
  }[];
}

const CustomerSatisfactionCard: React.FC<CustomerSatisfactionCardProps> = ({ data }) => {
  return (
    <Card className="bg-[#FFBE58]/20 hover:bg-[#FFBE58]/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-black">
          Customer Satisfaction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Rating</TableHead> 
                <TableHead>Carrier</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.customer}</TableCell>
                  <TableCell className="flex items-center">
                    {[...Array(row.rating)].map((_, i) => (
                      <StarIcon key={i} className="h-4 w-4 text-yellow-500" />
                    ))}
                  </TableCell> 
                  <TableCell>{row.carrier}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerSatisfactionCard;
