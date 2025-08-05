import { Heart, MessageCirclePlus } from "lucide-react";
import ProductImage from "../../assets/images/category-1.jpg";
import Logo from "../../assets/images/logo.png";
import { Badge } from "../../shadcn/badge";
import QuantityCounter from "../QuantityCounter";
import { Button } from "../../shadcn/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getProductByIdThunk } from "../../features/product/productSlice";
import { intervalToDuration } from "date-fns";
import { addToCart } from "../../features/cart/cartSlice";
const SingleProductSection = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { singleProduct } = useSelector((state) => state.product);
  useEffect(() => {
    // This effect can be used for any side effects needed on component mount
    dispatch(getProductByIdThunk(productId));
  }, []);

  const [duration, setDuration] = useState({});
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
      (item) => item._id === singleProduct._id
    );

    if (existingItemIndex !== -1) {
      // Product already in cart, increase quantity by 1
      cart[existingItemIndex].quantity =
        (cart[existingItemIndex].quantity || 1) + 1;
    } else {
      // Product not in cart, add with quantity 1
      cart.push({ ...singleProduct, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch(addToCart({ ...singleProduct, quantity: 1 }));
  };
  return (
    <section className="xl:w-5/6 2xl:w-4/5 m-auto grid grid-cols-1 lg:grid-cols-2 my-20 gap-x-10">
      <div className="flex gap-8 col-span-1 flex-col 2xl:flex-row border-2 border-zinc-300 pb-5 rounded-md">
        {singleProduct?.images.length > 1 && (
          <div className="flex flex-row  2xl:flex-col gap-5 justify-between 2xl:justify-center items-center max-w-[2xl]:w-full ">
            {singleProduct?.images?.map((image, index) => (
              <div
                key={index}
                className="w-36 aspect-square rounded-md overflow-hidden"
              >
                <img src={image} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
        <div className="w-[500px] aspect-square overflow-hidden rounded-sm m-auto">
          <img
            src={singleProduct?.images[0]}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div>
        <div className="border-zinc-300 border-b-2 pb-5">
          <p className="text-3xl font-bold text-sky-800 mb-3 flex items-center justify-between ">
            {singleProduct?.name} <Heart className="cursor-pointer" />
          </p>
          <p className=" leading-5">{singleProduct?.description}</p>
        </div>
        <div className="my-3 flex flex-col gap-5 border-zinc-300 border-b-2 pb-5">
          <div className="flex justify-between items-start">
            {singleProduct?.eventId &&
            new Date(singleProduct?.eventId?.startDate).getTime() <
              Date.now() ? (
              <div className=" bg-sky-200 rounded-md border-4 border-sky-500 flex flex-col p-3 gap-2">
                <div className="flex justify-between flex-col gap-2">
                  <p className="text-3xl font-bold text-yellow-500 uppercase">
                    {singleProduct?.eventId?.name}
                  </p>
                  <p className="text-md font-bold text-black">
                    🎉 Limited Time Event!
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-2xl line-through">
                    ${singleProduct?.price}
                  </p>
                  <p className="font-bold text-3xl text-primary">
                    ${singleProduct?.eventId?.eventPrice}
                  </p>
                </div>
                <div className="flex gap-5 mt-8">
                  <div className="text-center bg-sky-100  text-dark py-0.5 px-3 rounded-md border-2 border-sky-500">
                    <p className="text-4xl font-bold">{duration?.days}</p>
                    <p className="text-sm font-medium">DAYS</p>
                  </div>
                  <div className="text-center bg-sky-100  text-dark py-0.5 px-3 rounded-md border-2 border-sky-500">
                    <p className="text-4xl font-bold">{duration?.hours}</p>
                    <p className="text-sm font-medium">HOURS</p>
                  </div>
                  <div className="text-center bg-sky-100  text-dark py-0.5 px-3 rounded-md border-2 border-sky-500">
                    <p className="text-4xl font-bold">{duration?.minutes}</p>
                    <p className="text-sm font-medium">MINUTES</p>
                  </div>
                  <div className="text-center bg-sky-100  text-dark py-0.5 px-3 rounded-md border-2 border-sky-500">
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
              <QuantityCounter />
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
              <p className="font-bold">{singleProduct?.shopId?.shopName}</p>
              <p>{singleProduct?.shopId?.rating} Ratings</p>
            </div>
          </div>
          <Button className="text-white cursor-pointer">
            <MessageCirclePlus /> Contact
          </Button>
        </div>
        <div>
          <Button
            className="w-full my-8 text-md text-white "
            onClick={handleAddToCart}
          >
            Add To Cart
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SingleProductSection;
