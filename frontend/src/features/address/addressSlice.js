import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { createAddressApi } from "./addressAPI";

export const createAddressThunk = createAsyncThunk(
  "address/createAddress",
  async (addressData, thunkAPI) => {
    try {
      const res = await createAddressApi(addressData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  addresses: [],
  isLoading: false,
  error: null,
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAddressThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createAddressThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addresses.push(action.payload);
      })
      .addCase(createAddressThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default addressSlice.reducer;
