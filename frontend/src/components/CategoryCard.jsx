import React from "react";
import { Link } from "react-router";

const CategoryCard = ({
  categoryTitle,
  productTitle,
  image,
  bgColor,
  textColor,
  span = 1,
}) => {
  return span === 2 ? (
    <Link
      to={`/category/${categoryTitle}`}
      className={`h-72 w-full col-span-2  p-5   rounded-md flex justify-between ${bgColor}   cursor-pointer transition duration-300 hover:scale-102`}
    >
      <div>
        <p className={`${textColor} font-medium text-lg text-nowrap`}>
          {categoryTitle}
        </p>
        <p className="uppercase text-4xl text-dark font-bold mb-5">
          {productTitle}
        </p>
      </div>
      <img src={image} className="w-96  object-contain" />
    </Link>
  ) : (
    <Link
      to={`/category/${categoryTitle}`}
      className={`relative h-72 col-span-1  p-3 flex flex-col justify-end   rounded-md ${bgColor}  cursor-pointer transition duration-300 hover:scale-102`}
    >
      <div className="absolute top-5 ">
        <p className={`${textColor} font-medium`}>{categoryTitle}</p>
        <p className="uppercase text-3xl text-dark font-bold ">
          {productTitle}
        </p>
      </div>
      <img src={image} className="h-48   object-contain" />
    </Link>
  );
};

export default CategoryCard;
