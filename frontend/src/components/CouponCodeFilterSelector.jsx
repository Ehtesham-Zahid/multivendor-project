import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn/select";

const CouponCodeFilterSelector = ({ handleCouponCodeStatusChange }) => {
  return (
    <div className="flex gap-2">
      <Select
        className="bg-background "
        defaultValue="all"
        onValueChange={handleCouponCodeStatusChange}
      >
        <SelectTrigger className="w-[160px] bg-background border-2 border-dark cursor-pointer">
          <SelectValue placeholder="Coupon Code Status" />
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
              value="active"
              className="hover:bg-primary/20 cursor-pointer capitalize"
            >
              Active
            </SelectItem>
            <SelectItem
              value="inactive"
              className="hover:bg-primary/20 cursor-pointer"
            >
              Inactive
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CouponCodeFilterSelector;
