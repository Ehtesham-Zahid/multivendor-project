import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createOrderApi,
  getOrderApi,
  getShopOrderByIdApi,
  getShopOrdersApi,
  getShopOrdersByCurrentShopApi,
  // getUserOrdersApi,
  getUserParentOrdersApi,
  getUserShopOrdersApi,
  requestRefundApi,
  updateDeliveryStatusApi,
  updateRefundStatusApi,
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
  async (refundStatus, thunkAPI) => {
    try {
      const res = await getShopOrdersApi(refundStatus);
      return res.data;
    } catch (error) {
      console.log("order slice", error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getUserParentOrdersThunk = createAsyncThunk(
  "order/getUserOrders",
  async (_, thunkAPI) => {
    try {
      const res = await getUserParentOrdersApi();
      console.log("user parent orders", res.data);
      return res.data;
    } catch (error) {
      console.log("order slice", error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getOrderThunk = createAsyncThunk(
  "order/getOrder",
  async ({ orderId, shopId }, thunkAPI) => {
    try {
      const res = await getOrderApi(orderId, shopId);
      return res.data;
    } catch (error) {
      console.log("order slice", error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const requestRefundThunk = createAsyncThunk(
  "order/requestRefund",
  async (shopOrderId, thunkAPI) => {
    try {
      const res = await requestRefundApi(shopOrderId);
      return res.data;
    } catch (error) {
      console.log("order slice", error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getShopOrdersByCurrentShopThunk = createAsyncThunk(
  "order/getShopOrdersByCurrentShop",
  async (refundOnly = false, thunkAPI) => {
    try {
      const res = await getShopOrdersByCurrentShopApi(refundOnly);
      return res.data;
    } catch (error) {
      console.log("order slice", error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getShopOrderByIdThunk = createAsyncThunk(
  "order/getShopOrderById",
  async (orderId, thunkAPI) => {
    try {
      const res = await getShopOrderByIdApi(orderId);
      return res.data.shopOrder;
    } catch (error) {
      console.log("order slice", error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateDeliveryStatusThunk = createAsyncThunk(
  "order/updateDeliveryStatus",
  async ({ shopOrderId, deliveryStatus }, thunkAPI) => {
    try {
      const res = await updateDeliveryStatusApi(shopOrderId, deliveryStatus);
      return res.data;
    } catch (error) {
      console.log("order slice", error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getUserShopOrdersThunk = createAsyncThunk(
  "order/getUserShopOrders",
  async (refundOnly = false, thunkAPI) => {
    try {
      const res = await getUserShopOrdersApi(refundOnly);
      return res.data;
    } catch (error) {
      console.log("order slice", error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateRefundStatusThunk = createAsyncThunk(
  "order/updateRefundStatus",
  async ({ shopOrderId, refundStatus }, thunkAPI) => {
    try {
      const res = await updateRefundStatusApi(shopOrderId, refundStatus);
      return res.data.shopOrder;
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
  refundOrders: [],
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
        const { refundStatus } = action.meta.arg;

        state.isLoading = false;
        if (refundStatus) {
          state.refundOrders = action.payload;
        } else {
          state.shopOrders = action.payload;
        }
      })
      .addCase(getShopOrdersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getUserParentOrdersThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserParentOrdersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userOrders = action.payload;
      })
      .addCase(getUserParentOrdersThunk.rejected, (state, action) => {
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
        state.singleOrder = action.payload.shopOrder;
      })
      .addCase(requestRefundThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getShopOrdersByCurrentShopThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getShopOrdersByCurrentShopThunk.fulfilled, (state, action) => {
        state.isLoading = false;

        const refundOnly = action.meta.arg;
        if (refundOnly) {
          state.refundOrders = action.payload.shopOrders;
        } else {
          state.shopOrders = action.payload.shopOrders;
        }
      })
      .addCase(getShopOrdersByCurrentShopThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getShopOrderByIdThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getShopOrderByIdThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleOrder = action.payload;
      })
      .addCase(getShopOrderByIdThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(updateDeliveryStatusThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateDeliveryStatusThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.singleOrder = action.payload;
      })
      .addCase(updateDeliveryStatusThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getUserShopOrdersThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserShopOrdersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("action.payload", action.payload);
        const refundOnly = action.meta.arg || false;
        if (refundOnly) {
          state.refundOrders = action.payload;
        } else {
          state.userOrders = action.payload;
        }
      })
      .addCase(getUserShopOrdersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(updateRefundStatusThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateRefundStatusThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.singleOrder = action.payload;
      })
      .addCase(updateRefundStatusThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
