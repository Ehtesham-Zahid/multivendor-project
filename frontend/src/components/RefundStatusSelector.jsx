import * as React from "react";

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
import {
  updateDeliveryStatusThunk,
  updateRefundStatusThunk,
} from "../features/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const RefundStatusSelector = ({ currentStatus, shopOrderId }) => {
  const { isLoading } = useSelector((state) => state.order);
  const [refundStatus, setRefundStatus] = React.useState(currentStatus);
  const dispatch = useDispatch();

  const handleUpdateRefundStatus = () => {
    const resultAction = dispatch(
      updateRefundStatusThunk({ shopOrderId, refundStatus })
    );
    if (resultAction.payload) {
      toast.success("Refund status updated successfully");
    }
  };
  return (
    <div className="flex gap-2">
      <Select
        className="bg-background"
        defaultValue={currentStatus}
        value={refundStatus}
        onValueChange={setRefundStatus}
      >
        <SelectTrigger className="w-[180px] bg-background border-none cursor-pointer">
          <SelectValue placeholder="Refund Status" />
        </SelectTrigger>
        <SelectContent className="bg-background">
          <SelectGroup>
            {currentStatus === "requested" ? (
              <>
                <SelectItem
                  value="requested"
                  className="hover:bg-primary/20 cursor-pointer"
                >
                  Requested
                </SelectItem>
                <SelectItem
                  value="refunded"
                  className="hover:bg-primary/20 cursor-pointer"
                >
                  Refunded
                </SelectItem>
                <SelectItem
                  value="rejected"
                  className="hover:bg-primary/20 cursor-pointer"
                >
                  Rejected
                </SelectItem>
              </>
            ) : (
              <SelectItem
                value={currentStatus}
                className="hover:bg-primary/20 cursor-pointer capitalize"
              >
                {currentStatus}
              </SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div>
        <Button
          size="sm"
          className="bg-primary h-full text-white hover:bg-primary/80 cursor-pointer"
          onClick={handleUpdateRefundStatus}
          disabled={refundStatus === currentStatus || isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <p>Update Status</p>
          )}
        </Button>
      </div>
    </div>
  );
};

export default RefundStatusSelector;
