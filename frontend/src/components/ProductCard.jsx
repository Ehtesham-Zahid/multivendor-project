import { Eye, Heart, ShoppingCart, Star } from "lucide-react";
import ProductImage from "../assets/images/category-1.jpg";
import { Badge } from "../shadcn/badge";
import ProductDialog from "./ProductDialog";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";
import { addToCart, getCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";
import { getDiscountPercentage } from "../utils";

const ProductCard = ({ product, small }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const [isWished, setIsWished] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isProductInWishlist = wishlist.some(
      (item) => item._id === product._id
    );
    setIsWished(isProductInWishlist);
  }, [product._id, wishlist]);

  // Handle wish list toggle
  const handleWishlistToggle = () => {
    setIsWished((prev) => !prev);
    if (!isWished) {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      dispatch(addToWishlist(product));
    } else {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      const updatedWishlist = wishlist.filter(
        (item) => item._id !== product._id
      );
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      dispatch(removeFromWishlist(product._id));
    }
  };

  // Handle add to cart logic here
  const handleAddToCart = () => {
    if (product?.stock <= 0) {
      toast.error("Product is out of stock");
      return;
    }
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
    toast.success("Product added to cart");
    dispatch(getCart());
  };

  return (
    <div
      className={`col-span-1 rounded-md  bg-white p-3 shadow-xl shadow-zinc-300   relative hover:shadow-2xl hover:shadow-zinc-400  ${
        small ? "w-56 h-56" : "w-80 mx-auto  sm:w-full min-h-[330px] "
      }`}
    >
      {!small && (
        <div
          className={`flex flex-col absolute right-5 top-5  z-10 ${
            small ? "gap-y-0" : "gap-y-2"
          }`}
        >
          <Heart
            className="bg-white rounded-sm p-1 hover:bg-sky-200 cursor-pointer "
            size={`${small ? "24px" : "28px"}`}
            fill={isWished ? "oklch(70.4% 0.191 22.216)" : "white"}
            onClick={handleWishlistToggle}
          />
          <ProductDialog product={product} small={small} />
          <ShoppingCart
            className="bg-white rounded-sm p-1 hover:bg-sky-200  cursor-pointer"
            size={`${small ? "24px" : "28px"}`}
            onClick={handleAddToCart}
          />
        </div>
      )}
      <div
        className={`overflow-hidden rounded-md   aspect-square mx-auto  ${
          small ? "w-28 h-28" : "w-44 h-44"
        }`}
      >
        <img
          src={product?.images[0]}
          className="rounded-md hover:scale-103 transition duration-300 object-contain"
        />
      </div>

      {!small && (
        <Link to={`/shop/${product?.shopId?._id}`}>
          <p className="text-sm font-bold text-primary hover:underline underline-offset-[2px] decoration-2  cursor-pointer">
            {product?.shopId?.shopName}
          </p>
        </Link>
      )}
      <div className="flex flex-row gap-x-2 items-center justify-between w-full">
        <Link to={`/product/${product?._id}`}>
          <p className={`${small ? "text-md" : "text-xl"} font-bold mt-1`}>
            {product?.name}
          </p>
        </Link>
        {product?.eventId ? (
          <Badge
            className={`text-red-600 bg-red-200 mt-auto mb-0.5 ${small ? "text-[11px]" : "text-xs"}`}
          >
            Event Sale
          </Badge>
        ) : product?.discountPrice ? (
          <Badge
            className={`text-sky-600 bg-sky-200 mt-auto mb-0.5 ${small ? "text-[11px]" : "text-xs"}`}
          >
            {getDiscountPercentage(product?.price, product?.discountPrice)}% off
          </Badge>
        ) : null}
      </div>
      <div
        className={`flex text-sm gap-0.5 items-center ${small ? "mt-1" : "mt-3"}`}
      >
        {Array.from({ length: 5 }, (_, index) => {
          const full = index + 1 <= Math.floor(product?.rating); // full stars
          const half =
            product?.rating - index >= 0.5 && product?.rating - index < 1; // half star

          return (
            <Star
              key={index}
              size={small ? "14px" : "18px"}
              className={`${
                full
                  ? "text-yellow-500"
                  : half
                    ? "text-yellow-500"
                    : "text-gray-300"
              }`}
              fill={
                full ? "currentColor" : half ? "url(#halfGradient)" : "none"
              }
            />
          );
        })}
        <p className="text-sm text-gray-500 ml-2">{product?.rating} / 5</p>
      </div>
      <div className={`flex justify-between ${small ? "mt-2" : "mt-5"}`}>
        {product?.eventId ? (
          <div className="flex flex-row gap-x-2">
            <p className={`font-bold ${small ? "text-lg" : "text-2xl"}`}>
              {product?.eventId?.eventPrice}${" "}
              <span
                className={`${small ? "text-base" : "text-base"} line-through text-gray-500`}
              >
                {product?.eventId?.originalPrice}$
              </span>
            </p>
          </div>
        ) : product?.discountPrice ? (
          <div className="flex flex-row gap-x-2">
            <p className={`font-bold ${small ? "text-lg" : "text-2xl"}`}>
              {product?.discountPrice}${" "}
              <span
                className={`${small ? "text-base" : "text-lg"} line-through text-gray-500`}
              >
                {product?.price}$
              </span>
            </p>
            {/* {!small && (
              <Badge
                className={`text-sky-600 bg-sky-200 mt-auto mb-0.5 ${small ? "text-[11px]" : "text-xs"}`}
              >
                {getDiscountPercentage(product?.price, product?.discountPrice)}%
                off
              </Badge>
            )} */}
          </div>
        ) : (
          <p className={`font-bold ${small ? "text-lg" : "text-2xl"}`}>
            {product?.price}$
          </p>
        )}
        <Badge
          variant="default"
          className={`text-white bg-secondary ${small ? "text-[11px]" : "text-sm"}`}
        >
          {product?.sold} Sold
        </Badge>
      </div>
    </div>
  );
};

export default ProductCard;
