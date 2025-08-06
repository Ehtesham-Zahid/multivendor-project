import React from "react";
import CheckoutForm from "../CheckoutForm";
import CheckoutProducts from "../CheckoutProducts";

const CheckoutSection = () => {
  return (
    <div className="grid grid-cols-2">
      <CheckoutForm />
      <CheckoutProducts />
    </div>
  );
};

export default CheckoutSection;
