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
import {
  getShopOrdersByCurrentShopThunk,
  getShopOrdersThunk,
} from "../../features/order/orderSlice";
import Spinner from "../Spinner";
import { formatDate } from "../../utils";
import { Link } from "react-router";

const DashboardOrdersSection = () => {
  // const { shop } = useSelector((state) => state.shop);
  const { shopOrders, isLoading } = useSelector((state) => state.order);

  const { currentUserShop } = useSelector((state) => state.shop);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShopOrdersByCurrentShopThunk());
  }, [dispatch]);

  return (
    <div className="w-full min-h-[500px]    overflow-y-scroll rounded-sm shadow-2xl  ">
      <Table>
        {/* Always render the table header */}
        <TableHeader className="bg-primary rounded-md">
          <TableRow className="text-white">
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
                colSpan={7}
                className="text-center py-6 font-semibold text-md pt-48"
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
                  {order?.parentOrderId?.paymentMethod}
                </TableCell>
                <TableCell className="capitalize">
                  {order?.paymentStatus}
                </TableCell>
                <TableCell className="capitalize">
                  {order?.deliveryStatus}
                </TableCell>
                <TableCell>${order?.subtotal}</TableCell>
                <TableCell className="text-primary">
                  <Link to={`/dashboard/order/${order._id}`}>
                    <ArrowRight className="ml-auto" />
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
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

export default DashboardOrdersSection;
