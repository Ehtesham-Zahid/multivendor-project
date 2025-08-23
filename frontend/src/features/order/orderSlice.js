import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createOrderApi,
  getOrderApi,
  getShopOrderByIdApi,
  getShopOrdersByCurrentShopApi,
  getUserParentOrdersApi,
  getUserShopOrdersApi,
  requestRefundApi,
  updateDeliveryStatusApi,
  updateRefundStatusApi,
  getAdminRefundsApi,
  getAdminOrdersApi,
} from "./orderAPI";

export const createOrderThunk = createAsyncThunk(
  "order/createOrder",
  async (data, thunkAPI) => {
    try {
      const res = await createOrderApi(data);
      return res.data;
    } catch (error) {
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
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Shop Orders

export const getShopOrdersByCurrentShopThunk = createAsyncThunk(
  "order/getShopOrdersByCurrentShop",
  async (
    {
      refundOnly = false,
      deliveryStatus = "",
      page = 1,
      limit = 10,
      refundStatus = "",
    },
    thunkAPI
  ) => {
    try {
      const res = await getShopOrdersByCurrentShopApi(
        refundOnly,
        deliveryStatus,
        page,
        limit,
        refundStatus
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Shop Refund Orders

export const getShopRefundOrdersByCurrentShopThunk = createAsyncThunk(
  "order/getShopRefundOrdersByCurrentShop",
  async (
    {
      refundOnly = true,
      deliveryStatus = "",
      page = 1,
      limit = 10,
      refundStatus = "",
    },
    thunkAPI
  ) => {
    try {
      const res = await getShopOrdersByCurrentShopApi(
        refundOnly,
        deliveryStatus,
        page,
        limit,
        refundStatus
      );
      return res.data;
    } catch (error) {
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
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getAdminOrdersThunk = createAsyncThunk(
  "order/getAdminOrders",
  async ({ deliveryStatus = "", page = 1, limit = 10 }, thunkAPI) => {
    try {
      const res = await getAdminOrdersApi(deliveryStatus, page, limit);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getAdminRefundsThunk = createAsyncThunk(
  "order/getAdminRefunds",
  async ({ page, limit, refundStatus, refundOnly }, thunkAPI) => {
    try {
      const res = await getAdminRefundsApi(
        refundOnly,
        refundStatus,
        page,
        limit
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// User Orders

export const getUserOrdersThunk = createAsyncThunk(
  "order/getUserOrders",
  async ({ deliveryStatus = "", page = 1, limit = 10 }, thunkAPI) => {
    try {
      const res = await getUserParentOrdersApi(page, limit, deliveryStatus);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// User Refund Orders

export const getUserRefundOrdersThunk = createAsyncThunk(
  "order/getUserRefundOrders",
  async (
    { refundOnly = true, refundStatus = "", page = 1, limit = 10 },
    thunkAPI
  ) => {
    try {
      const res = await getUserShopOrdersApi(
        refundOnly,
        refundStatus,
        page,
        limit
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  order: null,
  singleOrder: null,
  isLoading: false,
  error: null,
  success: false,
  totalPages: 0,
  isSingleOrderLoading: false,
  isRequestRefundLoading: false,

  // User Orders
  userOrders: [],
  isUserOrdersLoading: false,
  totalUserOrdersPages: 0,
  totalUserOrders: 0,

  // User Refund Orders
  userRefundOrders: [],
  isUserRefundOrdersLoading: false,
  totalUserRefundOrdersPages: 0,
  totalUserRefundOrders: 0,

  // Shop Orders
  shopOrders: [],
  isShopOrdersLoading: false,
  totalShopOrdersPages: 0,
  totalShopOrders: 0,

  // Shop Refund Orders
  shopRefundOrders: [],
  isShopRefundOrdersLoading: false,
  totalShopRefundOrdersPages: 0,
  totalShopRefundOrders: 0,

  // Admin Orders
  adminOrders: [],
  isAdminOrdersLoading: false,
  totalAdminOrdersPages: 0,
  totalAdminOrders: 0,

  // Admin Refunds
  adminRefunds: [],
  isAdminRefundsLoading: false,
  totalAdminRefundsPages: 0,
  totalAdminRefunds: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.isUserOrdersLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.isUserOrdersLoading = false;
        state.success = true;
        state.order = action.payload;
        // state.userOrders.push(action.payload);
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.isUserOrdersLoading = false;
        state.error = action.payload;
        state.success = false;
      });
    builder
      .addCase(getOrderThunk.pending, (state) => {
        state.isSingleOrderLoading = true;
        state.error = null;
      })
      .addCase(getOrderThunk.fulfilled, (state, action) => {
        state.isSingleOrderLoading = false;
        state.singleOrder = action.payload;
      })
      .addCase(getOrderThunk.rejected, (state, action) => {
        state.isSingleOrderLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(requestRefundThunk.pending, (state) => {
        state.isRequestRefundLoading = true;
        state.error = null;
      })
      .addCase(requestRefundThunk.fulfilled, (state, action) => {
        state.isRequestRefundLoading = false;
        state.singleOrder = action.payload.shopOrder;
      })
      .addCase(requestRefundThunk.rejected, (state, action) => {
        state.isRequestRefundLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getShopOrdersByCurrentShopThunk.pending, (state) => {
        state.isShopOrdersLoading = true;
        state.error = null;
      })
      .addCase(getShopOrdersByCurrentShopThunk.fulfilled, (state, action) => {
        state.isShopOrdersLoading = false;
        state.shopOrders = action.payload.shopOrders;
        state.totalShopOrdersPages = action.payload.totalPages;
        state.totalShopOrders = action.payload.totalShopOrders;
      })
      .addCase(getShopOrdersByCurrentShopThunk.rejected, (state, action) => {
        state.isShopOrdersLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getShopRefundOrdersByCurrentShopThunk.pending, (state) => {
        state.isShopRefundOrdersLoading = true;
        state.error = null;
      })
      .addCase(
        getShopRefundOrdersByCurrentShopThunk.fulfilled,
        (state, action) => {
          state.isShopRefundOrdersLoading = false;
          state.shopRefundOrders = action.payload.shopOrders;
          state.totalShopRefundOrdersPages = action.payload.totalPages;
          state.totalShopRefundOrders = action.payload.totalShopOrders;
        }
      )
      .addCase(
        getShopRefundOrdersByCurrentShopThunk.rejected,
        (state, action) => {
          state.isShopRefundOrdersLoading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(getShopOrderByIdThunk.pending, (state) => {
        state.isSingleOrderLoading = true;
        state.error = null;
      })
      .addCase(getShopOrderByIdThunk.fulfilled, (state, action) => {
        state.isSingleOrderLoading = false;
        state.singleOrder = action.payload;
      })
      .addCase(getShopOrderByIdThunk.rejected, (state, action) => {
        state.isSingleOrderLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(updateDeliveryStatusThunk.pending, (state) => {
        state.isSingleOrderLoading = true;
        state.error = null;
      })
      .addCase(updateDeliveryStatusThunk.fulfilled, (state, action) => {
        state.isSingleOrderLoading = false;
        state.success = true;
        state.singleOrder = action.payload;
      })
      .addCase(updateDeliveryStatusThunk.rejected, (state, action) => {
        state.isSingleOrderLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(updateRefundStatusThunk.pending, (state) => {
        state.isSingleOrderLoading = true;
        state.error = null;
      })
      .addCase(updateRefundStatusThunk.fulfilled, (state, action) => {
        state.isSingleOrderLoading = false;
        state.success = true;
        state.singleOrder = action.payload;
      })
      .addCase(updateRefundStatusThunk.rejected, (state, action) => {
        state.isSingleOrderLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getAdminOrdersThunk.pending, (state) => {
        state.isAdminOrdersLoading = true;
        state.error = null;
      })
      .addCase(getAdminOrdersThunk.fulfilled, (state, action) => {
        state.isAdminOrdersLoading = false;
        state.adminOrders = action.payload.shopOrders;
        state.totalAdminOrdersPages = action.payload.totalPages;
        state.totalAdminOrders = action.payload.totalShopOrders;
      })
      .addCase(getAdminOrdersThunk.rejected, (state, action) => {
        state.isAdminOrdersLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getAdminRefundsThunk.pending, (state) => {
        state.isAdminRefundsLoading = true;
        state.error = null;
      })
      .addCase(getAdminRefundsThunk.fulfilled, (state, action) => {
        state.isAdminRefundsLoading = false;
        state.adminRefunds = action.payload.shopOrders;
        state.totalAdminRefundsPages = action.payload.totalPages;
        state.totalAdminRefunds = action.payload.totalShopOrders;
      })
      .addCase(getAdminRefundsThunk.rejected, (state, action) => {
        state.isAdminRefundsLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getUserOrdersThunk.pending, (state) => {
        state.isUserOrdersLoading = true;
        state.error = null;
      })
      .addCase(getUserOrdersThunk.fulfilled, (state, action) => {
        state.isUserOrdersLoading = false;
        state.userOrders = action.payload.orders;
        state.totalUserOrdersPages = action.payload.totalPages;
        state.totalUserOrders = action.payload.totalOrders;
      })
      .addCase(getUserOrdersThunk.rejected, (state, action) => {
        state.isUserOrdersLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getUserRefundOrdersThunk.pending, (state) => {
        state.isUserRefundOrdersLoading = true;
        state.error = null;
      })
      .addCase(getUserRefundOrdersThunk.fulfilled, (state, action) => {
        state.isUserRefundOrdersLoading = false;
        state.userRefundOrders = action.payload.shopOrders;
        state.totalUserRefundOrdersPages = action.payload.totalPages;
        state.totalUserRefundOrders = action.payload.totalShopOrders;
      })
      .addCase(getUserRefundOrdersThunk.rejected, (state, action) => {
        state.isUserRefundOrdersLoading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
