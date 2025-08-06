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
import { Link } from "react-router";

const CategorySelector = ({ setCategoryValue, defaultValue }) => {
  console.log("CategorySelector rendered with defaultValue:", defaultValue);
  return (
    <Select onValueChange={setCategoryValue} defaultValue={defaultValue}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Category" />
      </SelectTrigger>
      <SelectContent className="bg-background outline-none">
        <SelectGroup className="outline-none">
          {/* <SelectLabel>CATEGORY</SelectLabel> */}
          {CATEGORIES.map((category) => {
            return (
              <SelectItem
                value={category.name}
                className="hover:bg-sky-200"
                onClick={() => console.log(category.name)}
              >
                {" "}
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
