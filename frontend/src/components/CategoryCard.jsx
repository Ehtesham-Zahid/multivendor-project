import React, { useState } from "react";
import { Link } from "react-router"; // you probably meant "react-router-dom"

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
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Link
      to={`/category/${categoryTitle}`}
      className={`relative h-72 p-3 flex flex-col justify-end rounded-md ${bgColor} cursor-pointer transition duration-300 hover:scale-102`}
    >
      {/* Skeleton while image is loading */}
      {isLoading && (
        <div className="absolute inset-0 animate-pulse rounded-md bg-gray-200" />
      )}

      <div
        className={`absolute top-5 transition-opacity ${isLoading ? "opacity-0" : "opacity-100"}`}
      >
        <p className={`${textColor} font-medium`}>{categoryTitle}</p>
        <p className="uppercase text-3xl text-dark font-bold">{productTitle}</p>
      </div>

      <img
        src={image}
        alt={`${categoryTitle} - ${productTitle}`}
        className={`h-48 w-full object-contain transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        loading={loading}
        decoding="async"
        fetchPriority="high"
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />
    </Link>
  );
};

export default CategoryCard;
