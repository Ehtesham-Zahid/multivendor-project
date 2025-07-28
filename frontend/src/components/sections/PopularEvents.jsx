import EventCard from "../EventCard";
import ProductCard from "../ProductCard";

const PopularEvents = () => {
  return (
    <section className="w-custom m-auto">
      <p className="text-start text-4xl font-black tracking-wide mt-20 mb-10">
        Popular Events
      </p>
      <div className="flex">
        <EventCard />
      </div>
    </section>
  );
};

export default PopularEvents;
