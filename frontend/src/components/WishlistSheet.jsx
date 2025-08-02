import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shadcn/sheet";
import { Circle, Heart, ShoppingCart } from "lucide-react";
import MiniCard from "./MiniCard";
import { Button } from "../shadcn/button";
import { Link } from "react-router";

const WishlistSheet = () => {
  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer">
        <Heart />
      </SheetTrigger>
      <SheetContent className="flex flex-col  items-center max-[450px]:w-[325px] overflow-y-scroll overflow-x-hidden  ">
        <p className=" font-bold text-2xl w-full ml-5 mt-2">WISHLIST</p>
        {/* <p>Your Cart is empty</p> */}
        <MiniCard sheet="wishlist" />
        <MiniCard sheet="wishlist" />
        <MiniCard sheet="wishlist" />
        <MiniCard sheet="wishlist" />
        <MiniCard sheet="wishlist" />
        <MiniCard />
        <MiniCard />
      </SheetContent>
    </Sheet>
  );
};

export default WishlistSheet;
