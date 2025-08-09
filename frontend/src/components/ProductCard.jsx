import { Eye, Heart, ShoppingCart, Star } from "lucide-react";
import ProductImage from "../assets/images/category-1.jpg";
import { Badge } from "../shadcn/badge";
import ProductDialog from "./ProductDialog";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";
import { addToCart, getCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const [isWished, setIsWished] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isProductInWishlist = wishlist.some(
      (item) => item._id === product._id
    );
    setIsWished(isProductInWishlist);
  }, [product._id]);

  // Handle wish list toggle
  const handleWishlistToggle = () => {
    setIsWished((prev) => !prev);
    if (!isWished) {
      // Add to wishlist logic here
      console.log("Added to wishlist:", product._id);
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      // Dispatch action to add to wishlist
      dispatch(addToWishlist(product));
    } else {
      console.log("Removed from wishlist:", product._id);
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      const updatedWishlist = wishlist.filter(
        (item) => item._id !== product._id
      );
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      // Dispatch action to remove from wishlist
      dispatch(removeFromWishlist(product._id));
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
    toast.success("Product added to cart");
    dispatch(getCart());
  };

  return (
    <div className="col-span-1 rounded-md  bg-white p-3 shadow-xl shadow-zinc-300   relative hover:shadow-2xl hover:shadow-zinc-400 w-80 h-90 ">
      <div className="flex flex-col absolute right-5 top-5 gap-y-2 z-10">
        <Heart
          className="bg-white rounded-sm p-1 hover:bg-sky-200 cursor-pointer "
          size={"28px"}
          fill={isWished ? "red" : "white"}
          onClick={handleWishlistToggle}
        />
        <ProductDialog product={product} />
        <ShoppingCart
          className="bg-white rounded-sm p-1 hover:bg-sky-200  cursor-pointer"
          size={"28px"}
          onClick={handleAddToCart}
        />
      </div>
      <div className="overflow-hidden rounded-md   aspect-square w-48 h-48 mx-auto  ">
        <img
          src={product?.images[0]}
          className="rounded-md hover:scale-103 transition duration-300 object-contain"
        />
      </div>
      <p className="text-sm font-bold text-primary hover:underline underline-offset-[4px] decoration-2  cursor-pointer">
        {product?.shopId?.shopName}
      </p>
      <Link to={`/product/${product?._id}`}>
        <p className="text-xl font-bold mt-2">{product?.name}</p>
      </Link>
      <div className="flex text-sm gap-0.5 items-center mt-4">
        <Star size="18px" />
        <Star size="18px" />
        <Star size="18px" />
        <Star size="18px" />
        <Star size="18px" />
        <p className="font-semibold ml-1">({product?.rating})</p>
      </div>
      <div className="flex justify-between mt-5">
        <p className="font-bold text-2xl">{product?.price}$</p>
        <Badge variant="default" className="text-white bg-secondary">
          {product?.sold} Sold
        </Badge>
      </div>
    </div>
  );
};

export default ProductCard;
