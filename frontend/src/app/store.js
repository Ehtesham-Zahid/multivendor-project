import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import shopReducer from "../features/shop/shopSlice";
import profileReducer from "../features/profile/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    shop: shopReducer,
    profile: profileReducer,
  },
});
