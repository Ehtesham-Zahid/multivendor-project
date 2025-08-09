import EventImage from "../assets/images/category-1.jpg";
import { intervalToDuration } from "date-fns";
import { Badge } from "../shadcn/badge";
import { Button } from "../shadcn/button";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const EventCard = ({ event }) => {
  const [duration, setDuration] = useState({});
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
  return (
    <div className="bg-zinc-300 grid grid-cols-1 lg:grid-cols-2 gap-5 p-3 sm:p-5 rounded-md  ">
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
              <p className="font-bold text-2xl line-through">
                ${event?.productId?.price}
              </p>
              <p className="font-bold text-3xl text-primary">
                ${event?.eventPrice}
              </p>
            </div>
            <Badge variant="default" className="text-white bg-secondary">
              {event?.productId?.sold} Sold
            </Badge>
          </div>
          <div className="flex gap-2.5 sm:gap-5 mt-8">
            <div className="text-center bg-blue-200  text-dark py-0.5 px-2 sm:px-3 rounded-md border-2 border-blue-500">
              <p className="text-2xl sm:text-4xl font-bold">{duration?.days}</p>
              <p className="text-xs sm:text-sm font-medium">DAYS</p>
            </div>
            <div className="text-center bg-blue-200  text-dark py-0.5  px-2 sm:px-3 rounded-md border-2 border-blue-500">
              <p className="text-2xl sm:text-4xl font-bold">
                {duration?.hours}
              </p>
              <p className="text-xs sm:text-sm font-medium">HOURS</p>
            </div>
            <div className="text-center bg-blue-200  text-dark py-0.5  px-2 sm:px-3 rounded-md border-2 border-blue-500">
              <p className="text-2xl sm:text-4xl font-bold">
                {duration?.minutes}
              </p>
              <p className="text-xs sm:text-sm font-medium">MINUTES</p>
            </div>
            <div className="text-center bg-blue-200  text-dark py-0.5   px-2 sm:px-3 rounded-md border-2 border-blue-500">
              <p className="text-2xl sm:text-4xl font-bold">
                {duration?.seconds}
              </p>
              <p className="text-xs sm:text-sm font-medium">SECONDS</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Link to={`/product/${event?.productId?._id}`}>
            <Button
              className="w-full bg-secondary text-white text-md  cursor-pointer"
              size={"lg"}
            >
              See Details
            </Button>
          </Link>
          <Button
            className="w-full bg-primary text-white text-md  cursor-pointer"
            size={"lg"}
          >
            Add To Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
