import { useState } from "react";
import { updateQuantity } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const QuantityCounter = ({ quantityValue, id }) => {
  const [quantity, setQuantity] = useState(quantityValue || 1);
  const dispatch = useDispatch();

  const handleQuantityChange = (newQuantity) => {
    console.log("New Quantity:", newQuantity);
    if (newQuantity < 1) return; // Prevent negative or zero quantity
    setQuantity(newQuantity);
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = cart.findIndex((item) => item._id === id);
    if (itemIndex !== -1) {
      cart[itemIndex].quantity = newQuantity;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    dispatch(updateQuantity({ _id: id, quantity: newQuantity }));
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
