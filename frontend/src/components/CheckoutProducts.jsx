import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutCard from "./CheckoutCard";
import { getCart } from "../features/cart/cartSlice";

const CheckoutProducts = () => {
  const dispatch = useDispatch();
  const { cart, totalAmount } = useSelector((state) => state.cart);
  useEffect(() => {
    // Fetch wishlist items if needed
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    dispatch(getCart(cart));
  }, []);

  return (
    <div className="bg-sky-100">
      <div className=" w-2/3 mr-auto p-10">
        {cart?.map((product) => {
          return <CheckoutCard key={product._id} product={product} />;
        })}{" "}
        <div className="flex justify-between items-center">
          <p className="text-2xl font-semibold">Total</p>
          <p className="text-xl font-medium">${totalAmount}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProducts;
