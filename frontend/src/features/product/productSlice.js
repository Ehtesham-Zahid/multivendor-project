import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createProductApi } from "./productAPI";

export const createProductThunk = createAsyncThunk(
  "product/createProduct",
  async (data, thunkAPI) => {
    try {
      const res = await createProductApi(data);
      console.log(res);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  allProducts: [],
  shopProducts: [],
  isLoading: false,
  error: null,
  success: false,
};

const productSlice = createSlice({
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
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

// export const { logout, resetError } = productSlice.actions;
export default productSlice.reducer;
