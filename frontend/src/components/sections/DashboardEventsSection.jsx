import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/table";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteEventThunk,
  getShopEventsThunk,
} from "../../features/event/eventSlice";
import Spinner from "../Spinner";
import { toast } from "react-toastify";
import UpdateEventDialog from "../updateEventDialog";
import { formatDate } from "../../utils";
import LimitSelector from "../LimitSelector";
import { Pagination } from "../../shadcn/pagination";
import { PaginationContent } from "../../shadcn/pagination";
import { PaginationItem } from "../../shadcn/pagination";
import { PaginationPrevious } from "../../shadcn/pagination";
import { PaginationNext } from "../../shadcn/pagination";
import { PaginationLink } from "../../shadcn/pagination";

const DashboardEventsSection = () => {
  const [limit, setLimit] = useState("10");
  const [page, setPage] = useState(1);

  const {
    shopEvents,
    isShopEventsLoading,
    error,
    totalPages,
    totalShopEvents,
  } = useSelector((state) => state.event);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShopEventsThunk({ page, limit }));
  }, [dispatch, page, limit]);

  const handleDeleteEvent = async (id) => {
    const resultAction = await dispatch(deleteEventThunk(id));
    if (deleteEventThunk.fulfilled.match(resultAction)) {
      toast.success("Event Deleted Successfully!");
    } else {
      toast.error(error);
    }
  };

  return (
    <>
      <div className="w-full h-[500px]  overflow-y-scroll rounded-sm shadow-2xl">
        <Table>
          <TableHeader className="bg-primary rounded-md">
            <TableRow className="text-white">
              <TableHead className="w-[100px]">EVENT ID</TableHead>
              <TableHead>EVENT NAME</TableHead>
              <TableHead>PRODUCT</TableHead>
              <TableHead>ORIGINAL PRICE</TableHead>
              <TableHead>EVENT PRICE</TableHead>
              <TableHead>START DATE</TableHead>
              <TableHead>END DATE</TableHead>
              {/* <TableHead>Edit</TableHead> */}
              <TableHead>Delete</TableHead>
              {/* <TableHead className="text-right">See Details</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isShopEventsLoading ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-6 font-semibold text-md pt-48"
                >
                  <Spinner />
                </TableCell>
              </TableRow>
            ) : shopEvents?.length > 0 ? (
              shopEvents.map((event, index) => (
                <TableRow key={event._id}>
                  <TableCell className="font-medium">
                    {`EVN${1000 + index + 1}`}
                  </TableCell>
                  <TableCell>{event.name}</TableCell>
                  <TableCell>{event.productId.name}</TableCell>
                  <TableCell>${event.originalPrice}</TableCell>
                  <TableCell>${event.eventPrice}</TableCell>
                  <TableCell>{formatDate(event.startDate)}</TableCell>
                  <TableCell>{formatDate(event.endDate)}</TableCell>
                  {/* <TableCell className="text-primary">
                    <UpdateEventDialog event={event} />
                  </TableCell> */}
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
                <TableCell
                  colSpan="8"
                  className="text-center py-4 font-semibold"
                >
                  No events found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col sm:flex-row gap-5 justify-between items-center mt-4 w-full">
        {totalShopEvents > 10 && (
          <div className="flex items-center gap-2 text-sm w-fit">
            <span>Show</span>
            <LimitSelector
              setLimit={setLimit}
              defaultValue={limit}
              setPage={setPage}
            />
            <span className="text-sm flex items-center text-nowrap">
              entries of {totalShopEvents} total events
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

export default DashboardEventsSection;
