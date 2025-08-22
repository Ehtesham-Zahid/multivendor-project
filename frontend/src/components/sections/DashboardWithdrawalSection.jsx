import React, { useState } from "react";
import { Button } from "../../shadcn/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../shadcn/table";
import SelectBankAccountDialog from "../SelectBankAccountDialog";
import { useDispatch, useSelector } from "react-redux";
import { getMyWithdrawalsThunk } from "../../features/withdrawal/withdrawalSlice";
import { formatDate } from "../../utils";
import Spinner from "../Spinner";
import { useEffect } from "react";
import { Badge } from "../../shadcn/badge";

const DashboardWithdrawalSection = () => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [openSelector, setOpenSelector] = useState(false);
  const { currentUserShop } = useSelector((state) => state.shop);
  const dispatch = useDispatch();
  const { myWithdrawals, isMyWithdrawalsLoading } = useSelector(
    (state) => state.withdrawal
  );

  useEffect(() => {
    dispatch(getMyWithdrawalsThunk());
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-gray-100   p-4 rounded-md flex flex-col sm:flex-row gap-5 sm:gap-2 w-full justify-between items-center">
        <div className="flex gap-2 items-center">
          <p className="text-lg text-gray-600 font-bold">Account Balance:</p>
          <p className="text-xl font-bold">
            ${currentUserShop?.accountBalance}
          </p>
        </div>
        <SelectBankAccountDialog
          accountBalance={currentUserShop?.accountBalance}
          trigger={
            <Button
              className="bg-primary text-white px-4 py-2 rounded-md text-md cursor-pointer"
              size={"lg"}
              onClick={() => setOpenSelector(true)}
            >
              Withdraw Funds
            </Button>
          }
          onSelect={(acc) => setSelectedAccount(acc)}
        />
      </div>
      <div className="flex flex-col gap-4 mt-5">
        <h2 className="text-2xl font-bold">Withdrawal History</h2>
        <div className="w-full min-h-[450px]    overflow-y-scroll rounded-sm shadow-2xl  ">
          <Table>
            {/* Always render the table header */}
            <TableHeader className="bg-primary rounded-md">
              <TableRow className="text-white">
                <TableHead className="w-[100px]">WITHDRAWAL ID</TableHead>
                <TableHead>DATE</TableHead>
                <TableHead>AMOUNT</TableHead>
                <TableHead>BANK ACCOUNT</TableHead>
                <TableHead>STATUS</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isMyWithdrawalsLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center  pt-40">
                    <Spinner />
                  </TableCell>
                </TableRow>
              ) : myWithdrawals?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center  pt-40">
                    <p className="text-lg font-bold">No withdrawals found</p>
                  </TableCell>
                </TableRow>
              ) : (
                myWithdrawals?.map((withdrawal, index) => (
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
                      {withdrawal?.bankAccountId?.bankName} -{" "}
                      {withdrawal?.bankAccountId?.accountNumber}
                    </TableCell>
                    <TableCell className="capitalize">
                      <Badge
                        className={`${
                          withdrawal?.status === "paid"
                            ? "bg-green-500 text-white"
                            : withdrawal?.status === "pending"
                              ? "bg-yellow-500 text-white"
                              : withdrawal?.status === "approved"
                                ? "bg-primary text-white"
                                : "bg-red-500 text-white"
                        }`}
                        variant={"outline"}
                      >
                        {withdrawal?.status}
                      </Badge>
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

export default DashboardWithdrawalSection;
