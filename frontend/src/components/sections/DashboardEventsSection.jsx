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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteEventThunk,
  getShopEventsThunk,
} from "../../features/event/eventSlice";
import Spinner from "../Spinner";
import { toast } from "react-toastify";
import UpdateEventDialog from "../updateEventDialog";
import { formatDate } from "../../utils";

const DashboardEventsSection = () => {
  const { shopEvents, isLoading, error } = useSelector((state) => state.event);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsByShopThunk());
    dispatch(getShopEventsThunk());
  }, []);

  const handleDeleteEvent = async (id) => {
    const resultAction = await dispatch(deleteEventThunk(id));
    if (deleteEventThunk.fulfilled.match(resultAction)) {
      toast.success("Event Deleted Successfully!");
    } else {
      toast.error(error);
    }
  };

  return (
    <div className="w-full h-[500px]  overflow-y-scroll rounded-sm p-3 shadow-2xl">
      <Table>
        <TableHeader>
          <TableRow className="text-primary">
            <TableHead className="w-[100px]">EVENT ID</TableHead>
            <TableHead>EVENT NAME</TableHead>
            <TableHead>PRODUCT</TableHead>
            <TableHead>ORIGINAL PRICE</TableHead>
            <TableHead>EVENT PRICE</TableHead>
            <TableHead>START DATE</TableHead>
            <TableHead>END DATE</TableHead>
            <TableHead>Edit</TableHead>
            <TableHead>Delete</TableHead>
            {/* <TableHead className="text-right">See Details</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <div className="w-full h-full flex justify-center items-center">
              <Spinner />
            </div>
          ) : shopEvents?.length > 0 ? (
            shopEvents.map((event) => (
              <TableRow key={event._id}>
                <TableCell className="font-medium">{event._id}</TableCell>
                <TableCell>{event.name}</TableCell>
                <TableCell>{event.productId.name}</TableCell>
                <TableCell>${event.originalPrice}</TableCell>
                <TableCell>${event.eventPrice}</TableCell>
                <TableCell>{formatDate(event.startDate)}</TableCell>
                <TableCell>{formatDate(event.endDate)}</TableCell>
                <TableCell className="text-primary">
                  <UpdateEventDialog event={event} />
                </TableCell>
                <TableCell className="text-primary">
                  <Trash2
                    className="cursor-pointer"
                    size={20}
                    onClick={() => handleDeleteEvent(event._id)}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="7" className="text-center">
                No events found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashboardEventsSection;
