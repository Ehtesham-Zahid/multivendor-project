import React from "react";
import { CheckoutSection, Footer, CheckoutHeader } from "../components";

const CheckoutPage = () => {
  return (
    <div className="border-2">
      <div className="w-full">
        <CheckoutHeader />
        <CheckoutSection />
        <Footer />
      </div>
    </div>
  );
};

export default CheckoutPage;
