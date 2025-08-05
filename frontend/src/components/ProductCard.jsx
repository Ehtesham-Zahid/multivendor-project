import { Eye, Heart, ShoppingCart, Star } from "lucide-react";
import ProductImage from "../assets/images/category-1.jpg";
import { Badge } from "../shadcn/badge";
import ProductDialog from "./ProductDialog";
import { useState } from "react";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  const [isWished, setIsWished] = useState(false);
  return (
    <Link
      to={`/product/${product._id}`}
      className="col-span-1 rounded-md  bg-white p-3 shadow-xl shadow-zinc-300 cursor-pointer relative hover:shadow-2xl hover:shadow-zinc-400 w-80 h-90 "
    >
      <div className="flex flex-col absolute right-5 top-5 gap-y-2 z-10">
        <Heart
          className="bg-white rounded-sm p-1 hover:bg-orange-300 "
          size={"28px"}
          fill={isWished ? "red" : "white"}
          onClick={() => setIsWished((prev) => !prev)}
        />
        <ProductDialog product={product} />
        <ShoppingCart
          className="bg-white rounded-sm p-1 hover:bg-orange-300 "
          size={"28px"}
        />
      </div>
      <div className="overflow-hidden rounded-md   aspect-square w-48 h-48 mx-auto  ">
        <img
          src={product?.images[0]}
          className="rounded-md hover:scale-103 transition duration-300 object-contain"
        />
      </div>
      <p className="text-sm font-bold text-primary hover:underline underline-offset-[4px] decoration-2">
        {product?.shopId?.shopName}
      </p>
      <p className="text-xl font-bold mt-2">{product?.name}</p>
      <div className="flex text-sm gap-0.5 items-center mt-4">
        <Star size="18px" />
        <Star size="18px" />
        <Star size="18px" />
        <Star size="18px" />
        <Star size="18px" />
        <p className="font-semibold ml-1">({product?.rating})</p>
      </div>
      <div className="flex justify-between mt-5">
        <p className="font-bold text-2xl">{product?.price}$</p>
        <Badge variant="default" className="text-white bg-secondary">
          {product?.sold} Sold
        </Badge>
      </div>
    </Link>
  );
};

export default ProductCard;
