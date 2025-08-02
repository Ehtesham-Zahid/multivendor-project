import React from "react";
import Logo from "../assets/images/category-1.jpg";
import QuantityCounter from "./QuantityCounter";
import { ShoppingCart, ShoppingCartIcon } from "lucide-react";

const MiniCard = ({ sheet }) => {
  return (
    <div className="flex gap-5 w-full p-2">
      <img className="w-32 h-32  rounded-sm object-cover" src={Logo} />
      <div className="flex flex-col justify-between">
        <div>
          <p className="font-semibold text-  text-black mb-1">Best headpones</p>
          {sheet !== "wishlist" ? (
            <p className="    tracking-tight text-gray-500  text-sm">$55 * 5</p>
          ) : null}

          <p className="font-bold text-xl   text-sky-500">$550</p>
        </div>
        <div className="flex items-center gap-x-2">
          {sheet === "wishlist" ? (
            <ShoppingCart
              className="bg-white rounded-sm p-1 hover:bg-sky-200 cursor-pointer "
              size={"32px"}
            />
          ) : (
            <QuantityCounter />
          )}
          <p className="underline underline-offset-2 font-semibold hover:text-red-500 cursor-pointer">
            Remove
          </p>
        </div>
      </div>
    </div>
  );
};

export default MiniCard;
