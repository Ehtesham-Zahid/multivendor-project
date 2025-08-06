import { useDispatch, useSelector } from "react-redux";
import EventCard from "../EventCard";
import ProductCard from "../ProductCard";
import { getActiveEventsThunk } from "../../features/event/eventSlice";
import { useEffect } from "react";

const PopularEvents = () => {
  const dispatch = useDispatch();
  const { popularEvent } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(getActiveEventsThunk({ sortBy: "sales", limit: 1 }));
  }, []);

  return popularEvent ? (
    <section className="w-custom m-auto">
      <p className="text-start text-4xl font-black tracking-wide mt-20 mb-10">
        Popular Events
      </p>
      <div className="flex flex-col">
        <EventCard event={popularEvent} />
      </div>
    </section>
  ) : null;
};

export default PopularEvents;
