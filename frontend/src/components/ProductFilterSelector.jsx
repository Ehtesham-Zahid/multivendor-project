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

const ProductFilterSelector = ({ handleProductStatusChange }) => {
  return (
    <div className="flex gap-2">
      <Select
        className="bg-background "
        defaultValue="all"
        onValueChange={handleProductStatusChange}
      >
        <SelectTrigger className="w-[160px] bg-background border-2 border-dark cursor-pointer">
          <SelectValue placeholder="Product Status" />
        </SelectTrigger>
        <SelectContent className="bg-background">
          <SelectGroup>
            <SelectLabel>Sort By</SelectLabel>
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
            <SelectItem
              value="sales"
              className="hover:bg-primary/20 cursor-pointer"
            >
              Top Selling
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProductFilterSelector;
