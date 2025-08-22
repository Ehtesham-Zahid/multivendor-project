import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  requestWithdrawalApi,
  getMyWithdrawalsApi,
  getAllWithdrawalsAdminApi,
  updateWithdrawalStatusAdminApi,
} from "./withdrawalApi";

export const requestWithdrawalThunk = createAsyncThunk(
  "withdrawal/requestWithdrawal",
  async (data, thunkAPI) => {
    try {
      const res = await requestWithdrawalApi(data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const getMyWithdrawalsThunk = createAsyncThunk(
  "withdrawal/getMyWithdrawals",
  async (_, thunkAPI) => {
    try {
      const res = await getMyWithdrawalsApi();
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const getAllWithdrawalsAdminThunk = createAsyncThunk(
  "withdrawal/getAllWithdrawalsAdmin",
  async (_, thunkAPI) => {
    try {
      const res = await getAllWithdrawalsAdminApi();
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const updateWithdrawalStatusAdminThunk = createAsyncThunk(
  "withdrawal/updateWithdrawalStatusAdmin",
  async ({ withdrawalId, data }, thunkAPI) => {
    try {
      const res = await updateWithdrawalStatusAdminApi(withdrawalId, data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const initialState = {
  myWithdrawals: [],
  isMyWithdrawalsLoading: false,
  adminWithdrawals: [],
  isAdminWithdrawalsLoading: false,
  error: null,
  isRequestWithdrawalLoading: false,
  isUpdateWithdrawalStatusAdminLoading: false,
};

const withdrawalSlice = createSlice({
  name: "withdrawal",
  initialState,
  reducers: {
    clearWithdrawalError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestWithdrawalThunk.pending, (state) => {
        state.isRequestWithdrawalLoading = true;
        state.error = null;
      })
      .addCase(requestWithdrawalThunk.fulfilled, (state, action) => {
        state.isRequestWithdrawalLoading = false;
        state.myWithdrawals.unshift(action.payload);
      })
      .addCase(requestWithdrawalThunk.rejected, (state, action) => {
        state.isRequestWithdrawalLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getMyWithdrawalsThunk.pending, (state) => {
        state.isMyWithdrawalsLoading = true;
        state.error = null;
      })
      .addCase(getMyWithdrawalsThunk.fulfilled, (state, action) => {
        state.isMyWithdrawalsLoading = false;
        state.myWithdrawals = action.payload;
      })
      .addCase(getMyWithdrawalsThunk.rejected, (state, action) => {
        state.isMyWithdrawalsLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getAllWithdrawalsAdminThunk.pending, (state) => {
        state.isAdminWithdrawalsLoading = true;
        state.error = null;
      })
      .addCase(getAllWithdrawalsAdminThunk.fulfilled, (state, action) => {
        state.isAdminWithdrawalsLoading = false;
        state.adminWithdrawals = action.payload;
      })
      .addCase(getAllWithdrawalsAdminThunk.rejected, (state, action) => {
        state.isAdminWithdrawalsLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateWithdrawalStatusAdminThunk.pending, (state) => {
        state.isUpdateWithdrawalStatusAdminLoading = true;
        state.error = null;
      })
      .addCase(updateWithdrawalStatusAdminThunk.fulfilled, (state, action) => {
        state.isUpdateWithdrawalStatusAdminLoading = false;
        const updated = action.payload;
        state.adminWithdrawals = state.adminWithdrawals.map((w) =>
          w._id === updated._id ? updated : w
        );
      })
      .addCase(updateWithdrawalStatusAdminThunk.rejected, (state, action) => {
        state.isUpdateWithdrawalStatusAdminLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearWithdrawalError } = withdrawalSlice.actions;
export default withdrawalSlice.reducer;
