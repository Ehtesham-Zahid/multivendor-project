import EventCard from "../EventCard";

const AllEvents = () => {
  return (
    <section className="w-custom m-auto">
      <p className="text-start text-4xl font-black tracking-wide mt-20 mb-10">
        All Events
      </p>
      <div className="flex flex-col gap-y-10">
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </section>
  );
};

export default AllEvents;
