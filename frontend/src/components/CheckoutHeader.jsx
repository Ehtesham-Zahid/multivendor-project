import React from "react";
import { Link } from "react-router";

const CheckoutHeader = () => {
  return (
    <div className="primary-nav flex justify-center py-5 border-b-2 border-transparent   items-center">
      <Link className="text-6xl font-black" to="/">
        Swift<span className="text-primary">Cart</span>
      </Link>
    </div>
  );
};

export default CheckoutHeader;
