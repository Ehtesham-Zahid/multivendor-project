import { useState } from "react";
import { updateQuantity } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const QuantityCounter = ({
  id,
  parent,
  setProductQuantity,
  productQuantity,
}) => {
  const dispatch = useDispatch();

  // Get initial quantity from localStorage or default to 1
  const getInitialQuantity = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = cart.find((item) => item._id === id);
    return item?.quantity || 1;
  };

  const [quantity, setQuantity] = useState(
    parent === "productDialog" || parent === "singleProductSection"
      ? 1
      : getInitialQuantity()
  );

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;

    setQuantity(newQuantity);
    if (parent === "productDialog" || parent === "singleProductSection") {
      setProductQuantity(newQuantity);
    }

    if (parent === "cart") {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existingItemIndex = cart.findIndex((item) => item._id === id);

      if (existingItemIndex !== -1) {
        // Product already in cart, increase quantity by 1
        cart[existingItemIndex].quantity = newQuantity;
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch(getCart());
    }
  };

  return (
    <div className="rounded-sm border-2 border-dark flex max-w-fit font-semibold text-lg">
      <p
        className="px-2.5 py-0.5 cursor-pointer"
        onClick={() => handleQuantityChange(quantity - 1)}
      >
        -
      </p>
      <p className="px-2.5 py-0.5 text-sky-600">{quantity}</p>
      <p
        className="px-2.5 py-0.5 cursor-pointer"
        onClick={() => handleQuantityChange(quantity + 1)}
      >
        +
      </p>
    </div>
  );
};

export default QuantityCounter;
