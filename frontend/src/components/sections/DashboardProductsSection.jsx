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
import { getProductsByShopThunk } from "../../features/product/productSlice";
import Spinner from "../Spinner";

const DashboardProductsSection = () => {
  const { shopProducts, isLoading } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsByShopThunk());
  }, []);

  return (
    <div className="w-full h-[500px] overflow-y-scroll rounded-sm p-3 shadow-2xl">
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
                  <Edit size={20} />
                </TableCell>
                <TableCell className="text-primary">
                  <Trash2 size={20} />
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
