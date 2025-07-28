import EventImage from "../assets/images/category-1.jpg";
import { Badge } from "../shadcn/badge";
import { Button } from "../shadcn/button";

const EventCard = () => {
  return (
    <div className="bg-zinc-300 grid grid-cols-2 gap-5 p-5 rounded-md">
      <div className="bg-white rounded-md">
        <img
          src={EventImage}
          className="w-full h-full object-contain rounded-md"
        />
      </div>
      <div className="flex flex-col justify-between bg-white p-5 rounded-md">
        <div>
          <p className="text-start text-3xl font-bold w-5/6">
            Hypersonic bluetooth headphones powered by Bloody
          </p>
          <p className="text-sm mt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio vel
            ipsum nam placeat aut tenetur illo consectetur officiis itaque
            nulla. Ut cumque reprehenderit sunt inventore totam sed, omnis
            tempora sequi!
          </p>
          <div className="flex justify-between mt-8">
            <p className="font-bold text-2xl">110$</p>
            <Badge variant="default" className="text-white bg-secondary">
              120 Sold
            </Badge>
          </div>
          <div className="flex gap-5 mt-8">
            <div className="text-center bg-blue-200  text-dark py-0.5 px-3 rounded-md border-2 border-blue-500">
              <p className="text-4xl font-bold">12</p>
              <p className="text-sm font-medium">DAYS</p>
            </div>
            <div className="text-center bg-blue-200  text-dark py-0.5 px-3 rounded-md border-2 border-blue-500">
              <p className="text-4xl font-bold">04</p>
              <p className="text-sm font-medium">HOURS</p>
            </div>
            <div className="text-center bg-blue-200  text-dark py-0.5 px-3 rounded-md border-2 border-blue-500">
              <p className="text-4xl font-bold">50</p>
              <p className="text-sm font-medium">MINUTES</p>
            </div>
            <div className="text-center bg-blue-200  text-dark py-0.5 px-3 rounded-md border-2 border-blue-500">
              <p className="text-4xl font-bold">60</p>
              <p className="text-sm font-medium">SECONDS</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Button
            className="w-full bg-secondary text-white text-md  cursor-pointer"
            size={"lg"}
          >
            See Details
          </Button>
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
