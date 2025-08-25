import React from "react";
import { Link } from "react-router";

const CategoryCard = ({
  categoryTitle,
  productTitle,
  image,
  bgColor,
  textColor,
  span = 1,
  className,
  loading = "lazy",
}) => {
  return (
    <Link
      to={`/category/${categoryTitle}`}
      className={`relative h-72 p-3 flex flex-col justify-end rounded-md ${bgColor} cursor-pointer transition duration-300 hover:scale-102`}
    >
      <div className="absolute top-5">
        <p className={`${textColor} font-medium`}>{categoryTitle}</p>
        <p className="uppercase text-3xl text-dark font-bold">{productTitle}</p>
      </div>
      <img
        src={image}
        alt={`${categoryTitle} - ${productTitle}`}
        className="h-48 w-full object-contain"
        loading={loading}
        decoding="async"
        fetchPriority="high"
      />
    </Link>
  );
};

export default CategoryCard;
