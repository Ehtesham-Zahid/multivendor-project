import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createReviewApi,
  getShopReviewsApi,
  getProductReviewsApi,
  updateReviewApi,
  deleteReviewApi,
} from "./reviewApi";

export const createReviewThunk = createAsyncThunk(
  "review/createReview",
  async (reviewData, thunkAPI) => {
    try {
      const res = await createReviewApi(reviewData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getShopReviewsThunk = createAsyncThunk(
  "review/getShopReviews",
  async (shopId, thunkAPI) => {
    try {
      const res = await getShopReviewsApi(shopId);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getProductReviewsThunk = createAsyncThunk(
  "review/getProductReviews",
  async (productId, thunkAPI) => {
    try {
      const res = await getProductReviewsApi(productId);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateReviewThunk = createAsyncThunk(
  "review/updateReview",
  async ({ reviewId, reviewData }, thunkAPI) => {
    try {
      const res = await updateReviewApi(reviewId, reviewData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteReviewThunk = createAsyncThunk(
  "review/deleteReview",
  async (reviewId, thunkAPI) => {
    try {
      const res = await deleteReviewApi(reviewId);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  productReviews: [],
  shopReviews: [],
  review: null,
  isLoading: false,
  error: null,
  success: false,
  createReviewLoading: false,
  getShopReviewsLoading: false,
  getProductReviewsLoading: false,
  updateReviewLoading: false,
  deleteReviewLoading: false,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReviewThunk.pending, (state) => {
        state.createReviewLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createReviewThunk.fulfilled, (state, action) => {
        state.createReviewLoading = false;
        state.productReviews.push(action.payload.review);
        state.success = true;
      })
      .addCase(createReviewThunk.rejected, (state, action) => {
        state.createReviewLoading = false;
        state.error = action.payload;
        state.success = false;
      });
    builder
      .addCase(getShopReviewsThunk.pending, (state) => {
        state.getShopReviewsLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getShopReviewsThunk.fulfilled, (state, action) => {
        state.getShopReviewsLoading = false;
        state.shopReviews = action.payload.reviews;
        state.success = true;
      })
      .addCase(getShopReviewsThunk.rejected, (state, action) => {
        state.getShopReviewsLoading = false;
        state.error = action.payload;
        state.success = false;
      });
    builder
      .addCase(getProductReviewsThunk.pending, (state) => {
        state.getProductReviewsLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getProductReviewsThunk.fulfilled, (state, action) => {
        state.getProductReviewsLoading = false;
        state.productReviews = action.payload.reviews;
        state.success = true;
      })
      .addCase(getProductReviewsThunk.rejected, (state, action) => {
        state.getProductReviewsLoading = false;
        state.error = action.payload;
        state.success = false;
      });
    builder
      .addCase(updateReviewThunk.pending, (state) => {
        state.updateReviewLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateReviewThunk.fulfilled, (state, action) => {
        state.updateReviewLoading = false;
        state.review = action.payload;
        state.success = true;
      })
      .addCase(updateReviewThunk.rejected, (state, action) => {
        state.updateReviewLoading = false;
        state.error = action.payload;
        state.success = false;
      });
    builder
      .addCase(deleteReviewThunk.pending, (state) => {
        state.deleteReviewLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteReviewThunk.fulfilled, (state, action) => {
        state.deleteReviewLoading = false;
        state.review = action.payload;
        state.success = true;
      })
      .addCase(deleteReviewThunk.rejected, (state, action) => {
        state.deleteReviewLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { logout, resetError } = reviewSlice.actions;
export default reviewSlice.reducer;
