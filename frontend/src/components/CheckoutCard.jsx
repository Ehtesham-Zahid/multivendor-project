import React from "react";

const CheckoutCard = ({ product }) => {
  return (
    <div className="flex justify-between items-start w-full mb-5">
      <div className="flex gap-2">
        <div className="relative">
          <img
            src={product?.images[0]}
            className="w-16 h-16 object-contain aspect-square bg-background rounded-md"
          />
          <p className="text-sm -top-3.5 absolute -right-3.5 p-2.5  font-bold bg-sky-500 text-white rounded-full h-1 w-1 flex items-center justify-center">
            {product?.quantity}
          </p>
        </div>
        <p className="text- font-medium">{product?.name}</p>
      </div>
      <p className="text-">${product?.price}</p>
    </div>
  );
};

export default CheckoutCard;
