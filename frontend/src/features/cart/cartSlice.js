import { createSlice } from "@reduxjs/toolkit";

function calculateTotal(cart) {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

const initialState = {
  cart: [], // Array of { _id, quantity, ...productInfo }
  isLoading: false,
  error: null,
  success: false,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCart(state, action) {
      state.cart = action.payload;
      state.totalAmount = calculateTotal(state.cart);
    },
    addToCart(state, action) {
      const product = action.payload;
      const existingItem = state.cart.find((item) => item._id === product._id);

      if (existingItem) {
        existingItem.quantity += product.quantity || 1;
      } else {
        state.cart.push({ ...product, quantity: product.quantity || 1 });
      }
      state.totalAmount = calculateTotal(state.cart);
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
      state.totalAmount = calculateTotal(state.cart);
    },
    updateQuantity(state, action) {
      const { _id, quantity } = action.payload;
      const item = state.cart.find((item) => item._id === _id);
      if (item) {
        item.quantity = quantity;
      }
      state.totalAmount = calculateTotal(state.cart);
    },
    clearCart(state) {
      state.cart = [];
      state.totalAmount = 0;
    },
  },
  extraReducers: (builder) => {},
});

export const { getCart, addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
