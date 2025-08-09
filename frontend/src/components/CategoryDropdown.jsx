import { Button } from "@/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/shadcn/dropdown-menu";

import { CATEGORIES } from "@/constants/";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const CategoryDropdown = () => {
  const [category, setCategory] = useState("bottom");
  return (
    <DropdownMenu className="outline-none ">
      <DropdownMenuTrigger asChild className="lg:w-[200px] w-full ">
        <Button
          variant="outline"
          className="   border-t-2 border-b-2 ring-0 ring-transparent focus:ring-0  h-full rounded-md border-primary  text-lg font-bold flex gap-5 items-center cursor-pointer"
        >
          All Categories <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full p-0 bg-white  text-dark font-semibold">
        <DropdownMenuGroup
          value={category}
          onValueChange={setCategory}
          className="p-0 lg:w-[200px] w-full"
        >
          {CATEGORIES.map((category, index) => (
            <Link
              to={`/category/${category.name}`}
              key={category.name}
              className="lg:w-[200px] w-full"
            >
              <DropdownMenuItem
                key={index}
                value={category.name}
                className="hover:bg-blue-200 cursor-pointer rounded-none flex gap-3 lg:w-[200px] w-full"
              >
                <img
                  src={category.image}
                  className=" w-12 border-2 rounded-sm object-cover  "
                />
                {category.name}
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoryDropdown;
