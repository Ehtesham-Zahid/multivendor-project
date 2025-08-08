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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShopOrdersThunk } from "../../features/order/orderSlice";
import Spinner from "../Spinner";
import { formatDate } from "../../utils";

const ShopOrdersSection = () => {
  // const { shop } = useSelector((state) => state.shop);
  const { shopOrders, isLoading } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShopOrdersThunk());
  }, []);

  return (
    <div className="w-full min-h-[500px]   overflow-y-scroll rounded-sm p-3 shadow-2xl">
      <Table>
        {/* Always render the table header */}
        <TableHeader>
          <TableRow className="text-primary">
            <TableHead className="w-[100px]">ORDER ID</TableHead>
            <TableHead>DATE</TableHead>
            <TableHead>PAYMENT METHOD</TableHead>
            <TableHead>PAYMENT STATUS</TableHead>
            <TableHead>DELIVERY STATUS</TableHead>
            <TableHead>TOTAL AMOUNT</TableHead>
            <TableHead className="text-right">See Details</TableHead>
          </TableRow>
        </TableHeader>

        {/* Conditionally render body or fallback row */}
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-6 font-semibold text-md"
              >
                <Spinner />
              </TableCell>
            </TableRow>
          ) : shopOrders?.length > 0 ? (
            shopOrders.map((order, index) => (
              <TableRow key={order._id || order.id}>
                <TableCell className="font-medium">
                  {`SCO${1000 + index + 1}`}
                </TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell className="capitalize">
                  {order.paymentMethod || "COD"}
                </TableCell>
                <TableCell className="capitalize">
                  {order.paymentStatus || "Pending"}
                </TableCell>
                <TableCell className="capitalize">
                  {order.deliveryStatus || "Pending"}
                </TableCell>
                <TableCell>${order.totalAmount || "250.00"}</TableCell>
                <TableCell className="text-primary">
                  <ArrowRight className="ml-auto" />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-6 font-semibold text-md"
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
