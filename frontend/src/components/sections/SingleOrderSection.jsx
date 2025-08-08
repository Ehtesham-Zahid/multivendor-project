import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/table";
import Spinner from "../Spinner";
import { useSelector, useDispatch } from "react-redux";
import {
  getOrderThunk,
  requestRefundThunk,
} from "../../features/order/orderSlice";
import { useParams } from "react-router";
import { Button } from "../../shadcn/button";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const SingleOrderSection = () => {
  const { orderId } = useParams();
  const { singleOrder, isLoading } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderThunk(orderId));
  }, [orderId, dispatch]);

  const handleRequestRefund = async () => {
    const resultAction = await dispatch(requestRefundThunk(orderId));
    if (requestRefundThunk.fulfilled.match(resultAction)) {
      toast.success("Refund requested successfully");
    } else {
      toast.error(resultAction.payload);
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="w-full min-h-[500px] overflow-y-scroll rounded-sm p-3 shadow-2xl">
            <Table>
              <TableHeader>
                <TableRow className="text-primary">
                  <TableHead>PRODUCT</TableHead>
                  <TableHead>QUANTITY</TableHead>
                  <TableHead>PRICE</TableHead>
                  <TableHead>TOTAL</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {singleOrder?.items?.map((item) => (
                  <TableRow key={item._id || item.id}>
                    <TableCell className="font-medium flex items-center gap-2">
                      <img
                        src={item.productId.images[0]}
                        alt={item.productId.name}
                        className="w-16 h-16 object-cover rounded-sm bg-zinc-300"
                      />
                      {item.productId.name}
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell className="capitalize">{item.price}</TableCell>
                    <TableCell className="capitalize">
                      {item.price * item.quantity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-5">
            <div className="flex flex-col gap-2 bg-zinc-300 p-4 rounded-md">
              <p className="font-bold">SHIPPING ADDRESS</p>
              <p>{singleOrder?.shippingAddress?.addressDetails}</p>
              <div className="flex flex-row gap-2">
                <p>{singleOrder?.shippingAddress?.city}</p>
                <p>{singleOrder?.shippingAddress?.state}</p>
                <p>{singleOrder?.shippingAddress?.zipCode}</p>
                <p>{singleOrder?.shippingAddress?.country}</p>
              </div>
            </div>

            <div className="flex gap-2 bg-zinc-300 p-4 rounded-md justify-between">
              <div>
                <p className="font-bold">TOTAL AMOUNT</p>
                <p>${singleOrder?.totalAmount}</p>
              </div>
              <Button
                disabled={singleOrder?.refundStatus !== "none" || isLoading}
                className="bg-danger text-white hover:bg-red-600 cursor-pointer"
                onClick={handleRequestRefund}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <p>Request a Refund</p>
                )}
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SingleOrderSection;
