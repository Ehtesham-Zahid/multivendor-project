import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/table";
import { Badge } from "@/shadcn/badge";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../Spinner";
import { formatDate } from "../../../utils";
import { Link } from "react-router";
import LimitSelector from "../../LimitSelector";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../shadcn/pagination";
import { getAllUsersThunk } from "../../../features/auth/authSlice";
import UserFilterSelector from "../../UserFilterSelector";

const AdminUsersSection = () => {
  const [limit, setLimit] = useState("10");
  const [page, setPage] = useState(1);
  const { allUsers, isAllUsersLoading, totalUsers, totalUsersPages } =
    useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsersThunk({}));
  }, [dispatch, page, limit]);

  const handleUserRoleChange = (value) => {
    if (value === "all") {
      dispatch(getAllUsersThunk({}));
    } else {
      dispatch(getAllUsersThunk({ role: value }));
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-2xl sm:text-3xl font-bold mb-3">All Users</p>
        <UserFilterSelector handleUserRoleChange={handleUserRoleChange} />
      </div>
      <div className="w-full min-h-[450px]    overflow-y-scroll rounded-sm shadow-2xl  ">
        <Table>
          {/* Always render the table header */}
          <TableHeader className="bg-primary rounded-md">
            <TableRow className="text-white">
              <TableHead className="w-[100px]">User ID</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Shop Name</TableHead>
              <TableHead>Joined On</TableHead>
            </TableRow>
          </TableHeader>

          {/* Conditionally render body or fallback row */}
          <TableBody>
            {isAllUsersLoading ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-6 font-semibold text-md pt-48"
                >
                  <Spinner />
                </TableCell>
              </TableRow>
            ) : allUsers?.length > 0 ? (
              allUsers.map((user, index) => (
                <TableRow key={user._id || user.id}>
                  <TableCell className="font-medium">
                    {`USER${1000 + index + 1 + (page - 1) * limit}`}
                  </TableCell>
                  <TableCell className="capitalize">{user?.fullname}</TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant="default"
                      className={`text-white capitalize ${
                        user?.role === "admin"
                          ? "bg-green-500"
                          : user?.role === "vendor"
                            ? "bg-blue-500"
                            : "bg-gray-500"
                      }`}
                    >
                      {user?.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user?.shopId ? (
                      <Link
                        to={`/dashboard/shop/${user?.shopId?._id}`}
                        className="text-primary hover:underline capitalize font-medium"
                      >
                        {user?.shopId?.shopName}
                      </Link>
                    ) : (
                      <span className="text-gray-500">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-6 font-semibold text-md"
                >
                  No users yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center mt-4 w-full">
        {totalUsers > 10 && (
          <div className="flex items-center gap-2 text-sm w-fit">
            <span>Show</span>
            <LimitSelector
              setLimit={setLimit}
              defaultValue={limit}
              setPage={setPage}
            />
            <span className="text-sm flex items-center text-nowrap">
              entries of {totalUsers} total users
            </span>
          </div>
        )}
        {totalUsersPages > 1 && (
          <div className="flex justify-center items-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  />
                </PaginationItem>
                {Array.from({ length: totalUsersPages }, (_, index) => (
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
                      setPage((prev) => Math.min(prev + 1, totalUsersPages))
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

export default AdminUsersSection;
