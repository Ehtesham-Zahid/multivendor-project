import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/table";
import { ArrowLeft, ArrowRight } from "lucide-react";

const RefundsSection = () => {
  return (
    <div className="w-full  h-[500px]  overflow-y-scroll rounded-sm p-3 shadow-2xl">
      <Table>
        <TableHeader>
          <TableRow className="text-primary">
            <TableHead className="w-[100px]">ORDER ID</TableHead>
            <TableHead>DATE</TableHead>
            <TableHead>PAYMENT STATUS</TableHead>
            <TableHead>FULFILLMENT STATUS</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">See Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>June 23, 2025</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Delivered</TableCell>
            <TableCell>$250.00</TableCell>{" "}
            <TableCell>
              <ArrowRight className="ml-auto text-primary" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>June 23, 2025</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Dispatched</TableCell>
            <TableCell>$250.00</TableCell>
            <TableCell>
              <ArrowRight className="ml-auto text-primary" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default RefundsSection;
