// "use client";
import {
  ArrowRight,
  ChevronDown,
  CircleUserRound,
  Heart,
  ShoppingCart,
} from "lucide-react";
import { Search } from "lucide-react";

import { Button } from "@/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/shadcn/dropdown-menu";
import { useState } from "react";
import { Link } from "react-router";

const Header = () => {
  const [category, setCategory] = useState("bottom");

  return (
    <div className="header  backdrop-blur-3xl  w-full flex flex-col items-center">
      <div className="primary-nav flex justify-between py-5 border-b-2 border-transparent w-custom  items-center">
        <p className="text-4xl font-bold">
          Swift<span className="text-primary">Cart</span>
        </p>
        <div className="w-1/2 border-2  border-primary outline-none flex justify-center  rounded-md px-5 py-2">
          <input
            type="text"
            placeholder="Search for Products"
            name="search"
            id="search"
            className="w-full outline-none"
          />
          <button className="border-s-2 border-primary ps-3 font text-dark cursor-pointer">
            <Search strokeWidth={3} color="#1f2937" />
          </button>
        </div>
        <Link className="bg-primary text-white px-5 py-3 flex rounded-md font-semibold gap-2.5">
          Become Seller <ArrowRight />
        </Link>
      </div>
      <div className="secondary-nav bg-primary w-full flex justify-center ">
        <div className="w-custom flex justify-between  text-white font-semibold">
          <div className="text-dark py-1">
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
                  <DropdownMenuItem
                    value="top"
                    className="hover:bg-blue-200 cursor-pointer rounded-none"
                  >
                    Top
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    value="bottom"
                    className="hover:bg-blue-200 cursor-pointer rounded-none"
                  >
                    Bottom
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    value="right"
                    className="hover:bg-blue-200 cursor-pointer rounded-none"
                  >
                    Right
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <ul className="flex gap-12 py-5 ">
            <li>
              <Link to="/" className="relative inline-block group">
                <span className="relative z-10">Home</span>
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link to="/" className="relative inline-block group">
                <span className="relative z-10  transition">Best Selling</span>
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link to="/" className="relative inline-block group">
                <span className="relative z-10  transition">Products</span>
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link to="/" className="relative inline-block group">
                <span className="relative z-10  transition">Events</span>
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link to="/" className="relative inline-block group">
                <span className="relative z-10  transition">Faqs</span>
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          </ul>
          <div className="flex gap-5 py-5  ">
            <Heart />
            <ShoppingCart />
            <Link to="/auth/login">
              <CircleUserRound />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
