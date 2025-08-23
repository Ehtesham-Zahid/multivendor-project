import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCouponApi,
  deleteCouponApi,
  validateCouponApi,
  getAllCouponCodesAdminApi,
} from "./couponAPI";

export const createCouponThunk = createAsyncThunk(
  "coupon/createCoupon",
  async (data, thunkAPI) => {
    try {
      const res = await createCouponApi(data);
      return res.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      return thunkAPI.rejectWithValue(errorMessage);
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
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getAllCouponsAdminThunk = createAsyncThunk(
  "coupon/getAllCouponsAdmin",
  async ({ page, limit, status }, thunkAPI) => {
    try {
      const res = await getAllCouponCodesAdminApi({ page, limit, status });
      return res.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      return thunkAPI.rejectWithValue(errorMessage);
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
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  coupon: null,
  coupons: [],
  isLoading: false,
  error: null,
  success: false,
  totalCoupons: 0,
  totalCouponsPages: 1,
  currentCouponPage: 1,
  createCouponLoading: false,
  deleteCouponLoading: false,
  validateCouponLoading: false,
  couponsLoading: false,
  getAllCouponsAdminLoading: false,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCouponThunk.pending, (state) => {
        state.createCouponLoading = true;
        state.error = null;
      })
      .addCase(createCouponThunk.fulfilled, (state, action) => {
        state.createCouponLoading = false;
        if (action.payload && action.payload._id) {
          state.coupons.push(action.payload);
        }
        // state.totalCoupons++;
      })
      .addCase(createCouponThunk.rejected, (state, action) => {
        state.createCouponLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(validateCouponThunk.pending, (state) => {
        state.validateCouponLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(validateCouponThunk.fulfilled, (state, action) => {
        state.validateCouponLoading = false;
        state.success = true;
        state.coupon = action.payload;
      })
      .addCase(validateCouponThunk.rejected, (state, action) => {
        state.validateCouponLoading = false;
        state.error = action.payload;
        state.success = false;
      });
    builder
      .addCase(getAllCouponsAdminThunk.pending, (state) => {
        state.getAllCouponsAdminLoading = true;
        state.error = null;
      })
      .addCase(getAllCouponsAdminThunk.fulfilled, (state, action) => {
        state.getAllCouponsAdminLoading = false;
        state.coupons = action.payload.couponCodes;
        state.totalCoupons = action.payload.totalCouponCodes;
        state.totalCouponsPages = action.payload.totalCouponCodesPages;
      })
      .addCase(getAllCouponsAdminThunk.rejected, (state, action) => {
        state.getAllCouponsAdminLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(deleteCouponThunk.pending, (state) => {
        state.deleteCouponLoading = true;
        state.error = null;
      })
      .addCase(deleteCouponThunk.fulfilled, (state, action) => {
        state.deleteCouponLoading = false;
        if (action.payload && action.payload._id) {
          state.coupons = state.coupons.filter(
            (coupon) => coupon._id !== action.payload._id
          );
          state.totalCoupons--;
        }
      })
      .addCase(deleteCouponThunk.rejected, (state, action) => {
        state.deleteCouponLoading = false;
        state.error = action.payload;
      });
  },
});

export default couponSlice.reducer;
