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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserOrdersThunk } from "../../features/order/orderSlice";
import { formatDate } from "../../utils";
import Spinner from "../Spinner";
import { Link } from "react-router";

const UserOrdersSection = () => {
  const { userOrders, isLoading } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrdersThunk());
  }, []);

  return (
    <div className="w-full min-h-[500px]  overflow-y-scroll rounded-sm p-3 shadow-2xl">
      <Table>
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
        <TableBody>
          {isLoading ? (
            <Spinner />
          ) : userOrders?.length > 0 ? (
            userOrders?.map((order, index) => (
              <TableRow key={order._id}>
                <TableCell className="font-medium">
                  {" "}
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
                  <Link to={`/profile/order/${order._id}`}>
                    <ArrowRight className="ml-auto" />
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-6 font-semibold text-md"
              >
                No orders found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserOrdersSection;
