import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createShopApi, getCurrentUserShopApi } from "./shopAPI";

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

const initialState = {
  shop: null,
  isLoading: false,
  error: null,
  success: false,
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
        state.shop = action.payload;
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
        state.shop = action.payload;
        state.success = true;
      })
      .addCase(getCurrentUserShopThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { logout, resetError } = shopSlice.actions;
export default shopSlice.reducer;
