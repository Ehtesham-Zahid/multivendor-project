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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getWishlist } from "../features/wishlist/wishlistSlice";

const WishlistSheet = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch wishlist items if needed
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    dispatch(getWishlist(wishlist));
  }, []);

  const { wishlist } = useSelector((state) => state.wishlist);

  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer relative">
        <p className="text-sm -top-3.5 absolute -right-3.5 text-black font-bold bg-secondary rounded-full h-5 w-5 flex items-center justify-center">
          {wishlist.length}
        </p>
        <Heart />
      </SheetTrigger>
      <SheetContent className="flex flex-col  items-center max-[450px]:w-[325px] overflow-y-scroll overflow-x-hidden  ">
        <p className=" font-bold text-2xl w-full ml-5 mt-2">WISHLIST</p>
        {/* <p>Your Cart is empty</p> */}
        {wishlist.length === 0 ? (
          <p className="text-gray-500 text-center mt-5">
            Your wishlist is empty
          </p>
        ) : (
          wishlist.map((item) => (
            <MiniCard key={item.id} product={item} sheet={"wishlist"} />
          ))
        )}
      </SheetContent>
    </Sheet>
  );
};

export default WishlistSheet;
