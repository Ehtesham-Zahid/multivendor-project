import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrderApi } from "./orderAPI";

export const createOrderThunk = createAsyncThunk(
  "order/createOrder",
  async (data, thunkAPI) => {
    try {
      const res = await createOrderApi(data);
      console.log(res);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  userOrders: [],
  shopOrders: [],
  isLoading: false,
  error: null,
  success: false,
};

const orderSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProductThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.shop = action.payload;
        state.success = true;
        state.shopProducts.push(action.payload);
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

// export const { logout, resetError } = orderSlice.actions;
export default orderSlice.reducer;
