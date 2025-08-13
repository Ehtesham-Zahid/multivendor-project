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
import { updateDeliveryStatusThunk } from "../features/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

const DeliveryStatusSelector = ({ currentStatus, shopOrderId }) => {
  const { isLoading } = useSelector((state) => state.order);
  const [deliveryStatus, setDeliveryStatus] = React.useState(currentStatus);
  const dispatch = useDispatch();

  const handleUpdateDeliveryStatus = () => {
    const resultAction = dispatch(
      updateDeliveryStatusThunk({ shopOrderId, deliveryStatus })
    );
  };
  return (
    <div className="flex gap-2">
      <Select
        className="bg-background"
        defaultValue={currentStatus}
        value={deliveryStatus}
        onValueChange={setDeliveryStatus}
      >
        <SelectTrigger className="w-[180px] bg-background border-none cursor-pointer">
          <SelectValue placeholder="Delivery Status" />
        </SelectTrigger>
        <SelectContent className="bg-background">
          <SelectGroup>
            {currentStatus === "pending" ? (
              <>
                <SelectItem
                  value="pending"
                  className="hover:bg-primary/20 cursor-pointer"
                >
                  Pending
                </SelectItem>
                <SelectItem
                  value="delivered"
                  className="hover:bg-primary/20 cursor-pointer"
                >
                  Delivered
                </SelectItem>
                <SelectItem
                  value="cancelled"
                  className="hover:bg-primary/20 cursor-pointer"
                >
                  Cancelled
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
          onClick={handleUpdateDeliveryStatus}
          disabled={deliveryStatus === currentStatus || isLoading}
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

export default DeliveryStatusSelector;
