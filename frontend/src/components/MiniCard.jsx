import React from "react";
import Logo from "../assets/images/category-1.jpg";
import QuantityCounter from "./QuantityCounter";
import { ShoppingCart, ShoppingCartIcon } from "lucide-react";
import { removeFromWishlist } from "../features/wishlist/wishlistSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router";

const MiniCard = ({ sheet, product }) => {
  const dispatch = useDispatch();
  const handleRemoveItem = () => {
    // Logic to remove item from wishlist or cart
    if (sheet === "wishlist") {
      console.log("Remove from wishlist:", product.id);
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      const updatedWishlist = wishlist.filter(
        (item) => item._id !== product._id
      );
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      // Dispatch action to remove from wishlist
      dispatch(removeFromWishlist(product._id));
    }
  };
  return (
    <div className="flex gap-5 w-full p-2">
      <img
        className="w-32 h-32  rounded-sm object-cover"
        src={product?.images[0]}
      />
      <div className="flex flex-col justify-between">
        <div>
          <Link
            to={`/product/${product?._id}`}
            className="font-semibold text-  text-black mb-1"
          >
            {product?.name}
          </Link>
          {sheet !== "wishlist" ? (
            <p className="    tracking-tight text-gray-500  text-sm">$55 * 5</p>
          ) : null}

          <p className="font-bold text-xl   text-sky-500">${product?.price}</p>
        </div>
        <div className="flex items-center gap-x-2">
          {sheet === "wishlist" ? (
            <ShoppingCart
              className="bg-white rounded-sm p-1 hover:bg-sky-200 cursor-pointer "
              size={"32px"}
            />
          ) : (
            <QuantityCounter />
          )}
          <p
            className="underline underline-offset-2 font-semibold hover:text-red-500 cursor-pointer"
            onClick={handleRemoveItem}
          >
            Remove
          </p>
        </div>
      </div>
    </div>
  );
};

export default MiniCard;
