import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createOrderApi,
  getOrderApi,
  getShopOrdersApi,
  getUserOrdersApi,
  requestRefundApi,
} from "./orderAPI";

export const createOrderThunk = createAsyncThunk(
  "order/createOrder",
  async (data, thunkAPI) => {
    try {
      const res = await createOrderApi(data);
      return res.data;
    } catch (error) {
      console.log("order slice", error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getShopOrdersThunk = createAsyncThunk(
  "order/getShopOrders",
  async (_, thunkAPI) => {
    try {
      const res = await getShopOrdersApi();
      return res.data;
    } catch (error) {
      console.log("order slice", error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getUserOrdersThunk = createAsyncThunk(
  "order/getUserOrders",
  async (_, thunkAPI) => {
    try {
      const res = await getUserOrdersApi();
      console.log("user orders", res.data);
      return res.data;
    } catch (error) {
      console.log("order slice", error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getOrderThunk = createAsyncThunk(
  "order/getOrder",
  async (orderId, thunkAPI) => {
    try {
      const res = await getOrderApi(orderId);
      return res.data;
    } catch (error) {
      console.log("order slice", error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const requestRefundThunk = createAsyncThunk(
  "order/requestRefund",
  async (orderId, thunkAPI) => {
    try {
      const res = await requestRefundApi(orderId);
      return res.data;
    } catch (error) {
      console.log("order slice", error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  order: null,
  userOrders: [],
  shopOrders: [],
  singleOrder: null,
  isLoading: false,
  error: null,
  success: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.order = action.payload;
        // state.userOrders.push(action.payload);
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
    builder
      .addCase(getShopOrdersThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getShopOrdersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shopOrders = action.payload;
      })
      .addCase(getShopOrdersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getUserOrdersThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserOrdersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userOrders = action.payload;
      })
      .addCase(getUserOrdersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getOrderThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleOrder = action.payload;
      })
      .addCase(getOrderThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(requestRefundThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestRefundThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.singleOrder = action.payload;
      })
      .addCase(requestRefundThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
