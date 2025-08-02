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
import { useSelector } from "react-redux";
import CartSheet from "./CartSheet";
import WishlistSheet from "./WishlistSheet";

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

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const [category, setCategory] = useState("bottom");

  return (
    <div className="header  backdrop-blur-3xl  w-full flex flex-col items-center">
      <div className="primary-nav flex justify-between py-5 border-b-2 border-transparent w-custom  items-center">
        <Link className="text-5xl font-black" to="/">
          Swift<span className="text-primary">Cart</span>
        </Link>
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
        {user ? (
          user.hasShop ? (
            <Link
              className="bg-primary text-white px-5 py-3 flex rounded-md font-semibold gap-2.5"
              to="/shop/:id"
            >
              Go To Shop <ArrowRight />
            </Link>
          ) : (
            <Link
              className="bg-primary text-white px-5 py-3 flex rounded-md font-semibold gap-2.5"
              to="/create-shop"
            >
              Become Seller <ArrowRight />
            </Link>
          )
        ) : (
          <Link
            className="bg-primary text-white px-5 py-3 flex rounded-md font-semibold gap-2.5"
            to="/auth/login"
          >
            Become Seller <ArrowRight />
          </Link>
        )}
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
                    className="hover:bg-blue-200 cursor-pointer rounded-none flex gap-3"
                  >
                    <img
                      src={CategoryImage1}
                      className=" w-12 border-2 rounded-sm object-cover"
                    />
                    Clothing & Shoes
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    value="bottom"
                    className="hover:bg-blue-200 cursor-pointer rounded-none"
                  >
                    <img
                      src={CategoryImage2}
                      className=" w-12 border-2 rounded-sm object-cover"
                    />
                    Mobile & Electronics
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    value="right"
                    className="hover:bg-blue-200 cursor-pointer rounded-none"
                  >
                    <img
                      src={CategoryImage9}
                      className=" w-12 border-2 rounded-sm object-cover"
                    />
                    Pet Food
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    value="right"
                    className="hover:bg-blue-200 cursor-pointer rounded-none"
                  >
                    <img
                      src={CategoryImage3}
                      className=" w-12 border-2 rounded-sm object-cover"
                    />
                    Home & Kitcchen
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    value="right"
                    className="hover:bg-blue-200 cursor-pointer rounded-none"
                  >
                    <img
                      src={CategoryImage4}
                      className=" w-12 border-2 rounded-sm object-cover"
                    />
                    Beauty & Personal Care
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    value="right"
                    className="hover:bg-blue-200 cursor-pointer rounded-none"
                  >
                    <img
                      src={CategoryImage5}
                      className=" w-12 border-2 rounded-sm object-cover"
                    />
                    Grocery & Food
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    value="right"
                    className="hover:bg-blue-200 cursor-pointer rounded-none"
                  >
                    <img
                      src={CategoryImage6}
                      className=" w-12 border-2 rounded-sm object-cover"
                    />
                    Health & Fitness
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    value="right"
                    className="hover:bg-blue-200 cursor-pointer rounded-none"
                  >
                    <img
                      src={CategoryImage7}
                      className=" w-12 border-2 rounded-sm object-cover"
                    />
                    Books & Stationery
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    value="right"
                    className="hover:bg-blue-200 cursor-pointer rounded-none"
                  >
                    <img
                      src={CategoryImage8}
                      className=" w-12 border-2 rounded-sm object-cover"
                    />
                    Toy & Baby Items
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    value="right"
                    className="hover:bg-blue-200 cursor-pointer rounded-none"
                  >
                    <img
                      src={CategoryImage10}
                      className=" w-12 border-2 rounded-sm object-cover"
                    />
                    Others
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
              <Link to="/best-selling" className="relative inline-block group">
                <span className="relative z-10  transition">Best Selling</span>
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link to="/all-products" className="relative inline-block group">
                <span className="relative z-10  transition">Products</span>
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link to="/all-events" className="relative inline-block group">
                <span className="relative z-10  transition">Events</span>
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link to="/faqs" className="relative inline-block group">
                <span className="relative z-10  transition">Faqs</span>
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          </ul>
          <div className="flex gap-5 py-5  ">
            <WishlistSheet />
            <CartSheet />
            <Link to={`${user ? "/profile" : "/auth/login"}`}>
              <CircleUserRound />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
