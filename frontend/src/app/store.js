import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import shopReducer from "../features/shop/shopSlice";
import profileReducer from "../features/profile/profileSlice";
import productReducer from "../features/product/productSlice";
import eventReducer from "../features/event/eventSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import cartReducer from "../features/cart/cartSlice";
import addressReducer from "../features/address/addressSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    shop: shopReducer,
    profile: profileReducer,
    product: productReducer,
    event: eventReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    address: addressReducer,
  },
});
