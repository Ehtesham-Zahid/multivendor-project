import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
  getWishlistLoading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    getWishlist(state) {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      state.wishlist = wishlist;
    },
    addToWishlist(state, action) {
      state.wishlist.push(action.payload);
    },
    removeFromWishlist(state, action) {
      state.wishlist = state.wishlist.filter(
        (item) => item._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {},
});

export const { getWishlist, addToWishlist, removeFromWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
