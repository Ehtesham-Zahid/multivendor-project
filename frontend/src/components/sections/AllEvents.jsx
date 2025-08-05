import { useDispatch, useSelector } from "react-redux";
import { getActiveEventsThunk } from "../../features/event/eventSlice";
import EventCard from "../EventCard";
import { useEffect } from "react";
import Spinner from "../Spinner";

const AllEvents = () => {
  const dispatch = useDispatch();
  const { allEvents, isLoading, error } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(getActiveEventsThunk());
  }, []);
  return (
    <section className="w-custom m-auto min-h-screen">
      <p className="text-start text-4xl font-black tracking-wide mt-20 mb-10">
        All Events
      </p>
      <div className="flex flex-col gap-y-10">
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <p className="text-red-500 text-center">Error: {error}</p>
        ) : allEvents?.length === 0 ? (
          <p className="text-gray-500 text-center">No events found</p>
        ) : (
          allEvents?.map((event) => <EventCard key={event._id} event={event} />)
        )}
      </div>
    </section>
  );
};

export default AllEvents;
