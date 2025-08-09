import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/dialog";
import {
  Eye,
  Heart,
  MessageCircleCode,
  MessageCircleCodeIcon,
  MessageCircleIcon,
  MessageCirclePlus,
  Phone,
} from "lucide-react";
import { Button } from "../shadcn/button";

import ProductImage from "../assets/images/category-1.jpg";
import Logo from "../assets/images/logo.png";
import { Badge } from "../shadcn/badge";
import QuantityCounter from "./QuantityCounter";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCart } from "../features/cart/cartSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";

const ProductDialog = ({ product }) => {
  const [productQuantity, setProductQuantity] = useState(1);
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
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItemIndex = cart.findIndex(
      (item) => item._id === product._id
    );

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity =
        (cart[existingItemIndex].quantity || 1) + productQuantity;

      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      // Product not in cart, add with quantity 1
      cart.push({ ...product, quantity: productQuantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Product added to cart");
    dispatch(getCart());
  };

  return (
    <div>
      <Dialog className="w-screen">
        <DialogTrigger>
          <Eye
            className="bg-white rounded-sm p-1 hover:bg-sky-200 cursor-pointer "
            size={"28px"}
          />
        </DialogTrigger>
        <DialogContent className="rounded-lg w-screen    grid grid-cols-2 gap-10">
          <div className="flex justify-center  items-center aspect-square w-96 h-96 mx-auto ">
            <img
              src={product?.images[0]}
              className="w-full h-full  object-contain rounded-md"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div className="border-b-2 border-zinc-400 pb-5">
              <p className="text-3xl font-bold text-sky-700  ">
                {product?.name}
              </p>
              <div className="flex justify-between  mt-3">
                <p className="font-bold text-2xl">{product?.price}$</p>
                <Badge variant="default" className="text-white bg-secondary">
                  {product?.sold} Sold
                </Badge>
              </div>
            </div>
            <div className="border-b-2 border-zinc-400 pb-4 flex  items-center justify-between">
              <div className="flex items-center gap-x-2">
                <QuantityCounter
                  id={product?._id}
                  parent="productDialog"
                  productQuantity={productQuantity}
                  setProductQuantity={setProductQuantity}
                />
                <Heart
                  className="bg-white   rounded-sm p-1 hover:bg-sky-200 cursor-pointer "
                  size={"30px"}
                  fill={isWished ? "oklch(70.4% 0.191 22.216)" : "white"}
                  onClick={handleWishlistToggle}
                />
              </div>
              <p className="text-lg ml-1">
                <strong>{product?.stock}</strong> items left
              </p>
            </div>
            <div className="flex justify-between gap-5 w-full items-center border-b-2 border-zinc-400 pb-4">
              <div className="flex gap-x-5 items-center">
                <img
                  src={product?.shopId?.imageUrl || Logo}
                  className="rounded-md w-16 h-16  object-contain border-2 "
                />
                <div className="flex flex-col">
                  <p className="font-bold">{product?.shopId?.shopName}</p>
                  <p>{product?.rating} Ratings</p>
                </div>
              </div>
              <Button className="text-white cursor-pointer">
                <MessageCirclePlus /> Contact
              </Button>
            </div>
            <div className="flex py-5 gap-5">
              <Button
                className=" text-white w-48  bg-secondary text-md cursor-pointer hover:bg-amber-400"
                size={"lg"}
              >
                View Full Details
              </Button>
              <Button
                className=" text-white w-48  text-md cursor-pointer"
                size={"lg"}
                onClick={handleAddToCart}
              >
                Add To Cart
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDialog;

//  {/* <DialogContent className="rounded-lg w-screen h-1/2 grid grid-cols-2 gap-10">
//           <div className="flex justify-between items-center flex-col gap-y-8">
//             <img src={ProductImage} className="w- rounded-lg shadow-2xl" />
//             <div className="flex gap-5 w-full items-center">
//               <img
//                 src={Logo}
//                 className="rounded-full w-16 h-16 border-secondary border-2 object-contain"
//               />
//   <div className="flex flex-col">
//     <p className="font-bold">Hyper Products</p>
//     <p>5 Ratings</p>
//   </div>
//             </div>
// <Button
//   className="text-white w-full bg-secondary text-md cursor-pointer hover:bg-orange-400"
//   size={"lg"}
// >
//   Contact Seller
// </Button>
//             {/* <p className="text-center font-bold text-primary">99 in Stock</p> */}
//           </div>
//           <div className="flex justify-between items-center flex-col gap-y-8">
//             <div className="flex flex-col gap-2">
//   <p className="text-3xl font-bold text-blue-800">
//     HyperX Cloud Stinger Core
//   </p>
//   <p className="">
//     HyperX Cloud Stinger Core Wireless Gaming Headset for
//     PlayStation OPEN BOX Lightweight Comfort Durable steels Sliders
//     Swivel-to-mute noise cancelling mic Compatible with PS5™, PS4™
//     & PC
//   </p>
//   <div className="flex justify-between mt-3">
//     <p className="font-bold text-3xl">110$</p>
//     <Badge variant="default" className="text-white bg-secondary">
//       120 Sold
//     </Badge>
//   </div>
//               <div className="mt-3 flex items-center gap-x-5">
//                 <QuantityCounter />
//                 <Heart size={"28px"} className="cursor-pointer" />
//               </div>
//             </div>
//             <Button
//   className="text-white w-full  text-md cursor-pointer"
//   size={"lg"}
//             >
//               Add To Cart
//             </Button>
//           </div>

//         </DialogContent> */}
