import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createShopApi,
  getCurrentUserShopApi,
  getShopByIdApi,
  updateCurrentUserShopApi,
  getAllShopsApi,
  updateShopStatusApi,
} from "./shopAPI";

export const createShopThunk = createAsyncThunk(
  "shop/createShop",
  async (data, thunkAPI) => {
    try {
      const res = await createShopApi(data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getCurrentUserShopThunk = createAsyncThunk(
  "shop/getCurrentUserShop",
  async (_, thunkAPI) => {
    try {
      const res = await getCurrentUserShopApi();
      console.log(res);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateCurrentUserShopThunk = createAsyncThunk(
  "shop/updateCurrentUserShop",
  async (shopData, thunkAPI) => {
    try {
      const res = await updateCurrentUserShopApi(shopData);
      console.log(res);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getShopByIdThunk = createAsyncThunk(
  "shop/getShopById",
  async (shopId, thunkAPI) => {
    try {
      const res = await getShopByIdApi(shopId);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getAllShopsThunk = createAsyncThunk(
  "shop/getAllShops",
  async ({ page, limit, onlyActive }, thunkAPI) => {
    try {
      const res = await getAllShopsApi({ page, limit, onlyActive });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateShopStatusThunk = createAsyncThunk(
  "shop/updateShopStatus",
  async (shopId, thunkAPI) => {
    try {
      const res = await updateShopStatusApi(shopId);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update shop status"
      );
    }
  }
);

export const updateDashboardShopStatusThunk = createAsyncThunk(
  "shop/updateDashboardShopStatus",
  async (shopId, thunkAPI) => {
    try {
      const res = await updateShopStatusApi(shopId);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update shop status"
      );
    }
  }
);

const initialState = {
  currentUserShop: null,
  shop: null,
  isLoading: false,
  error: null,
  success: false,
  shops: [],
  totalShops: 0,
  totalPages: 0,
  currentPage: 1,
  accountBalance: 0,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
    resetError(state) {
      state.error = null;
    },
    setAccountBalance(state, action) {
      state.accountBalance = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createShopThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createShopThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUserShop = action.payload;
        state.success = true;
      })
      .addCase(createShopThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
    builder
      .addCase(getCurrentUserShopThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getCurrentUserShopThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUserShop = action.payload;
        state.success = true;
      })
      .addCase(getCurrentUserShopThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
    builder
      .addCase(updateCurrentUserShopThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCurrentUserShopThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shop = action.payload;
      })
      .addCase(updateCurrentUserShopThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getShopByIdThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getShopByIdThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shop = action.payload;
        state.success = true;
      })
      .addCase(getShopByIdThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
    builder
      .addCase(getAllShopsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getAllShopsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shops = action.payload.shops;
        state.totalShops = action.payload.totalShops;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.success = true;
      })
      .addCase(getAllShopsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
    builder
      .addCase(updateShopStatusThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateShopStatusThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        // API returns { message, shop }
        state.shop = action.payload.shop || state.shop;
        state.success = true;
      })
      .addCase(updateShopStatusThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
    builder
      .addCase(updateDashboardShopStatusThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateDashboardShopStatusThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUserShop = action.payload.shop;
        state.success = true;
      })
      .addCase(updateDashboardShopStatusThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { logout, resetError, setAccountBalance } = shopSlice.actions;
export default shopSlice.reducer;
