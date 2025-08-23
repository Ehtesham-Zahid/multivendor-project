import { useDispatch, useSelector } from "react-redux";
import EventCard from "../EventCard";
import { getPopularEventThunk } from "../../features/event/eventSlice";
import { useEffect } from "react";
import Spinner from "../Spinner";

const PopularEvents = () => {
  const dispatch = useDispatch();
  const { popularEvent, isPopularEventLoading } = useSelector(
    (state) => state.event
  );

  useEffect(() => {
    dispatch(getPopularEventThunk());
  }, [dispatch]);

  return popularEvent ? (
    <section className="w-custom m-auto">
      <p className="text-start sm:text-4xl text-3xl font-black tracking-wide mt-20 mb-10">
        Popular Events
      </p>
      <div className="flex flex-col">
        <EventCard event={popularEvent} />
      </div>
    </section>
  ) : null;
};

export default PopularEvents;
