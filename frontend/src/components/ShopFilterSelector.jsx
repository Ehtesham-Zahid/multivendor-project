import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn/select";

const ShopFilterSelector = ({ handleShopStatusChange }) => {
  return (
    <div className="flex gap-2">
      <Select
        className="bg-background "
        defaultValue="all"
        onValueChange={handleShopStatusChange}
      >
        <SelectTrigger className="w-[160px] bg-background border-2 border-dark cursor-pointer">
          <SelectValue placeholder="Shop Status" />
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
              value="true"
              className="hover:bg-primary/20 cursor-pointer capitalize"
            >
              Active
            </SelectItem>
            <SelectItem
              value="false"
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

export default ShopFilterSelector;
