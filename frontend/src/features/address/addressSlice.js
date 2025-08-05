import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  createAddressApi,
  deleteAddressApi,
  getUserAddressApi,
  updateAddressApi,
} from "./addressAPI";

export const createAddressThunk = createAsyncThunk(
  "address/createAddress",
  async (addressData, thunkAPI) => {
    try {
      const res = await createAddressApi(addressData);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getUserAddressThunk = createAsyncThunk(
  "address/getUserAddress",
  async (_, thunkAPI) => {
    try {
      const res = await getUserAddressApi();
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteAddressThunk = createAsyncThunk(
  "address/deleteAddress",
  async (addressId, thunkAPI) => {
    try {
      const res = await deleteAddressApi(addressId);
      return addressId; // Return the addressId to filter it out from the state
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateAddressThunk = createAsyncThunk(
  "address/updateAddress",
  async ({ addressId, addressData }, thunkAPI) => {
    try {
      const res = await updateAddressApi(addressId, addressData);
      return res.data;
    } catch (error) {
      console.log(error);
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
      .addCase(getUserAddressThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserAddressThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addresses = action.payload;
      })
      .addCase(getUserAddressThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
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
    builder
      .addCase(deleteAddressThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteAddressThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addresses = state.addresses.filter(
          (address) => address._id !== action.payload
        );
      })
      .addCase(deleteAddressThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(updateAddressThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateAddressThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.addresses.findIndex(
          (address) => address._id === action.payload._id
        );
        if (index !== -1) {
          state.addresses[index] = action.payload;
        }
      })
      .addCase(updateAddressThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default addressSlice.reducer;
