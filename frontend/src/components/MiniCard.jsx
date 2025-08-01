import React from "react";
import Logo from "../assets/images/category-1.jpg";

const MiniCard = () => {
  return (
    <div className="flex gap-5 w-full p-2">
      <img className="w-32 h-32  rounded-sm object-cover" src={Logo} />
      <div className="flex flex-col justify-between">
        {/* <div> */}
        <p className="font-bold text-lg text-blue-800">Best headpones</p>
        <p className="font-bold text-2xl mb-2">55$</p>
        {/* </div> */}
        <div className="flex items-center gap-x-2">
          <div className="rounded-sm border-2 border-primary flex max-w-fit font-semibold text-lg">
            <p className="px-2.5 py-0.5">+</p>
            <p className="px-2.5 py-0.5">10</p>
            <p className="px-2.5 py-0.5">-</p>
          </div>
          <p className="underline underline-offset-2 font-semibold hover:text-red-500 cursor-pointer">
            Remove
          </p>
        </div>
      </div>
    </div>
  );
};

export default MiniCard;
