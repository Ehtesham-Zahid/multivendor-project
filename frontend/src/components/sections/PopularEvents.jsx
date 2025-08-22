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

  return isPopularEventLoading ? (
    <Spinner />
  ) : popularEvent ? (
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
