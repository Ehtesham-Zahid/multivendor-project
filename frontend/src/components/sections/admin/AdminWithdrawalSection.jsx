import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../shadcn/table";
import Spinner from "../../Spinner";
import { formatDate } from "../../../utils";
import { getAllWithdrawalsAdminThunk } from "../../../features/withdrawal/withdrawalSlice";
import WithdrawStatusSelector from "../../WithdrawStatusSelector";

const AdminWithdrawalSection = () => {
  const dispatch = useDispatch();
  const { adminWithdrawals, isAdminWithdrawalsLoading } = useSelector(
    (state) => state.withdrawal
  );

  useEffect(() => {
    dispatch(getAllWithdrawalsAdminThunk());
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="w-full min-h-[450px] overflow-y-scroll rounded-sm shadow-2xl">
          <Table>
            <TableHeader className="bg-primary rounded-md">
              <TableRow className="text-white">
                <TableHead className="w-[100px]">WITHDRAWAL ID</TableHead>
                <TableHead>DATE</TableHead>
                <TableHead>AMOUNT</TableHead>
                <TableHead>SHOP</TableHead>
                <TableHead>BANK ACCOUNT</TableHead>
                <TableHead>MANAGE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isAdminWithdrawalsLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center pt-40">
                    <Spinner />
                  </TableCell>
                </TableRow>
              ) : !adminWithdrawals || adminWithdrawals.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center pt-40">
                    <p className="text-lg font-bold">No withdrawals found</p>
                  </TableCell>
                </TableRow>
              ) : (
                adminWithdrawals.map((withdrawal, index) => (
                  <TableRow key={withdrawal?._id}>
                    <TableCell className="font-bold">
                      {`WD-${1000 + index + 1}`}
                    </TableCell>
                    <TableCell className="capitalize">
                      {formatDate(withdrawal?.createdAt)}
                    </TableCell>
                    <TableCell className="capitalize">
                      ${withdrawal?.amount}
                    </TableCell>
                    <TableCell className="capitalize">
                      {withdrawal?.shopId?.shopName}
                    </TableCell>
                    <TableCell className="capitalize">
                      {withdrawal?.bankAccountId?.bankName} -{" "}
                      {withdrawal?.bankAccountId?.accountNumber}
                    </TableCell>
                    <TableCell className="capitalize">
                      <WithdrawStatusSelector
                        currentStatus={withdrawal?.status}
                        withdrawalId={withdrawal?._id}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AdminWithdrawalSection;
