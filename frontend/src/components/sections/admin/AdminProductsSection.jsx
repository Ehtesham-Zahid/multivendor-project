import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/table";
import { Edit, Eye, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductThunk,
  getProductsByShopThunk,
} from "../../../features/product/productSlice";
import Spinner from "../../Spinner";
import { toast } from "react-toastify";
import UpdateProductDialog from "../../updateProductDialog";
import { Link } from "react-router";

const AdminProductsSection = () => {
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
                  {`PRD00${index + 1}`}
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

export default AdminProductsSection;
