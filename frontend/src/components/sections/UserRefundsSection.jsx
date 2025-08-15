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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getShopOrdersThunk,
  getUserShopOrdersThunk,
} from "../../features/order/orderSlice";
import Spinner from "../Spinner";
import { formatDate } from "../../utils";
import { Link } from "react-router";
import RefundFilterSelector from "../RefundFilterSelector";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../shadcn/pagination";
import LimitSelector from "../LimitSelector";
import { Badge } from "../../shadcn/badge";

const UserRefundsSection = () => {
  const { refundOrders, isLoading, totalShopOrders, totalPages } = useSelector(
    (state) => state.order
  );

  const [limit, setLimit] = useState("10");
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getUserShopOrdersThunk({
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
        getUserShopOrdersThunk({
          refundOnly: true,
          refundStatus: "",
          page: 1,
          limit,
        })
      );
    } else {
      dispatch(
        getUserShopOrdersThunk({
          refundOnly: true,
          refundStatus: value,
          page: 1,
          limit,
        })
      );
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <p className="text-2xl sm:text-3xl font-bold mb-3">All Refunds</p>
        <RefundFilterSelector
          handleRefundStatusChange={handleRefundStatusChange}
        />
      </div>
      <p className="text-2xl font-bold text-dark md:hidden">My Refunds</p>
      <div className="w-full  min-h-[450px]  overflow-y-scroll rounded-sm shadow-2xl">
        <Table>
          <TableHeader className="bg-primary rounded-md">
            <TableRow className="text-white">
              <TableHead className="w-[100px]">REFUND ID</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>PAYMENT METHOD</TableHead>
              <TableHead>Refund STATUS</TableHead>
              <TableHead>TOTAL AMOUNT</TableHead>
              <TableHead className="text-right">See Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-6 font-semibold text-md pt-48"
                >
                  <Spinner />
                </TableCell>
              </TableRow>
            ) : refundOrders?.length > 0 ? (
              refundOrders?.map((order, index) => (
                <TableRow key={order._id} className="capitalize">
                  <TableCell className="font-medium">
                    {`SCR${1000 + index + 1 + (page - 1) * limit}`}
                  </TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>
                    {order?.parentOrderId?.paymentMethod || "COD"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${order?.refundStatus === "refunded" ? "bg-green-500" : order?.refundStatus === "requested" ? "bg-yellow-500" : "bg-red-500"} text-white`}
                    >
                      {order?.refundStatus || "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell>${order?.subtotal || "250.00"}</TableCell>
                  <TableCell>
                    <Link to={`/profile/order/${order._id}`}>
                      <ArrowRight className="ml-auto text-primary" />
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
                  No refunds found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center mt-4 w-full">
        {totalShopOrders > 10 && (
          <div className="flex items-center gap-2 text-sm w-fit">
            <span>Show</span>
            <LimitSelector
              setLimit={setLimit}
              defaultValue={limit}
              setPage={setPage}
            />
            <span className="text-sm flex items-center text-nowrap">
              entries of {totalShopOrders} total refunds
            </span>
          </div>
        )}
        {totalPages > 1 && (
          <div className="flex justify-center items-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, index) => (
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
                      setPage((prev) => Math.min(prev + 1, totalPages))
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

export default UserRefundsSection;
