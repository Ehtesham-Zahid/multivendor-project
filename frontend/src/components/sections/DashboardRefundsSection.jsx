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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getShopOrdersByCurrentShopThunk,
  getShopOrdersThunk,
} from "../../features/order/orderSlice";
import Spinner from "../Spinner";
import { formatDate } from "../../utils";
import { Link } from "react-router";

const DashboardRefundsSection = () => {
  const dispatch = useDispatch();
  const { refundOrders, isLoading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getShopOrdersByCurrentShopThunk(true));
  }, [dispatch]);

  return (
    <>
      <p className="text-2xl font-bold text-dark md:hidden">Refunds</p>
      <div className="w-full  min-h-[500px]  overflow-y-scroll rounded-sm shadow-2xl">
        <Table>
          <TableHeader className="bg-primary rounded-md">
            <TableRow className="text-white">
              <TableHead className="w-[100px]">REFUND ID</TableHead>
              <TableHead>PAYMENT METHOD</TableHead>
              <TableHead>REFUND STATUS</TableHead>
              <TableHead>ITEMS QTY</TableHead>
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
            ) : refundOrders?.length > 0 ? (
              refundOrders?.map((order, index) => (
                <TableRow key={order._id} className="capitalize">
                  <TableCell className="font-medium">
                    {`SCR${1000 + index + 1}`}
                  </TableCell>
                  <TableCell>
                    {order?.parentOrderId?.paymentMethod || "COD"}
                  </TableCell>
                  <TableCell>{order.refundStatus || "Pending"}</TableCell>
                  <TableCell>{order?.items?.length}</TableCell>
                  <TableCell>${order?.subtotal || "250.00"}</TableCell>
                  <TableCell>
                    <Link to={`/dashboard/order/${order._id}`}>
                      <ArrowRight className="ml-auto text-primary" />
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

export default DashboardRefundsSection;
