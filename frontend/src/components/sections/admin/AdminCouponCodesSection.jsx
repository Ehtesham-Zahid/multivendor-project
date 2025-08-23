import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/table";
import { Eye, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Spinner from "../../Spinner";
import { Link } from "react-router";
import LimitSelector from "../../LimitSelector";
import { Badge } from "@/shadcn/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shadcn/pagination";

import CouponCodeFilterSelector from "../../CouponCodeFilterSelector";
import {
  deleteCouponThunk,
  getAllCouponsAdminThunk,
} from "../../../features/coupon/couponSlice";
import CreateCouponCodeDialog from "../../CreateCouponCodeDialog";
import { toast } from "react-toastify";

const AdminCouponCodesSection = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const {
    coupons,
    getAllCouponsAdminLoading,
    totalCouponsPages,
    totalCoupons,
    error,
    deleteCouponLoading,
  } = useSelector((state) => state.coupon);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getAllCouponsAdminThunk({
        page,
        limit,
        status: "",
      })
    );
  }, [dispatch, page, limit]);

  const deleteCouponCodeHandler = async (id) => {
    if (!id) {
      toast.error("Invalid coupon ID");
      return;
    }

    const resultAction = await dispatch(deleteCouponThunk(id));
    if (deleteCouponThunk.fulfilled.match(resultAction)) {
      toast.success("Coupon Code Deleted Successfully!");
    } else {
      const errorMessage =
        resultAction.payload || "Failed to delete coupon code";
      toast.error(errorMessage);
    }
  };

  const handleCouponCodeStatusChange = (value) => {
    if (!value) return;

    if (value === "all") {
      dispatch(
        getAllCouponsAdminThunk({
          page: 1,
          limit,
          status: "",
        })
      );
    } else {
      dispatch(
        getAllCouponsAdminThunk({
          status: value,
          page: 1,
          limit,
        })
      );
    }
    setPage(1); // Reset to first page when changing status
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <p className="text-2xl sm:text-3xl font-bold mb-3">All Coupon Codes</p>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <CouponCodeFilterSelector
            handleCouponCodeStatusChange={handleCouponCodeStatusChange}
          />
          <CreateCouponCodeDialog />
        </div>
      </div>
      <div className="w-full min-h-[500px] overflow-y-scroll rounded-sm  shadow-2xl ">
        <Table>
          <TableHeader className="bg-primary rounded-md">
            <TableRow className="text-white">
              <TableHead className="w-[100px]">COUPON ID</TableHead>
              <TableHead>COUPON CODE</TableHead>
              <TableHead>DISCOUNT PERCENTAGE</TableHead>
              <TableHead>MINIMUM CART AMOUNT</TableHead>
              <TableHead className="">USAGE LIMIT</TableHead>
              <TableHead className="">USED COUNT</TableHead>
              <TableHead className="">START DATE</TableHead>
              <TableHead className="">END DATE</TableHead>
              <TableHead className="">STATUS</TableHead>
              <TableHead>DELETE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getAllCouponsAdminLoading || deleteCouponLoading ? (
              <TableRow>
                <TableCell
                  colSpan={11}
                  className="text-center py-6 font-semibold text-md pt-48"
                >
                  <Spinner />
                </TableCell>
              </TableRow>
            ) : coupons && Array.isArray(coupons) && coupons.length > 0 ? (
              coupons.map((couponCode, index) => (
                <TableRow key={couponCode._id || couponCode.id || index}>
                  <TableCell className="font-medium">
                    {`COPN${1000 + index + 1 + (page - 1) * limit}`}
                  </TableCell>
                  <TableCell className="capitalize">
                    {couponCode?.code || "Coupon Code"}
                  </TableCell>
                  <TableCell>
                    {couponCode?.discountPercentage || "0"}%
                  </TableCell>
                  <TableCell className="">
                    ${couponCode?.minCartAmount || "0"}
                  </TableCell>
                  <TableCell className="">
                    {couponCode?.usageLimit || "0"}
                  </TableCell>
                  <TableCell className="">
                    {couponCode?.usedCount || "0"}
                  </TableCell>
                  <TableCell className="">
                    {couponCode?.startDate
                      ? new Date(couponCode.startDate).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell className="">
                    {couponCode?.endDate
                      ? new Date(couponCode.endDate).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell className="">
                    <Badge
                      variant={"outline"}
                      className={`text-white ${
                        couponCode?.isActive ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {couponCode?.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-red-500 cursor-pointer">
                    <Trash2
                      size={20}
                      className="cursor-pointer"
                      onClick={() => deleteCouponCodeHandler(couponCode?._id)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={11}
                  className="text-center py-4 font-semibold"
                >
                  No coupon codes yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center mt-4 w-full">
        {totalCoupons && totalCoupons > 10 && (
          <div className="flex items-center gap-2 text-sm w-fit">
            <span>Show</span>
            <LimitSelector
              setLimit={setLimit}
              defaultValue={limit}
              setPage={setPage}
            />
            <span className="text-sm flex items-center text-nowrap">
              entries of {totalCoupons || 0} total coupon codes
            </span>
          </div>
        )}
        {totalCouponsPages && totalCouponsPages > 1 && (
          <div className="flex justify-center items-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  />
                </PaginationItem>
                {Array.from({ length: totalCouponsPages || 1 }, (_, index) => (
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
                        Math.min(prev + 1, totalCouponsPages || 1)
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

export default AdminCouponCodesSection;
