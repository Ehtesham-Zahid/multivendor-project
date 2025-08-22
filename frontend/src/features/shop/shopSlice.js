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

const initialState = {
  currentUserShop: null,
  shop: null,
  error: null,
  shops: [],
  totalShops: 0,
  totalPages: 0,
  currentPage: 1,
  accountBalance: 0,
  createShopLoading: false,
  getCurrentUserShopLoading: false,
  getShopByIdLoading: false,
  getAllShopsLoading: false,
  updateShopStatusLoading: false,
  updateCurrentUserShopLoading: false,
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
        state.createShopLoading = true;
        state.error = null;
      })
      .addCase(createShopThunk.fulfilled, (state, action) => {
        state.createShopLoading = false;
        state.currentUserShop = action.payload;
      })
      .addCase(createShopThunk.rejected, (state, action) => {
        state.createShopLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getCurrentUserShopThunk.pending, (state) => {
        state.getCurrentUserShopLoading = true;
        state.error = null;
      })
      .addCase(getCurrentUserShopThunk.fulfilled, (state, action) => {
        state.getCurrentUserShopLoading = false;
        state.currentUserShop = action.payload;
      })
      .addCase(getCurrentUserShopThunk.rejected, (state, action) => {
        state.getCurrentUserShopLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(updateCurrentUserShopThunk.pending, (state) => {
        state.updateCurrentUserShopLoading = true;
        state.error = null;
      })
      .addCase(updateCurrentUserShopThunk.fulfilled, (state, action) => {
        state.updateCurrentUserShopLoading = false;
        state.shop = action.payload;
      })
      .addCase(updateCurrentUserShopThunk.rejected, (state, action) => {
        state.updateCurrentUserShopLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getShopByIdThunk.pending, (state) => {
        state.getShopByIdLoading = true;
        state.error = null;
      })
      .addCase(getShopByIdThunk.fulfilled, (state, action) => {
        state.getShopByIdLoading = false;
        state.shop = action.payload;
      })
      .addCase(getShopByIdThunk.rejected, (state, action) => {
        state.getShopByIdLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getAllShopsThunk.pending, (state) => {
        state.getAllShopsLoading = true;
        state.error = null;
      })
      .addCase(getAllShopsThunk.fulfilled, (state, action) => {
        state.getAllShopsLoading = false;
        state.shops = action.payload.shops;
        state.totalShops = action.payload.totalShops;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(getAllShopsThunk.rejected, (state, action) => {
        state.getAllShopsLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(updateShopStatusThunk.pending, (state) => {
        state.updateShopStatusLoading = true;
        state.error = null;
      })
      .addCase(updateShopStatusThunk.fulfilled, (state, action) => {
        state.updateShopStatusLoading = false;
        state.currentUserShop = action.payload.shop;
        state.shop = action.payload.shop || state.shop;
      })
      .addCase(updateShopStatusThunk.rejected, (state, action) => {
        state.updateShopStatusLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, resetError, setAccountBalance } = shopSlice.actions;
export default shopSlice.reducer;
