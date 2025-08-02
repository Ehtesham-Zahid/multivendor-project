import { Heart, MessageCirclePlus } from "lucide-react";
import ProductImage from "../../assets/images/category-1.jpg";
import Logo from "../../assets/images/logo.png";
import { Badge } from "../../shadcn/badge";
import QuantityCounter from "../QuantityCounter";
import { Button } from "../../shadcn/button";

const SingleProductSection = () => {
  return (
    <section className="xl:w-5/6 2xl:w-4/5 m-auto grid grid-cols-1 lg:grid-cols-2 my-20 gap-x-10">
      <div className="flex gap-8 col-span-1 flex-col 2xl:flex-row">
        <div className="flex flex-row  2xl:flex-col gap-5 justify-between 2xl:justify-center items-center max-w-[2xl]:w-full ">
          <div className="w-36 aspect-square rounded-md overflow-hidden">
            <img src={ProductImage} className="w-full h-full object-cover" />
          </div>
          <div className="w-36 aspect-square rounded-md overflow-hidden">
            <img src={ProductImage} className="w-full h-full object-cover" />
          </div>
          <div className="w-36 aspect-square rounded-md overflow-hidden">
            <img src={ProductImage} className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="w-[500px] aspect-square overflow-hidden rounded-sm m-auto">
          <img src={ProductImage} className="w-full h-full object-cover" />
        </div>
      </div>
      <div>
        <div className="border-zinc-300 border-b-2 pb-5">
          <p className="text-3xl font-bold text-sky-800 mb-3 flex items-center justify-between ">
            Cloud Feel Muscle Tee <Heart className="cursor-pointer" />
          </p>
          <p className=" leading-5">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum
            atque autem nesciunt ex mollitia omnis nobis officiis voluptates
            velit repudiandae repellat accusamus facere, tempore perspiciatis
            ratione ut architecto alias? Sint!
          </p>
        </div>
        <div className="my-3 flex flex-col gap-5 border-zinc-300 border-b-2 pb-5">
          <div className="flex justify-between">
            <p className="text-3xl font-bold text-sky-500 ">$550</p>

            <Badge variant="default" className="text-white bg-secondary">
              120 Sold
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <p className="text-xl font-semibold">Quantity: </p>{" "}
              <QuantityCounter />
            </div>
            <p className="font-m">
              <strong>99</strong> items left
            </p>
          </div>
        </div>
        <div className="flex justify-between gap-5 w-full items-center border-b-2 border-zinc-300 pb-5">
          <div className="flex gap-5 items-center">
            <img
              src={Logo}
              className="rounded-md w-16 h-16  object-contain border-2 "
            />
            <div className="flex flex-col">
              <p className="font-bold">Hyper Products</p>
              <p>5 Ratings</p>
            </div>
          </div>
          <Button className="text-white cursor-pointer">
            <MessageCirclePlus /> Contact
          </Button>
        </div>
        <div>
          <Button className="w-full my-8 text-md text-white ">
            Add To Cart
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SingleProductSection;
