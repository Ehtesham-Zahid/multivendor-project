import { useEffect } from "react";
import CheckoutForm from "../CheckoutForm";
import CheckoutProducts from "../CheckoutProducts";
import { useDispatch } from "react-redux";
import { getUserAddressThunk } from "../../features/address/addressSlice";
import { getCart } from "../../features/cart/cartSlice";

const CheckoutSection = () => {
  const dispatch = useDispatch();
  useEffect(() => {
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
