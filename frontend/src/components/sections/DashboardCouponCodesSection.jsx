import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/table";
import { ArrowLeft, ArrowRight, Trash2 } from "lucide-react";

const DashboardCouponCodesSection = () => {
  return (
    <div className="w-full  h-[500px]  overflow-y-scroll rounded-sm p-3 shadow-2xl">
      <Table>
        <TableHeader>
          <TableRow className="text-primary">
            <TableHead className="w-[100px]">Coupon ID</TableHead>
            <TableHead>COUPON CODE</TableHead>
            <TableHead>VALUE</TableHead>
            <TableHead className="text-right">DELETE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Code10</TableCell>
            <TableCell>50</TableCell>
            <TableCell className="text-primary">
              <Trash2 className="ml-auto" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>code10</TableCell>
            <TableCell>50</TableCell>
            <TableCell className="text-primary">
              <Trash2 className="ml-auto" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default DashboardCouponCodesSection;
