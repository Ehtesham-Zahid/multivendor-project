import { Button } from "@/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/shadcn/dropdown-menu";

import CategoryImage1 from "../assets/images/category-1.png";
import CategoryImage2 from "../assets/images/category-2.png";
import CategoryImage3 from "../assets/images/category-3.png";
import CategoryImage4 from "../assets/images/category-4.png";
import CategoryImage5 from "../assets/images/category-5.png";
import CategoryImage6 from "../assets/images/category-6.png";
import CategoryImage7 from "../assets/images/category-7.png";
import CategoryImage8 from "../assets/images/category-8.png";
import CategoryImage9 from "../assets/images/category-9.png";
import CategoryImage10 from "../assets/images/category-10.png";

import { CATEGORIES } from "@/constants/";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
const CategoryDropdown = () => {
  const [category, setCategory] = useState("bottom");
  return (
    <DropdownMenu className="outline-none ">
      <DropdownMenuTrigger asChild className="w-[200px] ">
        <Button
          variant="outline"
          className="   border-t-2 border-b-2 ring-0 ring-transparent focus:ring-0  h-full rounded-md border-primary  text-lg font-bold flex gap-5 items-center cursor-pointer"
        >
          All Categories <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px] p-0 bg-white  text-dark font-semibold">
        <DropdownMenuGroup
          value={category}
          onValueChange={setCategory}
          className="p-0"
        >
          {CATEGORIES.map((category, index) => (
            <Link to={`/category/${category.name}`} key={category.name}>
              <DropdownMenuItem
                key={index}
                value={category.name}
                className="hover:bg-blue-200 cursor-pointer rounded-none flex gap-3"
              >
                <img
                  src={category.image}
                  className=" w-12 border-2 rounded-sm object-cover"
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
