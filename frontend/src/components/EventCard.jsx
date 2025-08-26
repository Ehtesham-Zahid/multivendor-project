import EventImage from "../assets/images/category-1.jpg";
import { intervalToDuration } from "date-fns";
import { Badge } from "../shadcn/badge";
import { Button } from "../shadcn/button";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const EventCard = ({ event, small }) => {
  const [duration, setDuration] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    const updateDuration = () => {
      const now = new Date();
      const end = new Date(event?.endDate);
      const newDuration = intervalToDuration({
        start: now < end ? now : end,
        end,
      });
      setDuration(newDuration);
    };

    updateDuration(); // initial call

    const intervalId = setInterval(updateDuration, 1000); // update every second

    return () => clearInterval(intervalId); // cleanup
  }, [event?.endDate]);

  // Handle add to cart logic here
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItemIndex = cart.findIndex(
      (item) => item._id === event?.productId?._id
    );

    if (existingItemIndex !== -1) {
      // Product already in cart, increase quantity by 1
      cart[existingItemIndex].quantity =
        (cart[existingItemIndex].quantity || 1) + 1;
    } else {
      // Product not in cart, add with quantity 1
      const product = { ...event?.productId, quantity: 1 };
      product.eventId = event;
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Product added to cart");
    dispatch(getCart());
  };

  return (
    <div
      className={`bg-zinc-300 grid ${small ? "grid-cols-1 xl:grid-cols-2" : "grid-cols-1 lg:grid-cols-2"} gap-5 p-3 sm:p-5 rounded-md  `}
    >
      <div className="bg-white rounded-md p-10 h-[300px] sm:h-[500px] w-full">
        <img
          src={event?.productId?.images[0]}
          className="w-full h-full mx-auto object-contain rounded-md"
        />
      </div>
      <div className="flex flex-col justify-between bg-white p-3 sm:p-5 rounded-md gap-y-8">
        <div>
          <p className="text-start text-3xl sm:text-4xl w-11/12 sm:w-5/6 uppercase font-black mb-5 text-sky-500">
            {event?.name}
          </p>
          <p className="text-start text-3xl font-bold w-11/12 sm:w-5/6">
            {event?.productId?.name}
          </p>
          {/* <p className="text-sm mt-5">{event?.productId?.description}</p> */}
          <div className="flex justify-between mt-8">
            <div className="flex items-center gap-2">
              <p className="font-bold text-3xl text-primary">
                ${event?.eventPrice}
              </p>
              <p className="font-bold text-xl  line-through text-gray-500">
                ${event?.originalPrice}
              </p>
            </div>
            <Badge variant="default" className="text-white bg-secondary">
              {event?.productId?.sold} Sold
            </Badge>
          </div>
          <div className="flex gap-2.5 sm:gap-5 mt-8">
            <div className="text-center bg-blue-200  text-dark py-0.5 px-2 sm:px-3  rounded-md border-2 border-blue-500">
              <p className="text-2xl sm:text-4xl font-bold">
                {duration?.days || 0}
              </p>
              <p className="text-xs sm:text-sm font-medium">DAYS</p>
            </div>
            <div className="text-center bg-blue-200  text-dark py-0.5  px-2 sm:px-3 rounded-md border-2 border-blue-500">
              <p className="text-2xl sm:text-4xl font-bold">
                {duration?.hours || 0}
              </p>
              <p className="text-xs sm:text-sm font-medium">HOURS</p>
            </div>
            <div className="text-center bg-blue-200  text-dark py-0.5  px-2 sm:px-3 rounded-md border-2 border-blue-500">
              <p className="text-2xl sm:text-4xl font-bold">
                {duration?.minutes || 0}
              </p>
              <p className="text-xs sm:text-sm font-medium">
                {small ? "MINS" : "MINUTES"}
              </p>
            </div>
            <div className="text-center bg-blue-200  text-dark py-0.5   px-2 sm:px-3 rounded-md border-2 border-blue-500">
              <p className="text-2xl sm:text-4xl font-bold">
                {duration?.seconds || 0}
              </p>
              <p className="text-xs sm:text-sm font-medium">
                {small ? "SECS" : "SECONDS"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Link to={`/product/${event?.productId?._id}`}>
            <Button
              className="w-full bg-secondary hover:bg-yellow-500 text-white text-md  cursor-pointer"
              size={"lg"}
            >
              See Details
            </Button>
          </Link>
          <Button
            disabled={event?.productId?.stock <= 0}
            className={`w-full bg-primary  text-white text-md  cursor-pointer ${
              event?.productId?.stock <= 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary"
            }`}
            size={"lg"}
            onClick={handleAddToCart}
          >
            {event?.productId?.stock <= 0 ? "Out of Stock" : "Add To Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
