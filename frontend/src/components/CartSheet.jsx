import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shadcn/sheet";
import { Circle, ShoppingCart } from "lucide-react";
import MiniCard from "./MiniCard";
import { Button } from "../shadcn/button";
import { Link } from "react-router";

const CartSheet = () => {
  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer">
        <ShoppingCart />
      </SheetTrigger>
      <SheetContent className="flex flex-col  items-center max-[450px]:w-[325px] overflow-y-scroll overflow-x-hidden ">
        <p className=" font-bold text-2xl w-full ml-5 mt-2">CART</p>
        {/* <p>Your Cart is empty</p> */}
        <MiniCard />
        <MiniCard />
        <MiniCard />
        <MiniCard />
        <MiniCard />
        <div className=" fixed bottom-0 w-[366px]  border-t-2 border-primary   py-5 flex justify-center  bg-background">
          <Button
            className={"font-bold text-white text-md tracking-wider"}
            size={"lg"}
          >
            CHECKOUT <Circle Size="16px" fill="white" /> $500{" "}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
