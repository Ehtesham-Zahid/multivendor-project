import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutCard from "./CheckoutCard";
import { getCart } from "../features/cart/cartSlice";
import CouponCodeForm from "./CouponCodeForm";

const CheckoutProducts = () => {
  const dispatch = useDispatch();
  const { cart, totalAmount } = useSelector((state) => state.cart);
  const { coupon } = useSelector((state) => state.coupon);
  useEffect(() => {
    // Fetch wishlist items if needed
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    dispatch(getCart(cart));
  }, []);

  return (
    <div className="bg-sky-100">
      <div className=" w-3/5 mr-auto p-10">
        {cart?.map((product) => {
          return <CheckoutCard key={product._id} product={product} />;
        })}{" "}
        <CouponCodeForm totalAmount={totalAmount} />
        <div className="flex justify-between items-center mt-5">
          <p className="text-  ">subtotal</p>
          <p className="  ">${totalAmount}</p>
        </div>
        <div className="flex justify-between items-center mt-3">
          <p className="text-   ">shipping</p>
          <p className="  ">${totalAmount}</p>
        </div>
        {coupon && (
          <div className="flex justify-between items-center mt-3">
            <p className="text-lg font-semibold text-sky-500">Discount</p>
            <p className="text-lg font-medium text-sky-500">
              ${coupon.discountAmount}
            </p>
          </div>
        )}
        {coupon ? (
          <div className="flex justify-between items-center mt-3">
            <p className="text-xl font-semibold">Total</p>
            <p className=" text-xl font-medium ">${coupon.newTotal}</p>
          </div>
        ) : (
          <div className="flex justify-between items-center mt-5">
            <p className="text-xl font-semibold">Total</p>
            <p className="text-xl font-medium">${totalAmount}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutProducts;
