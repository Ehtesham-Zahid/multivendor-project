import React, { useEffect, useState } from "react";
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
  getShopOrderByIdThunk,
  requestRefundThunk,
} from "../../features/order/orderSlice";
import { Link, useParams } from "react-router";
import { Button } from "../../shadcn/button";
import { ArrowLeftIcon, Edit, Loader2, Plus } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router";
import DeliveryStatusSelector from "../DeliveryStatusSelector";
import RefundStatusSelector from "../RefundStatusSelector";
import CreateReviewDialog from "../CreateReviewDialog";
import EditReviewDialog from "../EditReviewDialog";

const SingleOrderSection = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  const { orderId } = useParams();

  const { singleOrder, isLoading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getShopOrderByIdThunk(orderId));
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
        <div className="flex justify-center items-center h-full mt-52">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="w-full min-h-[500px] overflow-y-scroll rounded-sm shadow-2xl">
            <Link
              onClick={() => navigate(-1)}
              className="text-primary underline font-bold flex items-center   gap-1 mb-3 ml-2"
            >
              <ArrowLeftIcon className="w-5 h-5 " /> Back
            </Link>
            <Table>
              <TableHeader className="bg-primary ">
                <TableRow className="text-white">
                  <TableHead>PRODUCT</TableHead>
                  <TableHead>QUANTITY</TableHead>
                  <TableHead>PRICE</TableHead>
                  <TableHead>TOTAL</TableHead>
                  {singleOrder?.deliveryStatus === "delivered" &&
                    page !== "orders" &&
                    page !== "refunds" && <TableHead>REVIEW</TableHead>}
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
                      <Link to={`/product/${item.productId._id}`}>
                        {item.productId.name}
                      </Link>
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell className="capitalize">{item.price}</TableCell>
                    <TableCell className="capitalize">
                      {item.price * item.quantity}
                    </TableCell>
                    {singleOrder?.deliveryStatus === "delivered" &&
                    page !== "orders" &&
                    page !== "refunds" ? (
                      item?.productId?.reviews?.find(
                        (review) => review?.userId === user?._id
                      ) ? (
                        <TableCell>
                          <EditReviewDialog
                            review={item?.productId?.reviews?.find(
                              (review) => review?.userId === user?._id
                            )}
                            trigger={
                              <Button className="bg-dark text-white hover:bg-dark/80 cursor-pointer">
                                Edit Review <Edit />
                              </Button>
                            }
                            orderId={orderId}
                          />
                        </TableCell>
                      ) : (
                        <TableCell>
                          <CreateReviewDialog
                            productId={item?.productId?._id}
                            shopId={item?.productId?.shopId}
                            orderId={orderId}
                            trigger={
                              <Button className="bg-dark text-white hover:bg-dark/80 cursor-pointer">
                                Write a Review <Plus />
                              </Button>
                            }
                          />
                        </TableCell>
                      )
                    ) : null}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
            <div className="flex flex-col gap-3 bg-zinc-300 p-4 rounded-md">
              {" "}
              <div className="flex flex-col gap-1">
                <p className="font-bold">SHOP DETAILS</p>
                <p className="capitalize">{singleOrder?.shopId?.shopName}</p>
                <p className="capitalize">{singleOrder?.shopId?.phoneNumber}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-bold">USER DETAILS</p>
                <p>{singleOrder?.parentOrderId?.shippingAddress?.fullName}</p>
                <p>
                  {singleOrder?.parentOrderId?.shippingAddress?.phoneNumber}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-bold">SHIPPING ADDRESS</p>
                <p>
                  {singleOrder?.parentOrderId?.shippingAddress?.addressDetails}
                </p>
                <div className="flex flex-row gap-2">
                  <p>{singleOrder?.parentOrderId?.shippingAddress?.city}</p>
                  <p>{singleOrder?.parentOrderId?.shippingAddress?.state}</p>
                  <p>{singleOrder?.parentOrderId?.shippingAddress?.zipCode}</p>
                  <p>{singleOrder?.parentOrderId?.shippingAddress?.country}</p>
                </div>
              </div>
            </div>
            <div className="flex lg:gap-2 bg-zinc-300 p-4 rounded-md justify-between flex-col gap-5">
              <div className="flex justify-between w-full">
                <div className="flex gap-1 items-center">
                  <p className="font-semibold text-zinc-600 text-md">
                    Total Amount:
                  </p>
                  <p className="text-lg text-black  font-bold capitalize">
                    ${singleOrder?.subtotal}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <p className="font-semibold text-zinc-600 text-md">
                    Payment Status:
                  </p>
                  <p className="text-lg text-black font-bold capitalize">
                    {singleOrder?.paymentStatus}
                  </p>
                </div>
              </div>
              {user?.role === "admin" ? (
                <div className="flex justify-between w-full">
                  <div className="flex gap-1 items-center">
                    <p className="font-semibold text-zinc-600 text-md">
                      Delivery Status:
                    </p>
                    <p className="text-lg text-black  font-bold capitalize">
                      {singleOrder?.deliveryStatus}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <p className="font-semibold text-zinc-600 text-md">
                      Refund Status:
                    </p>
                    <p className="text-lg text-black font-bold capitalize">
                      {singleOrder?.refundStatus}
                    </p>
                  </div>
                </div>
              ) : page === "refunds" ? (
                <div className="flex justify-between">
                  <RefundStatusSelector
                    currentStatus={singleOrder?.refundStatus}
                    shopOrderId={singleOrder?._id}
                  />
                </div>
              ) : page === "orders" ? (
                <div className="flex justify-between">
                  <DeliveryStatusSelector
                    currentStatus={singleOrder?.deliveryStatus}
                    shopOrderId={singleOrder?._id}
                  />
                </div>
              ) : (
                <div className="flex justify-between">
                  <Button className="bg-primary    text-white hover:bg-primary/80 cursor-pointer">
                    Contact Seller
                  </Button>
                  {singleOrder?.paymentStatus === "paid" ? (
                    singleOrder?.refundStatus === "none" ? (
                      <Button
                        className="bg-danger text-white hover:bg-red-600 cursor-pointer"
                        onClick={handleRequestRefund}
                      >
                        {isLoading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <p>Request a Refund</p>
                        )}
                      </Button>
                    ) : (
                      <Button
                        className="bg-danger text-white hover:bg-red-600 cursor-pointer"
                        disabled={true}
                      >
                        <p>Refund Status: {singleOrder?.refundStatus}</p>
                      </Button>
                    )
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SingleOrderSection;
