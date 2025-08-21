import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../shadcn/select";
import { Button } from "../shadcn/button";
import { updateWithdrawalStatusAdminThunk } from "../features/withdrawal/withdrawalSlice";

const WithdrawStatusSelector = ({ currentStatus, withdrawalId }) => {
  const dispatch = useDispatch();
  const { isUpdateWithdrawalStatusAdminLoading } = useSelector(
    (state) => state.withdrawal
  );
  const [status, setStatus] = React.useState(currentStatus);

  const handleUpdate = async () => {
    const resultAction = await dispatch(
      updateWithdrawalStatusAdminThunk({
        withdrawalId,
        data: { status },
      })
    );
    if (updateWithdrawalStatusAdminThunk.fulfilled.match(resultAction)) {
      toast.success("Withdrawal status updated successfully");
      if (status === "approved") {
        setStatus("paid");
      } else {
        setStatus(status);
      }
    } else {
      toast.error(resultAction.payload || "Failed to update status");
    }
  };

  return (
    <div className="flex gap-2">
      <Select
        className="bg-background"
        defaultValue={currentStatus}
        value={status}
        onValueChange={setStatus}
      >
        <SelectTrigger className="w-[180px] bg-gray-200 border-none cursor-pointer capitalize">
          <SelectValue placeholder="Withdrawal Status" />
        </SelectTrigger>
        <SelectContent className="bg-background">
          <SelectGroup>
            {/* Allow transitions only from pending/approved/rejected/paid per current status */}
            {currentStatus === "pending" && (
              <>
                <SelectItem
                  value="pending"
                  className="hover:bg-primary/20 cursor-pointer"
                >
                  Pending
                </SelectItem>
                <SelectItem
                  value="approved"
                  className="hover:bg-primary/20 cursor-pointer"
                >
                  Approve
                </SelectItem>
                <SelectItem
                  value="rejected"
                  className="hover:bg-primary/20 cursor-pointer"
                >
                  Reject
                </SelectItem>
              </>
            )}
            {currentStatus === "approved" && (
              <>
                <SelectItem
                  value="approved"
                  className="hover:bg-primary/20 cursor-pointer"
                >
                  Approved
                </SelectItem>
                <SelectItem
                  value="paid"
                  className="hover:bg-primary/20 cursor-pointer"
                >
                  Mark as Paid
                </SelectItem>
              </>
            )}
            {currentStatus === "rejected" && (
              <SelectItem
                value="rejected"
                className="hover:bg-primary/20 cursor-pointer"
              >
                Rejected
              </SelectItem>
            )}
            {currentStatus === "paid" && (
              <SelectItem
                value="paid"
                className="hover:bg-primary/20 cursor-pointer"
              >
                Paid
              </SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div>
        <Button
          size="sm"
          className="bg-primary h-full text-xs   text-white hover:bg-primary/80 cursor-pointer"
          onClick={handleUpdate}
          disabled={
            status === currentStatus || isUpdateWithdrawalStatusAdminLoading
          }
        >
          {isUpdateWithdrawalStatusAdminLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <p>Update</p>
          )}
        </Button>
      </div>
    </div>
  );
};

export default WithdrawStatusSelector;
