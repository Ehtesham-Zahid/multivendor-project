import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCouponApi,
  deleteCouponApi,
  validateCouponApi,
} from "./couponAPI";

export const createCouponThunk = createAsyncThunk(
  "coupon/createCoupon",
  async (data, thunkAPI) => {
    try {
      const res = await createCouponApi(data);
      console.log(res);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteCouponThunk = createAsyncThunk(
  "coupon/deleteCoupon",
  async (couponId, thunkAPI) => {
    try {
      const res = await deleteCouponApi(couponId);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const validateCouponThunk = createAsyncThunk(
  "coupon/validateCoupon",
  async (data, thunkAPI) => {
    try {
      const res = await validateCouponApi(data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  coupon: null,
  isLoading: false,
  error: null,
  success: false,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCouponThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createCouponThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.coupon = action.payload;
      })
      .addCase(createCouponThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
    builder
      .addCase(validateCouponThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(validateCouponThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.coupon = action.payload;
      })
      .addCase(validateCouponThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export default couponSlice.reducer;
