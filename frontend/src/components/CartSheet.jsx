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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCart } from "../features/cart/cartSlice";

const CartSheet = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch wishlist items if needed
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    dispatch(getCart(cart));
  }, []);

  const { cart } = useSelector((state) => state.cart);
  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer relative">
        <p className="text-sm -top-3.5 absolute -right-3.5 text-black font-bold bg-secondary rounded-full h-5 w-5 flex items-center justify-center">
          {cart.length}
        </p>
        <ShoppingCart />
      </SheetTrigger>
      <SheetContent className="flex flex-col  items-center max-[450px]:w-[325px] overflow-y-scroll overflow-x-hidden pb-20">
        <p className=" font-bold text-2xl w-full ml-5 mt-2">CART</p>
        {cart?.length === 0 ? (
          <p className="text-gray-500 text-center mt-5">Your Cart is empty</p>
        ) : (
          cart?.map((item) => (
            <MiniCard key={item._id} product={item} sheet={"cart"} />
          ))
        )}
        <div className=" fixed bottom-0 w-[366px]  border-t-2 border-primary   py-5 flex justify-center  bg-background">
          <Button
            className={"font-bold text-white tracking-wider text-md"}
            size={"lg"}
          >
            <p>CHECKOUT</p>
            <span className="text-4xl mb-2.5 mx-2">•</span>
            <p>$500</p>{" "}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
