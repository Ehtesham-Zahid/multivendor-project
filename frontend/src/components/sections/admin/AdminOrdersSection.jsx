import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/table";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminOrdersThunk } from "../../../features/order/orderSlice";
import Spinner from "../../Spinner";
import { formatDate } from "../../../utils";
import { Link } from "react-router";
import DeliveryFilterSelector from "../../DeliveryFilterSelector";
import { Badge } from "../../../shadcn/badge";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../shadcn/pagination";
import LimitSelector from "../../LimitSelector";

const AdminOrdersSection = () => {
  const [limit, setLimit] = useState("10");
  const [page, setPage] = useState(1);
  const {
    adminOrders,
    isAdminOrdersLoading,
    totalAdminOrdersPages,
    totalAdminOrders,
  } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getAdminOrdersThunk({
        deliveryStatus: "",
        page,
        limit,
      })
    );
  }, [dispatch, page, limit]);

  const handleDeliveryStatusChange = (value) => {
    if (value === "all") {
      dispatch(
        getAdminOrdersThunk({
          deliveryStatus: "",
          page: 1,
          limit,
        })
      );
    } else {
      dispatch(
        getAdminOrdersThunk({
          deliveryStatus: value,
          page: 1,
          limit,
        })
      );
    }
  };

  return (
    <>
      <div className="flex justify-between items-center ">
        <p className="text-2xl sm:text-3xl font-bold ">All Orders</p>
        <DeliveryFilterSelector
          handleDeliveryStatusChange={handleDeliveryStatusChange}
        />
      </div>
      <div className="w-full min-h-[450px]    overflow-y-scroll rounded-sm shadow-2xl  ">
        <Table>
          {/* Always render the table header */}
          <TableHeader className="bg-primary rounded-md">
            <TableRow className="text-white">
              <TableHead className="w-[100px]">ORDER ID</TableHead>
              <TableHead>Shop Name</TableHead>
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
            {isAdminOrdersLoading ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-6 font-semibold text-md pt-48"
                >
                  <Spinner />
                </TableCell>
              </TableRow>
            ) : adminOrders?.length > 0 ? (
              adminOrders.map((order, index) => (
                <TableRow key={order._id || order.id}>
                  <TableCell className="font-medium">
                    {`SCO${1000 + index + 1 + (page - 1) * limit}`}
                  </TableCell>
                  <TableCell className="capitalize">
                    <Link
                      to={`/dashboard/shop/${order?.shopId?._id}`}
                      className="text-primary hover:underline capitalize font-medium"
                    >
                      {order?.shopId?.shopName}
                    </Link>
                  </TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell className="capitalize">
                    {order?.parentOrderId?.paymentMethod}
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
                      {order?.paymentStatus}
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
                      {order?.deliveryStatus}
                    </Badge>
                    {/* {order?.deliveryStatus} */}
                  </TableCell>
                  <TableCell>${order?.subtotal}</TableCell>
                  <TableCell className="text-primary">
                    <Link to={`/admin/order/${order._id}?page=orders`}>
                      <ArrowRight className="ml-auto" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-6 font-semibold text-md"
                >
                  No orders yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center mt-4 w-full">
        {totalAdminOrders > 10 && (
          <div className="flex items-center gap-2 text-sm w-fit">
            <span>Show</span>
            <LimitSelector
              setLimit={setLimit}
              defaultValue={limit}
              setPage={setPage}
            />
            <span className="text-sm flex items-center text-nowrap">
              entries of {totalAdminOrders} total orders
            </span>
          </div>
        )}
        {totalAdminOrdersPages > 1 && (
          <div className="flex justify-center items-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  />
                </PaginationItem>
                {Array.from({ length: totalAdminOrdersPages }, (_, index) => (
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
                        Math.min(prev + 1, totalAdminOrdersPages)
                      )
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminOrdersSection;
