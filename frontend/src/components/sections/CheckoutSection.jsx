import React, { useEffect } from "react";
import CheckoutForm from "../CheckoutForm";
import CheckoutProducts from "../CheckoutProducts";
import { getCurrentUser } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUserAddressThunk } from "../../features/address/addressSlice";
import { getCart } from "../../features/cart/cartSlice";

const CheckoutSection = () => {
  // const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getUserAddressThunk());
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    dispatch(getCart(cart));
  }, []);
  return (
    <div className="grid grid-cols-2">
      <CheckoutForm />
      <CheckoutProducts />
    </div>
  );
};

export default CheckoutSection;
