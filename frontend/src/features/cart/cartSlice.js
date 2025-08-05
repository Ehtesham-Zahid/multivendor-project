import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [], // Array of { _id, quantity, ...productInfo }
  isLoading: false,
  error: null,
  success: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCart(state, action) {
      state.cart = action.payload;
    },
    addToCart(state, action) {
      const product = action.payload;
      const existingItem = state.cart.find((item) => item._id === product._id);

      if (existingItem) {
        existingItem.quantity += product.quantity || 1;
      } else {
        state.cart.push({ ...product, quantity: product.quantity || 1 });
      }
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },
    updateQuantity(state, action) {
      const { _id, quantity } = action.payload;
      const item = state.cart.find((item) => item._id === _id);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {},
});

export const { getCart, addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
