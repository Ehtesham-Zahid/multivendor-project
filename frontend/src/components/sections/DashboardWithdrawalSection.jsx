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

const DashboardWithdrawalSection = () => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [openSelector, setOpenSelector] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-gray-100   p-4 rounded-md flex gap-2 w-full justify-between items-center">
        <div className="flex gap-2 items-center">
          <p className="text-lg text-gray-600 font-bold">Account Balance:</p>
          <p className="text-xl font-bold">$10,000</p>
        </div>
        <SelectBankAccountDialog
          trigger={
            <Button
              className="bg-primary text-white px-4 py-2 rounded-md text-md"
              size={"lg"}
              onClick={() => setOpenSelector(true)}
            >
              Withdraw Funds
            </Button>
          }
          onSelect={(acc) => setSelectedAccount(acc)}
        />
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold">Withdrawal History</h2>
        <Table>
          {/* Always render the table header */}
          <TableHeader className="bg-primary rounded-md">
            <TableRow className="text-white">
              <TableHead className="w-[100px]">ORDER ID</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>AMOUNT</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>BANK ACCOUNT</TableHead>
              <TableHead className="text-right">See Details</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>2</TableCell>
              <TableCell>3</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DashboardWithdrawalSection;
