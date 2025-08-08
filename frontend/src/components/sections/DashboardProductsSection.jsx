import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/table";
import { Edit, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductThunk,
  getProductsByShopThunk,
} from "../../features/product/productSlice";
import Spinner from "../Spinner";
import { toast } from "react-toastify";
import UpdateProductDialog from "../updateProductDialog";

const DashboardProductsSection = () => {
  const { shopProducts, isLoading, error } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsByShopThunk());
  }, []);

  const deleteProductHandler = async (id) => {
    const resultAction = await dispatch(deleteProductThunk(id));

    if (deleteProductThunk.fulfilled.match(resultAction)) {
      toast.success("Product Deleted Successfully!");
    } else {
      toast.error(error);
    }
  };

  return (
    <div className="w-full min-h-[500px] overflow-y-scroll rounded-sm p-3 shadow-2xl">
      <Table>
        <TableHeader>
          <TableRow className="text-primary">
            <TableHead className="w-[100px]">PRODUCT ID</TableHead>
            <TableHead>NAME</TableHead>
            <TableHead>PRICE</TableHead>
            <TableHead>STOCK</TableHead>
            <TableHead>SOLD</TableHead>
            <TableHead>Edit</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <div className="w-full h-full flex justify-center items-center">
              <Spinner />
            </div>
          ) : shopProducts?.length > 0 ? (
            shopProducts.map((product) => (
              <TableRow key={product._id || product.id}>
                <TableCell className="font-medium">
                  {product._id || "PRD001"}
                </TableCell>
                <TableCell>{product.name || "Product Name"}</TableCell>
                <TableCell>${product.price || "0.00"}</TableCell>
                <TableCell>{product.stock || "0"}</TableCell>
                <TableCell>{product.sold || "0"}</TableCell>
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
              <TableCell colSpan={7} className="text-center py-4 font-semibold">
                No products yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashboardProductsSection;
