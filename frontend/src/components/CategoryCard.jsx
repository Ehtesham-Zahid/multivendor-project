import React from "react";

const CategoryCard = ({
  categoryTitle,
  productTitle,
  image,
  bgColor,
  textColor,
  span = 1,
}) => {
  return span === 2 ? (
    <div
      className={`h-80 col-span-2  p-5   rounded-md flex justify-between ${bgColor}   cursor-pointer transition duration-300 hover:scale-102`}
    >
      <div>
        <p className={`${textColor} font-medium text-lg`}>{categoryTitle}</p>
        <p className="uppercase text-5xl text-dark font-bold mb-5">
          {productTitle}
        </p>
      </div>
      <img src={image} className="w-96  object-contain" />
    </div>
  ) : (
    <div
      className={`h-80 col-span-1  p-5   rounded-md ${bgColor}  cursor-pointer transition duration-300 hover:scale-102`}
    >
      <p className={`${textColor} font-medium`}>{categoryTitle}</p>
      <p className="uppercase text-4xl text-dark font-bold mb-5">
        {productTitle}
      </p>
      <img src={image} className="w-96 object-contain" />
    </div>
  );
};

export default CategoryCard;
