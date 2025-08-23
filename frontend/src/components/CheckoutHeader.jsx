import React from "react";
import { Link } from "react-router";

const CheckoutHeader = () => {
  return (
    <div className="primary-nav flex justify-center py-5 border-b-2    items-center">
      <Link className="sm:text-6xl text-4xl font-black" to="/">
        Swift<span className="text-primary">Cart</span>
      </Link>
    </div>
  );
};

export default CheckoutHeader;
