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
import { getAdminRefundsThunk } from "../../../features/order/orderSlice";
import Spinner from "../../Spinner";
import { formatDate } from "../../../utils";
import { Link } from "react-router";
import RefundFilterSelector from "../../RefundFilterSelector";
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

const AdminRefundsSection = () => {
  const [limit, setLimit] = useState("10");
  const [page, setPage] = useState(1);
  const {
    adminRefunds,
    isAdminRefundsLoading,
    totalAdminRefundsPages,
    totalAdminRefunds,
  } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getAdminRefundsThunk({
        refundOnly: true,
        refundStatus: "",
        page,
        limit,
      })
    );
  }, [dispatch, page, limit]);

  const handleRefundStatusChange = (value) => {
    if (value === "all") {
      dispatch(
        getAdminRefundsThunk({
          refundOnly: true,
          refundStatus: "",
          page: 1,
          limit,
        })
      );
    } else {
      dispatch(
        getAdminRefundsThunk({
          refundOnly: true,
          refundStatus: value,
          page: 1,
          limit,
        })
      );
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-2xl sm:text-3xl font-bold mb-3">All Refunds</p>
        <RefundFilterSelector
          handleRefundStatusChange={handleRefundStatusChange}
        />
      </div>
      <div className="w-full min-h-[450px]    overflow-y-scroll rounded-sm shadow-2xl  ">
        <Table>
          {/* Always render the table header */}
          <TableHeader className="bg-primary rounded-md">
            <TableRow className="text-white">
              <TableHead className="w-[100px]">REFUND ID</TableHead>
              <TableHead>Shop Name</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>PAYMENT METHOD</TableHead>
              <TableHead>Refund STATUS</TableHead>
              <TableHead>TOTAL AMOUNT</TableHead>
              <TableHead className="text-right">See Details</TableHead>
            </TableRow>
          </TableHeader>

          {/* Conditionally render body or fallback row */}
          <TableBody>
            {isAdminRefundsLoading ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-6 font-semibold text-md pt-48"
                >
                  <Spinner />
                </TableCell>
              </TableRow>
            ) : adminRefunds?.length > 0 ? (
              adminRefunds.map((order, index) => (
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
                        order?.refundStatus === "requested"
                          ? "bg-yellow-500"
                          : order?.refundStatus === "refunded"
                            ? "bg-green-500"
                            : "bg-red-500"
                      }`}
                    >
                      {order?.refundStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>${order?.subtotal}</TableCell>
                  <TableCell className="text-primary">
                    <Link to={`/dashboard/order/${order._id}?page=orders`}>
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
                  No refunds yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center mt-4 w-full">
        {totalAdminRefunds > 10 && (
          <div className="flex items-center gap-2 text-sm w-fit">
            <span>Show</span>
            <LimitSelector
              setLimit={setLimit}
              defaultValue={limit}
              setPage={setPage}
            />
            <span className="text-sm flex items-center text-nowrap">
              entries of {totalAdminRefunds} total refunds
            </span>
          </div>
        )}
        {totalAdminRefundsPages > 1 && (
          <div className="flex justify-center items-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  />
                </PaginationItem>
                {Array.from({ length: totalAdminRefundsPages }, (_, index) => (
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
                        Math.min(prev + 1, totalAdminRefundsPages)
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

export default AdminRefundsSection;
