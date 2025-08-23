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
      <div className=" w-11/12 lg:w-4/5 xl:w-3/5 mx-auto md:mx-0 md:mr-auto p-10">
        {cart?.map((product) => {
          return <CheckoutCard key={product._id} product={product} />;
        })}{" "}
        <CouponCodeForm totalAmount={totalAmount} />
        <div className="flex justify-between items-center mt-5">
          <p className=" font-medium  text-gray-600">Subtotal</p>
          <p className=" font-medium text-gray-600">
            ${Math.round(totalAmount)}
          </p>
        </div>
        {coupon && (
          <>
            <div className="flex justify-between items-center mt-3">
              <p className=" font-semibold text-cyan-600">Discount</p>
              <p className=" font-medium text-cyan-600">
                - ${Math.round(coupon.discountAmount)}
              </p>
            </div>
            <div className="flex justify-between items-center mt-3">
              <p className=" font-semibold text-cyan-600">
                Subtotal after discount
              </p>
              <p className=" font-medium text-cyan-600">
                ${Math.round(coupon.newTotal)}
              </p>
            </div>
          </>
        )}
        <div className="flex justify-between items-center mt-3">
          <p className=" font-medium  text-gray-600">Shipping</p>
          <p className=" font-medium text-gray-600">+${100}</p>
        </div>
        {coupon ? (
          <div className="flex justify-between items-center mt-3">
            <p className=" font-semibold text-black text-xl">Total</p>
            <p className="text-xl font-medium text-black">
              ${Math.round(coupon.newTotal + 100)}
            </p>
          </div>
        ) : (
          <div className="flex justify-between items-center mt-3">
            <p className="text-xl font-semibold text-black">Total</p>
            <p className="text-xl font-medium text-black">
              ${Math.round(totalAmount + 100)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutProducts;
