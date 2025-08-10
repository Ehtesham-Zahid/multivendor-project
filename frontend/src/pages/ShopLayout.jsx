import React from "react";
import { CheckoutHeader } from "../components";

const ShopLayout = () => {
  return (
    <div>
      <CheckoutHeader />
      <Outlet />
    </div>
  );
};

export default ShopLayout;
