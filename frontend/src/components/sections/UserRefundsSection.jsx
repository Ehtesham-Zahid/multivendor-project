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
  getShopOrdersThunk,
  getUserOrdersThunk,
} from "../../features/order/orderSlice";
import Spinner from "../Spinner";
import { formatDate } from "../../utils";

const UserRefundsSection = () => {
  const dispatch = useDispatch();
  const { userOrders, isLoading } = useSelector((state) => state.order);
  const [refundOrders, setRefundOrders] = useState([]);

  useEffect(() => {
    dispatch(getUserOrdersThunk());
  }, []);

  useEffect(() => {
    setRefundOrders(
      userOrders?.filter((order) => order.refundStatus !== "none")
    );
  }, [userOrders]);

  return (
    <>
      <p className="text-2xl font-bold text-dark md:hidden">My Refunds</p>
      <div className="w-full  min-h-[500px]  overflow-y-scroll rounded-sm p-3 shadow-2xl">
        <Table>
          <TableHeader>
            <TableRow className="text-primary">
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
              <TableRow className="w-full fle justify-center items-center">
                <Spinner />
              </TableRow>
            ) : refundOrders?.length > 0 ? (
              refundOrders?.map((order, index) => (
                <TableRow key={order._id} className="capitalize">
                  <TableCell className="font-medium">
                    {`SCR${1000 + index + 1}`}
                  </TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>{order.paymentMethod || "COD"}</TableCell>
                  <TableCell>{order.refundStatus || "Pending"}</TableCell>
                  <TableCell>$250.00</TableCell>{" "}
                  <TableCell>
                    <ArrowRight className="ml-auto text-primary" />
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
    </>
  );
};

export default UserRefundsSection;
