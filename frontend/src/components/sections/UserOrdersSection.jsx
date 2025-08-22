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
import { getUserOrdersThunk } from "../../features/order/orderSlice";
import { formatDate } from "../../utils";
import Spinner from "../Spinner";
import { Link } from "react-router";
import { Badge } from "../../shadcn/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../shadcn/pagination";
import LimitSelector from "../LimitSelector";
import DeliveryFilterSelector from "../DeliveryFilterSelector";

const UserOrdersSection = () => {
  const {
    userOrders,
    isUserOrdersLoading,
    totalUserOrdersPages,
    totalUserOrders,
  } = useSelector((state) => state.order);

  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [limit, setLimit] = useState("10");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrdersThunk({ page, limit, deliveryStatus: "" }));
  }, [dispatch, page, limit]);

  const toggleExpand = (orderId) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const handleDeliveryStatusChange = (value) => {
    if (value === "all") {
      dispatch(
        getUserOrdersThunk({
          deliveryStatus: "",
          page: 1,
          limit,
        })
      );
    } else {
      dispatch(
        getUserOrdersThunk({
          deliveryStatus: value,
          page: 1,
          limit,
        })
      );
    }
  };
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3 sm:mb-0">
        <p className="text-2xl sm:text-3xl font-bold mb-3">All Orders</p>
        <DeliveryFilterSelector
          handleDeliveryStatusChange={handleDeliveryStatusChange}
        />
      </div>
      <div className="w-full min-h-[450px]  overflow-y-scroll rounded-sm shadow-2xl">
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
            {isUserOrdersLoading ? (
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
                      {`SCO${1000 + index + 1 + (page - 1) * limit}`}
                    </TableCell>
                    <TableCell>{formatDate(order.createdAt)}</TableCell>
                    <TableCell className="capitalize">
                      {order.paymentMethod || "COD"}
                    </TableCell>
                    <TableCell className="capitalize">
                      <Badge
                        variant="default"
                        className={`text-white   capitalize ${
                          order?.paymentStatus === "pending"
                            ? "bg-yellow-500"
                            : order?.paymentStatus === "paid"
                              ? "bg-green-500"
                              : "bg-red-500"
                        }`}
                      >
                        {order.paymentStatus || "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell className="capitalize">
                      <Badge
                        variant="default"
                        className={`text-white   capitalize ${
                          order?.deliveryStatus === "pending"
                            ? "bg-yellow-500"
                            : order?.deliveryStatus === "delivered"
                              ? "bg-green-500"
                              : "bg-red-500"
                        }`}
                      >
                        {order.deliveryStatus || "Pending"}
                      </Badge>
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
                            <Badge
                              variant="default"
                              className={`text-white   capitalize ${
                                shopOrder?.paymentStatus === "pending"
                                  ? "bg-yellow-500"
                                  : shopOrder?.paymentStatus === "paid"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                              }`}
                            >
                              {shopOrder.paymentStatus}
                            </Badge>
                          </TableCell>
                          <TableCell className="capitalize">
                            <Badge
                              variant="default"
                              className={`text-white   capitalize ${
                                shopOrder?.deliveryStatus === "pending"
                                  ? "bg-yellow-500"
                                  : shopOrder?.deliveryStatus === "delivered"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                              }`}
                            >
                              {shopOrder.deliveryStatus || "Pending"}
                            </Badge>
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
      <div className="flex flex-col sm:flex-row gap-5 justify-between items-center mt-4 w-full">
        {totalUserOrders > 10 && (
          <div className="flex items-center gap-2 text-sm w-fit">
            <span>Show</span>
            <LimitSelector
              setLimit={setLimit}
              defaultValue={limit}
              setPage={setPage}
            />
            <span className="text-sm flex items-center text-nowrap">
              entries of {totalUserOrders} total orders
            </span>
          </div>
        )}
        {totalUserOrdersPages > 1 && (
          <div className="flex justify-center items-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  />
                </PaginationItem>
                {Array.from({ length: totalUserOrdersPages }, (_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      onClick={() => setPage(index + 1)}
                      className={page === index + 1 ? "active" : ""}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() =>
                      setPage((prev) =>
                        Math.min(prev + 1, totalUserOrdersPages)
                      )
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrdersSection;
