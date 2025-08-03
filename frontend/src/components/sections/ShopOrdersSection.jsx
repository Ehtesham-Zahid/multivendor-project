import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/table";
import { ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";

const ShopOrdersSection = () => {
  const { shop } = useSelector((state) => state.shop);

  return (
    <div className="w-full h-[500px]   overflow-y-scroll rounded-sm p-3 shadow-2xl">
      <Table>
        {/* Always render the table header */}
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

        {/* Conditionally render body or fallback row */}
        <TableBody>
          {shop?.orders?.length > 0 ? (
            shop.orders.map((order) => (
              <TableRow key={order._id || order.id}>
                <TableCell className="font-medium">
                  {order.orderId || "INV001"}
                </TableCell>
                <TableCell>{order.date || "June 23, 2025"}</TableCell>
                <TableCell>{order.paymentMethod || "Credit Card"}</TableCell>
                <TableCell>{order.status || "Delivered"}</TableCell>
                <TableCell>${order.amount || "250.00"}</TableCell>
                <TableCell className="text-primary">
                  <ArrowRight className="ml-auto" />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-6 font-semibold text-lg"
              >
                No orders yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ShopOrdersSection;
