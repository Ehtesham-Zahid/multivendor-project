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
import {
  deleteProductThunk,
  getAllProductsAdminThunk,
} from "../../../features/product/productSlice";
import Spinner from "../../Spinner";
import { toast } from "react-toastify";
import UpdateProductDialog from "../../updateProductDialog";
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

import ProductFilterSelector from "../../ProductFilterSelector";

const AdminProductsSection = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const {
    adminProducts,
    isAllProductsAdminLoading,
    error,
    totalAdminProductsPages,
    totalAdminProducts,
  } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const deleteProductHandler = async (id) => {
    const resultAction = await dispatch(deleteProductThunk(id));

    if (deleteProductThunk.fulfilled.match(resultAction)) {
      toast.success("Product Deleted Successfully!");
    } else {
      toast.error(error);
    }
  };

  useEffect(() => {
    dispatch(
      getAllProductsAdminThunk({
        onlyActive: "",
        page,
        limit,
      })
    );
  }, [dispatch, page, limit]);

  const handleProductStatusChange = (value) => {
    if (value === "sales") {
      dispatch(
        getAllProductsAdminThunk({
          onlyActive: "",
          sortBy: "sales",
          page: 1,
          limit,
        })
      );
    } else if (value === "all") {
      dispatch(
        getAllProductsAdminThunk({
          onlyActive: "",
          page: 1,
          limit,
        })
      );
    } else if (value === "true" || value === "false") {
      dispatch(
        getAllProductsAdminThunk({
          onlyActive: value,
          page: 1,
          limit,
        })
      );
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-2xl sm:text-3xl font-bold mb-3">All Products</p>
        <ProductFilterSelector
          handleProductStatusChange={handleProductStatusChange}
        />
      </div>
      <div className="w-full min-h-[500px] overflow-y-scroll rounded-sm  shadow-2xl ">
        <Table>
          <TableHeader className="bg-primary rounded-md">
            <TableRow className="text-white">
              <TableHead className="w-[100px]">PRODUCT ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>PRICE</TableHead>
              <TableHead className="text-center">STOCK</TableHead>
              <TableHead className="text-center">SOLD</TableHead>
              <TableHead className="text-center">STATUS</TableHead>
              <TableHead className="text-center">PREVIEW</TableHead>
              <TableHead>Edit</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isAllProductsAdminLoading ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="text-center py-6 font-semibold text-md pt-48"
                >
                  <Spinner />
                </TableCell>
              </TableRow>
            ) : adminProducts?.length > 0 ? (
              adminProducts.map((product, index) => (
                <TableRow key={product._id || product.id}>
                  <TableCell className="font-medium">
                    {`PRD${1000 + index + 1 + (page - 1) * limit}`}
                  </TableCell>
                  <TableCell className="capitalize">
                    {product.name || "Product Name"}
                  </TableCell>
                  <TableCell>${product.price || "0.00"}</TableCell>
                  <TableCell className="text-center">
                    {product.stock || "0"}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={"outline"}
                      className="text-white bg-blue-500 w-10"
                    >
                      {product.sold || "0"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={"outline"}
                      className={`text-white ${
                        product.isDeleted ? "bg-red-500" : "bg-green-500"
                      }`}
                    >
                      {product.isDeleted ? "Inactive" : "Active"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-primary text-center flex justify-center items-center">
                    <Link to={`/product/${product._id}`}>
                      <Eye className="cursor-pointer" />
                    </Link>
                  </TableCell>
                  <TableCell className="text-primary">
                    <UpdateProductDialog
                      product={product}
                      disabled={product.isDeleted}
                    />
                  </TableCell>
                  <TableCell className="text-primary ">
                    {product.isDeleted ? (
                      <Trash2
                        size={20}
                        disabled={true}
                        className="cursor-not-allowed opacity-50"
                      />
                    ) : (
                      <Trash2
                        size={20}
                        className="cursor-pointer"
                        onClick={() => deleteProductHandler(product._id)}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="text-center py-4 font-semibold"
                >
                  No products yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center mt-4 w-full">
        {totalAdminProducts > 10 && (
          <div className="flex items-center gap-2 text-sm w-fit">
            <span>Show</span>
            <LimitSelector
              setLimit={setLimit}
              defaultValue={limit}
              setPage={setPage}
            />
            <span className="text-sm flex items-center text-nowrap">
              entries of {totalAdminProducts} total products
            </span>
          </div>
        )}
        {totalAdminProductsPages > 1 && (
          <div className="flex justify-center items-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  />
                </PaginationItem>
                {Array.from({ length: totalAdminProductsPages }, (_, index) => (
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
                        Math.min(prev + 1, totalAdminProductsPages)
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

export default AdminProductsSection;
