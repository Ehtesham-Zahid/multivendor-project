import { Heart, MessageCirclePlus } from "lucide-react";
import ProductImage from "../../assets/images/category-1.jpg";
import Logo from "../../assets/images/logo.png";
import { Badge } from "../../shadcn/badge";
import QuantityCounter from "../QuantityCounter";
import { Button } from "../../shadcn/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import { getProductByIdThunk } from "../../features/product/productSlice";
import { intervalToDuration } from "date-fns";
import { addToCart, getCart } from "../../features/cart/cartSlice";
import Spinner from "../Spinner";
import { toast } from "react-toastify";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../../features/wishlist/wishlistSlice";
import ProductTabsSection from "../ProductTabsSection";
import { getProductReviewsThunk } from "../../features/review/reviewSlice";
import socket from "../../socket";
import { getOrCreateConversationThunk } from "../../features/chat/chatSlice";

const SingleProductSection = () => {
  const { singleProduct, isSingleProductLoading } = useSelector(
    (state) => state.product
  );
  const { wishlist } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth);
  const [productQuantity, setProductQuantity] = useState(1);
  const [duration, setDuration] = useState({});
  const [isWished, setIsWished] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const { productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getProductByIdThunk(productId));
    dispatch(getProductReviewsThunk(productId));
  }, []);

  useEffect(() => {
    const isProductInWishlist = wishlist.some(
      (item) => item._id === singleProduct?._id
    );
    setIsWished(isProductInWishlist);
  }, [singleProduct?._id, wishlist]);

  useEffect(() => {
    const updateDuration = () => {
      const now = new Date();
      const end = new Date(singleProduct?.eventId?.endDate);
      const newDuration = intervalToDuration({
        start: now < end ? now : end,
        end,
      });
      setDuration(newDuration);
    };

    updateDuration(); // initial call

    const intervalId = setInterval(updateDuration, 1000); // update every second

    return () => clearInterval(intervalId); // cleanup
  }, [singleProduct?.eventId?.endDate]);

  // Handle add to cart logic here
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItemIndex = cart.findIndex(
      (item) => item._id === singleProduct?._id
    );

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity =
        (cart[existingItemIndex].quantity || 1) + productQuantity;

      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      // Product not in cart, add with quantity 1
      cart.push({ ...singleProduct, quantity: productQuantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Product added to cart");
    setProductQuantity(1);
    dispatch(getCart());
  };

  // Handle wish list toggle
  const handleWishlistToggle = () => {
    setIsWished((prev) => !prev);
    if (!isWished) {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      wishlist.push(singleProduct);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      dispatch(addToWishlist(singleProduct));
    } else {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      const updatedWishlist = wishlist.filter(
        (item) => item._id !== singleProduct?._id
      );
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      dispatch(removeFromWishlist(singleProduct?._id));
    }
  };

  const handleContactShop = async () => {
    if (!user) {
      toast.error("Please login to contact the shop");
      return;
    }
    const resultAction = await dispatch(
      getOrCreateConversationThunk(singleProduct?.shopId?._id)
    );
    if (getOrCreateConversationThunk.fulfilled.match(resultAction)) {
      navigate(`/profile/inbox/${resultAction.payload.conversation._id}`);
    }
  };

  return isSingleProductLoading ? (
    <div className="flex justify-center items-center h-screen pb-52">
      <Spinner />
    </div>
  ) : (
    <>
      <section className="w-11/12 xl:w-5/6 2xl:w-4/5 m-auto grid grid-cols-1 lg:grid-cols-2 my-20 gap-x-10">
        <div className="flex gap-3 col-span-1 flex-col    rounded-md">
          {singleProduct?.images.length > 1 && (
            <div className="flex flex-row   gap-5 justify-around  items-center w-full ">
              {singleProduct?.images?.map((image, index) => (
                <div
                  onClick={() => setCurrentImage(index)}
                  key={index}
                  className={`w-20 p-1 sm:w-32 aspect-square rounded-md overflow-hidden border sm:p-2   cursor-pointer ${
                    currentImage === index
                      ? "border-primary"
                      : "border-zinc-300"
                  }`}
                >
                  <img src={image} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
          <div className="w-[300px] sm:w-[400px] xl:w-[500px] aspect-square overflow-hidden rounded-sm m-auto  mt-0   p-2 ">
            <img
              src={singleProduct?.images[currentImage]}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div>
          <div className="border-zinc-300 border-b-2 pb-5">
            <p className="text-3xl font-bold text-sky-800 mb-3 flex items-center justify-between ">
              {singleProduct?.name}{" "}
              <Heart
                className="cursor-pointer bg-white rounded-sm p-1 hover:bg-sky-200"
                size={"32px"}
                fill={isWished ? "oklch(70.4% 0.191 22.216)" : "white"}
                onClick={handleWishlistToggle}
              />
            </p>
            <p className=" leading-5 text-sm sm:text-base sm:leading-6">
              {singleProduct?.description}
            </p>
          </div>
          <div className="my-3 flex flex-col gap-5 border-zinc-300 border-b-2 pb-5">
            <div className="flex justify-between items-start">
              {singleProduct?.eventId &&
              new Date(singleProduct?.eventId?.startDate).getTime() <
                Date.now() ? (
                <div className=" bg-red-200 rounded-md border-4 border-red-500 flex flex-col p-3 gap-2">
                  <div className="flex justify-between flex-col gap-2">
                    <p className="text-3xl font-bold text-red-500 uppercase">
                      {singleProduct?.eventId?.name}
                    </p>
                    <p className="text-md font-bold text-black">
                      🎉 Limited Time Event!
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-3xl text-red-500">
                      ${singleProduct?.eventId?.eventPrice}
                    </p>
                    <p className="font-bold text-2xl line-through text-gray-600">
                      ${singleProduct?.eventId?.originalPrice}
                    </p>
                  </div>
                  <div className="flex gap-5 mt-8">
                    <div className="text-center bg-red-100  text-dark py-0.5 px-3 rounded-md border-2 border-red-500">
                      <p className="text-4xl font-bold">{duration?.days}</p>
                      <p className="text-sm font-medium">DAYS</p>
                    </div>
                    <div className="text-center bg-red-100  text-dark py-0.5 px-3 rounded-md border-2 border-red-500">
                      <p className="text-4xl font-bold">{duration?.hours}</p>
                      <p className="text-sm font-medium">HOURS</p>
                    </div>
                    <div className="text-center bg-red-100  text-dark py-0.5 px-3 rounded-md border-2 border-red-500">
                      <p className="text-4xl font-bold">{duration?.minutes}</p>
                      <p className="text-sm font-medium">MINUTES</p>
                    </div>
                    <div className="text-center bg-red-100  text-dark py-0.5 px-3 rounded-md border-2 border-red-500">
                      <p className="text-4xl font-bold">{duration?.seconds}</p>
                      <p className="text-sm font-medium">SECONDS</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-3xl font-bold text-sky-500 ">
                  ${singleProduct?.price}
                </p>
              )}

              <Badge
                variant="default"
                className="text-white bg-secondary text-md"
              >
                {singleProduct?.sold} Sold
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <p className="text-xl font-semibold">Quantity: </p>{" "}
                <QuantityCounter
                  id={singleProduct?._id}
                  parent="singleProductSection"
                  productQuantity={productQuantity}
                  setProductQuantity={setProductQuantity}
                />
              </div>
              <p className="font-m">
                <strong>{singleProduct?.stock}</strong> items left
              </p>
            </div>
          </div>
          <div className="flex justify-between gap-5 w-full items-center border-b-2 border-zinc-300 pb-5">
            <div className="flex gap-5 items-center">
              <img
                src={singleProduct?.shopId?.imageUrl}
                className="rounded-md w-16 h-16  object-contain border-2 "
              />
              <div className="flex flex-col">
                <Link
                  to={`/shop/${singleProduct?.shopId?._id}`}
                  className="font-bold hover:underline"
                >
                  {singleProduct?.shopId?.shopName}
                </Link>
                <p>{singleProduct?.shopId?.rating} Ratings</p>
              </div>
            </div>
            <Button
              className="text-white cursor-pointer"
              onClick={handleContactShop}
            >
              <MessageCirclePlus /> Contact
            </Button>
          </div>
          <div>
            <Button
              className="w-full my-8 text-md text-white cursor-pointer"
              size={"lg"}
              onClick={handleAddToCart}
            >
              Add To Cart
            </Button>
          </div>
        </div>
      </section>
      <ProductTabsSection
        product={singleProduct}
        shop={singleProduct?.shopId}
      />
    </>
  );
};

export default SingleProductSection;
