import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/select";

import { CATEGORIES } from "@/constants/";

const CategorySelector = ({ setCategoryValue }) => {
  return (
    <Select onValueChange={setCategoryValue}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Category" />
      </SelectTrigger>
      <SelectContent className="bg-background outline-none">
        <SelectGroup className="outline-none">
          {/* <SelectLabel>CATEGORY</SelectLabel> */}
          {CATEGORIES.map((category) => {
            return (
              <SelectItem value={category.name} className="hover:bg-sky-200">
                {category.name}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default CategorySelector;
