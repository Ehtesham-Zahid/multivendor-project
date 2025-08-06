import React from "react";
import Logo from "../assets/images/category-1.jpg";
import QuantityCounter from "./QuantityCounter";
import { ShoppingCart, ShoppingCartIcon } from "lucide-react";
import { removeFromWishlist } from "../features/wishlist/wishlistSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { addToCart, removeFromCart } from "../features/cart/cartSlice";

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
    } else {
      console.log("Remove from cart:", product.id);
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedCart = cart.filter((item) => item._id !== product._id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      // Dispatch action to remove from cart
      dispatch(removeFromCart(product._id));
    }
  };
  // Handle add to cart logic here
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItemIndex = cart.findIndex(
      (item) => item._id === product._id
    );

    if (existingItemIndex !== -1) {
      // Product already in cart, increase quantity by 1
      cart[existingItemIndex].quantity =
        (cart[existingItemIndex].quantity || 1) + 1;
    } else {
      // Product not in cart, add with quantity 1
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch(addToCart({ ...product, quantity: 1 }));
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
              onClick={handleAddToCart}
            />
          ) : (
            <QuantityCounter
              // quantityValue={product?.quantity}
              id={product?._id}
            />
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
