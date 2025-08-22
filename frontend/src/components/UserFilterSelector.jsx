import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn/select";

const UserFilterSelector = ({ handleUserRoleChange }) => {
  return (
    <div className="flex gap-2">
      <Select
        className="bg-background "
        defaultValue="all"
        onValueChange={handleUserRoleChange}
      >
        <SelectTrigger className="w-[160px] bg-background border-2 border-dark cursor-pointer">
          <SelectValue placeholder="User Role" />
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
              value="admin"
              className="hover:bg-primary/20 cursor-pointer capitalize"
            >
              Admin
            </SelectItem>
            <SelectItem
              value="vendor"
              className="hover:bg-primary/20 cursor-pointer"
            >
              Vendor
            </SelectItem>
            <SelectItem
              value="user"
              className="hover:bg-primary/20 cursor-pointer"
            >
              User
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default UserFilterSelector;
