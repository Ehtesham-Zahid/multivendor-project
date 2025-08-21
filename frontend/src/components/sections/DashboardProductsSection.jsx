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
  getProductsByShopThunk,
} from "../../features/product/productSlice";
import Spinner from "../Spinner";
import { toast } from "react-toastify";
import UpdateProductDialog from "../updateProductDialog";
import { Link } from "react-router";
import LimitSelector from "../LimitSelector";
import { Pagination } from "../../shadcn/pagination";
import { PaginationContent } from "../../shadcn/pagination";
import { PaginationItem } from "../../shadcn/pagination";
import { PaginationPrevious } from "../../shadcn/pagination";
import { PaginationNext } from "../../shadcn/pagination";
import { PaginationLink } from "../../shadcn/pagination";

const DashboardProductsSection = () => {
  const [limit, setLimit] = useState("10");
  const [page, setPage] = useState(1);
  const { shopProducts, isLoading, error, totalPages, totalProducts } =
    useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsByShopThunk({ page, limit }));
  }, [dispatch, page, limit]);

  const deleteProductHandler = async (id) => {
    const resultAction = await dispatch(deleteProductThunk(id));

    if (deleteProductThunk.fulfilled.match(resultAction)) {
      toast.success("Product Deleted Successfully!");
    } else {
      toast.error(error);
    }
  };

  return (
    <>
      <div className="w-full min-h-[500px] overflow-y-scroll rounded-sm  shadow-2xl ">
        <Table>
          <TableHeader className="bg-primary rounded-md">
            <TableRow className="text-white">
              <TableHead className="w-[100px]">PRODUCT ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>PRICE</TableHead>
              <TableHead className="text-center">STOCK</TableHead>
              <TableHead className="text-center">SOLD</TableHead>
              <TableHead className="text-center">PREVIEW</TableHead>
              <TableHead>Edit</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-6 font-semibold text-md pt-48"
                >
                  <Spinner />
                </TableCell>
              </TableRow>
            ) : shopProducts?.length > 0 ? (
              shopProducts.map((product, index) => (
                <TableRow key={product._id || product.id}>
                  <TableCell className="font-medium">
                    {`PRD${1000 + index + 1 + (page - 1) * limit}`}
                  </TableCell>
                  <TableCell>{product.name || "Product Name"}</TableCell>
                  <TableCell>${product.price || "0.00"}</TableCell>
                  <TableCell className="text-center">
                    {product.stock || "0"}
                  </TableCell>
                  <TableCell className="text-center">
                    {product.sold || "0"}
                  </TableCell>
                  <TableCell className="text-primary text-center flex justify-center items-center">
                    <Link to={`/product/${product._id}`}>
                      <Eye className="cursor-pointer" />
                    </Link>
                  </TableCell>
                  <TableCell className="text-primary">
                    <UpdateProductDialog product={product} />
                  </TableCell>
                  <TableCell className="text-primary ">
                    <Trash2
                      size={20}
                      className="cursor-pointer"
                      onClick={() => deleteProductHandler(product._id)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-4 font-semibold"
                >
                  No products yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col sm:flex-row gap-5 justify-between items-center mt-4 w-full">
        {totalProducts > 10 && (
          <div className="flex items-center gap-2 text-sm w-fit">
            <span>Show</span>
            <LimitSelector
              setLimit={setLimit}
              defaultValue={limit}
              setPage={setPage}
            />
            <span className="text-sm flex items-center text-nowrap">
              entries of {totalProducts} total products
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

export default DashboardProductsSection;
