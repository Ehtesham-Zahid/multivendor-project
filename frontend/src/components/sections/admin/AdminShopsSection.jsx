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
import { getAllShopsThunk } from "../../../features/shop/shopSlice";
import Spinner from "../../Spinner";
import { formatDate } from "../../../utils";
import { Link } from "react-router";
import ShopFilterSelector from "../../ShopFilterSelector";
import LimitSelector from "../../LimitSelector";
import { Badge } from "../../../shadcn/badge";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../shadcn/pagination";

const AdminShopsSection = () => {
  const [limit, setLimit] = useState("10");
  const [page, setPage] = useState(1);
  const { shops, isLoading, totalPages, totalShops } = useSelector(
    (state) => state.shop
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getAllShopsThunk({
        onlyActive: "",
        page,
        limit,
      })
    );
  }, [dispatch, page, limit]);

  const handleShopStatusChange = (value) => {
    if (value === "all") {
      dispatch(
        getAllShopsThunk({
          onlyActive: "",
          page: 1,
          limit,
        })
      );
    } else {
      dispatch(
        getAllShopsThunk({
          onlyActive: value,
          page: 1,
          limit,
        })
      );
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-2xl sm:text-3xl font-bold mb-3">All Shops</p>
        <ShopFilterSelector handleShopStatusChange={handleShopStatusChange} />
      </div>
      <div className="w-full min-h-[450px]    overflow-y-scroll rounded-sm shadow-2xl  ">
        <Table>
          {/* Always render the table header */}
          <TableHeader className="bg-primary rounded-md">
            <TableRow className="text-white">
              <TableHead className="w-[100px]">SHOP ID</TableHead>
              <TableHead>Shop Name</TableHead>
              <TableHead>Joined On</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total Revenue</TableHead>
              <TableHead className="text-right">See Details</TableHead>
            </TableRow>
          </TableHeader>

          {/* Conditionally render body or fallback row */}
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
            ) : shops?.length > 0 ? (
              shops.map((shop, index) => (
                <TableRow key={shop._id || shop.id}>
                  <TableCell className="font-medium">
                    {`SHOP${1000 + index + 1 + (page - 1) * limit}`}
                  </TableCell>
                  <TableCell className="capitalize">
                    <Link
                      to={`/dashboard/shop/${shop?._id}`}
                      className="text-primary hover:underline capitalize font-medium"
                    >
                      {shop?.shopName}
                    </Link>
                  </TableCell>
                  <TableCell>{formatDate(shop.createdAt)}</TableCell>
                  <TableCell className="capitalize">
                    <Badge
                      variant="default"
                      className={`text-white   capitalize ${
                        shop?.isActive ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {shop?.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>${shop?.totalRevenue.toFixed(2)}</TableCell>
                  <TableCell className="text-primary">
                    <Link to={`/dashboard/shop/${shop._id}?page=shops`}>
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
                  No shops yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center mt-4 w-full">
        {totalShops > 10 && (
          <div className="flex items-center gap-2 text-sm w-fit">
            <span>Show</span>
            <LimitSelector
              setLimit={setLimit}
              defaultValue={limit}
              setPage={setPage}
            />
            <span className="text-sm flex items-center text-nowrap">
              entries of {totalShops} total shops
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
    </>
  );
};

export default AdminShopsSection;
