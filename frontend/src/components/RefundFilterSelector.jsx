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

const RefundFilterSelector = ({ handleRefundStatusChange }) => {
  return (
    <div className="flex gap-2">
      <Select
        className="bg-background "
        defaultValue="all"
        onValueChange={handleRefundStatusChange}
      >
        <SelectTrigger className="w-[160px] bg-background border-2 border-dark cursor-pointer">
          <SelectValue placeholder="Refund Status" />
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
              value="requested"
              className="hover:bg-primary/20 cursor-pointer capitalize"
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
              className="hover:bg-primary/20 cursor-pointer capitalize"
            >
              Rejected
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default RefundFilterSelector;
