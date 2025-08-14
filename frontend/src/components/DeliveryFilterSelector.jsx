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

const DeliveryFilterSelector = ({ handleDeliveryStatusChange }) => {
  // const { isLoading } = useSelector((state) => state.order);
  // const [deliveryStatus, setDeliveryStatus] = React.useState(currentStatus);
  // const dispatch = useDispatch();

  // const handleUpdateDeliveryStatus = () => {
  //   const resultAction = dispatch(
  //     updateDeliveryStatusThunk({ shopOrderId, deliveryStatus })
  //   );
  // };
  return (
    <div className="flex gap-2">
      <Select
        className="bg-background "
        defaultValue="all"
        onValueChange={handleDeliveryStatusChange}
      >
        <SelectTrigger className="w-[160px] bg-background border-2 border-dark cursor-pointer">
          <SelectValue placeholder="Delivery Status" />
        </SelectTrigger>
        <SelectContent className="bg-background">
          <SelectGroup>
            <SelectItem
              value="all"
              className="hover:bg-primary/20 cursor-pointer capitalize"
            >
              All
            </SelectItem>
            <SelectItem
              value="pending"
              className="hover:bg-primary/20 cursor-pointer capitalize"
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
              className="hover:bg-primary/20 cursor-pointer capitalize"
            >
              Cancelled
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default DeliveryFilterSelector;
