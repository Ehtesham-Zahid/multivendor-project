import { Eye, Heart, ShoppingCart, Star } from "lucide-react";
import ProductImage from "../assets/images/category-1.jpg";
import { Badge } from "../shadcn/badge";
import ProductDialog from "./ProductDialog";
import { useState } from "react";

const ProductCard = () => {
  const [isWished, setIsWished] = useState(false);
  return (
    <div className="col-span-1 rounded-md  bg-white p-3 shadow-xl shadow-zinc-300 cursor-pointer relative hover:shadow-2xl hover:shadow-zinc-400 ">
      <div className="flex flex-col absolute right-5 top-5 gap-y-2 z-10">
        <Heart
          className="bg-white rounded-sm p-1 hover:bg-orange-300 "
          size={"28px"}
          fill={isWished ? "red" : "white"}
          onClick={() => setIsWished((prev) => !prev)}
        />
        <ProductDialog />
        <ShoppingCart
          className="bg-white rounded-sm p-1 hover:bg-orange-300 "
          size={"28px"}
        />
      </div>
      <div className="overflow-hidden rounded-md">
        <img
          src={ProductImage}
          className="rounded-md hover:scale-103 transition duration-300"
        />
      </div>
      <p className="text-sm font-bold text-primary hover:underline underline-offset-[4px] decoration-2">
        Hyper Products
      </p>
      <p className="text-xl font-bold mt-3">Hyper hypersonic Headphones</p>
      <div className="flex text-sm gap-0.5 items-center mt-5">
        <Star size="18px" />
        <Star size="18px" />
        <Star size="18px" />
        <Star size="18px" />
        <Star size="18px" />
        <p className="font-semibold ml-1">(5.0)</p>
      </div>
      <div className="flex justify-between mt-5">
        <p className="font-bold text-2xl">110$</p>
        <Badge variant="default" className="text-white bg-secondary">
          120 Sold
        </Badge>
      </div>
    </div>
  );
};

export default ProductCard;
