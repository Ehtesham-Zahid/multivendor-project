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

const EventFilterSelector = ({ handleEventStatusChange }) => {
  return (
    <div className="flex gap-2">
      <Select
        className="bg-background "
        defaultValue="all"
        onValueChange={handleEventStatusChange}
      >
        <SelectTrigger className="w-[160px] bg-background border-2 border-dark cursor-pointer">
          <SelectValue placeholder="Event Status" />
        </SelectTrigger>
        <SelectContent className="bg-background">
          <SelectGroup>
            <SelectLabel>Event Status</SelectLabel>
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
              Upcoming
            </SelectItem>
            {/* <SelectItem
              value="sales"
              className="hover:bg-primary/20 cursor-pointer"
            >
              Top Selling
            </SelectItem> */}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default EventFilterSelector;
