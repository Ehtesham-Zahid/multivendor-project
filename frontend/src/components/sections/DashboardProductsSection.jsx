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
import { useSelector } from "react-redux";

const DashboardProductsSection = () => {
  const { shop } = useSelector((state) => state.shop);

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
          {shop?.products?.length > 0 ? (
            shop.products.map((product) => (
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
