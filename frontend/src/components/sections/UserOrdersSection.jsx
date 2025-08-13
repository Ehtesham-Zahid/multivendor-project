import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/table";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserParentOrdersThunk } from "../../features/order/orderSlice";
import { formatDate } from "../../utils";
import Spinner from "../Spinner";
import { Link } from "react-router";
import { Button } from "../../shadcn/button";

const UserOrdersSection = () => {
  const { userOrders, isLoading } = useSelector((state) => state.order);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserParentOrdersThunk());
  }, []);

  const toggleExpand = (orderId) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };
  return (
    <>
      <p className="text-2xl font-bold text-dark md:hidden">My Orders</p>
      <div className="w-full min-h-[500px]  overflow-y-scroll rounded-sm shadow-2xl">
        <Table>
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
            ) : userOrders?.length > 0 ? (
              userOrders?.map((order, index) => (
                <>
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
                      <div
                        className="cursor-pointer"
                        onClick={() => toggleExpand(order._id)}
                      >
                        {expandedOrderId === order._id ? (
                          <ArrowUp className="mx-auto" size={20} />
                        ) : (
                          <ArrowDown className="mx-auto" size={20} />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>

                  {expandedOrderId === order._id &&
                    order.shopOrders?.map((shopOrder, index) => (
                      <>
                        <TableRow key={shopOrder._id} className="bg-gray-200">
                          <TableCell className="font-medium">
                            {`SCO${index + 1}`} |{" "}
                            <Link
                              to={`/shop/${shopOrder.shopId._id}`}
                              className="text-primary font-bold text-sm hover:underline "
                            >
                              {shopOrder.shopId.shopName}
                            </Link>
                          </TableCell>
                          <TableCell>
                            {formatDate(shopOrder.createdAt)}
                          </TableCell>
                          <TableCell className="capitalize">
                            {order.paymentMethod}
                          </TableCell>
                          <TableCell className="capitalize">
                            {shopOrder.paymentStatus}
                          </TableCell>
                          <TableCell className="capitalize">
                            {shopOrder.deliveryStatus}
                          </TableCell>
                          <TableCell>${shopOrder.subtotal}</TableCell>
                          <TableCell>
                            <Link to={`/profile/order/${shopOrder._id}`}>
                              <ArrowRight className="mx-auto" size={20} />
                            </Link>
                          </TableCell>
                        </TableRow>
                      </>
                    ))}
                </>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-6 font-semibold text-md"
                >
                  No orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default UserOrdersSection;
