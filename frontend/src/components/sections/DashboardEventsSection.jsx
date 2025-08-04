import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/table";
import {
  ArrowLeft,
  ArrowRight,
  Delete,
  Edit,
  Edit2,
  Edit3,
  FileEdit,
  ShoppingBasket,
  Trash,
  Trash2,
} from "lucide-react";
import { getProductsByShopThunk } from "../../features/product/productSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const DashboardEventsSection = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsByShopThunk());
  }, []);

  return (
    <div className="w-full h-[500px]  overflow-y-scroll rounded-sm p-3 shadow-2xl">
      <Table>
        <TableHeader>
          <TableRow className="text-primary">
            <TableHead className="w-[100px]">EVENT ID</TableHead>
            <TableHead>NAME</TableHead>
            <TableHead>PRICE</TableHead>
            <TableHead>STOCK</TableHead>
            <TableHead>SOLD</TableHead>
            <TableHead>Edit</TableHead>
            <TableHead>Delete</TableHead>
            {/* <TableHead className="text-right">See Details</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>June 23, 2025</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Delivered</TableCell>
            <TableCell>$250.00</TableCell>{" "}
            <TableCell className="text-primary">
              <Edit className="" size={20} />
            </TableCell>
            <TableCell className="text-primary">
              <Trash2 className="" size={20} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>June 23, 2025</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Dispatched</TableCell>
            <TableCell>$250.00</TableCell>
            <TableCell className="text-primary">
              <Edit className="" size={20} />
            </TableCell>
            <TableCell className="text-primary">
              <Trash2 className="" size={20} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default DashboardEventsSection;
