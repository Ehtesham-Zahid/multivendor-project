import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/table";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEventAdminThunk,
  getAllEventsAdminThunk,
} from "../../../features/event/eventSlice";
import Spinner from "../../Spinner";
import { toast } from "react-toastify";
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

import EventFilterSelector from "../../EventFilterSelector";
import { formatDate } from "../../../utils";

const AdminEventsSection = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const {
    adminEvents,
    isAdminEventsLoading,
    error,
    totalAdminEvents,
    totalAdminEventsPages,
  } = useSelector((state) => state.event);
  const dispatch = useDispatch();

  const deleteEventHandler = async (id) => {
    const resultAction = await dispatch(deleteEventAdminThunk(id));

    if (deleteEventAdminThunk.fulfilled.match(resultAction)) {
      toast.success("Event Deleted Successfully!");
    } else {
      toast.error(error);
    }
  };

  useEffect(() => {
    dispatch(
      getAllEventsAdminThunk({
        onlyActive: "",
        page,
        limit,
        sortBy: "sales",
      })
    );
  }, [dispatch, page, limit]);

  const handleEventStatusChange = (value) => {
    if (value === "all") {
      dispatch(
        getAllEventsAdminThunk({
          onlyActive: "",
          page: 1,
          limit,
          sortBy: "sales",
        })
      );
    } else if (value === "true" || value === "false") {
      dispatch(
        getAllEventsAdminThunk({
          onlyActive: value,
          page: 1,
          limit,
          sortBy: "sales",
        })
      );
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-2xl sm:text-3xl font-bold mb-3">All Events</p>
        <EventFilterSelector
          handleEventStatusChange={handleEventStatusChange}
        />
      </div>
      <div className="w-full min-h-[500px] overflow-y-scroll rounded-sm  shadow-2xl ">
        <Table>
          <TableHeader className="bg-primary rounded-md">
            <TableRow className="text-white">
              <TableHead className="w-[100px]">EVENT ID</TableHead>
              <TableHead>EVENT NAME</TableHead>
              <TableHead>PRODUCT</TableHead>
              <TableHead>ORIGINAL PRICE</TableHead>
              <TableHead>EVENT PRICE</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>START DATE</TableHead>
              <TableHead>END DATE</TableHead>
              <TableHead>DELETE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isAdminEventsLoading ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-6 font-semibold text-md pt-48"
                >
                  <Spinner />
                </TableCell>
              </TableRow>
            ) : adminEvents?.length > 0 ? (
              adminEvents.map((event, index) => (
                <TableRow key={event._id || event.id}>
                  <TableCell className="font-medium">
                    {`EVT${1000 + index + 1 + (page - 1) * limit}`}
                  </TableCell>
                  <TableCell className="capitalize">
                    {event?.name || "Event Name"}
                  </TableCell>
                  <TableCell className=" text-primary font-semibold ">
                    <Link
                      to={`/product/${event?.productId?._id}`}
                      className="hover:underline"
                    >
                      {event?.productId?.name}
                    </Link>
                  </TableCell>
                  <TableCell className=" ">${event?.originalPrice}</TableCell>
                  <TableCell className="   ">${event?.eventPrice}</TableCell>
                  <TableCell>
                    <Badge
                      variant={"outline"}
                      className={`text-white ${
                        event.isActive ? "bg-green-500" : "bg-yellow-500"
                      }`}
                    >
                      {event.isActive ? "Active" : "Upcoming"}
                    </Badge>
                  </TableCell>

                  <TableCell>{formatDate(event?.startDate)}</TableCell>
                  <TableCell>{formatDate(event?.endDate)}</TableCell>
                  <TableCell className="text-primary ">
                    {event.isActive ? (
                      <Trash2
                        size={20}
                        disabled={true}
                        className="cursor-not-allowed opacity-50"
                      />
                    ) : (
                      <Trash2
                        size={20}
                        className="cursor-pointer"
                        onClick={() => deleteEventHandler(event._id)}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-4 font-semibold"
                >
                  No events yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center mt-4 w-full">
        {totalAdminEvents > 10 && (
          <div className="flex items-center gap-2 text-sm w-fit">
            <span>Show</span>
            <LimitSelector
              setLimit={setLimit}
              defaultValue={limit}
              setPage={setPage}
            />
            <span className="text-sm flex items-center text-nowrap">
              entries of {totalAdminEvents} total events
            </span>
          </div>
        )}
        {totalAdminEventsPages > 1 && (
          <div className="flex justify-center items-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  />
                </PaginationItem>
                {Array.from({ length: totalAdminEventsPages }, (_, index) => (
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
                        Math.min(prev + 1, totalAdminEventsPages)
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

export default AdminEventsSection;
