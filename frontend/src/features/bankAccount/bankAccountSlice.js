import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createBankAccountApi,
  getBankAccountsApi,
  getBankAccountByIdApi,
  updateBankAccountApi,
  deleteBankAccountApi,
} from "./bankAccountAPI";

// Create bank account
export const createBankAccountThunk = createAsyncThunk(
  "bankAccount/createBankAccount",
  async (data, thunkAPI) => {
    try {
      const res = await createBankAccountApi(data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Get all bank accounts
export const getBankAccountsThunk = createAsyncThunk(
  "bankAccount/getBankAccounts",
  async (_, thunkAPI) => {
    try {
      const res = await getBankAccountsApi();
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Get single bank account
export const getBankAccountByIdThunk = createAsyncThunk(
  "bankAccount/getBankAccountById",
  async (id, thunkAPI) => {
    try {
      const res = await getBankAccountByIdApi(id);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Update bank account
export const updateBankAccountThunk = createAsyncThunk(
  "bankAccount/updateBankAccount",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await updateBankAccountApi({ id, data });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Delete bank account
export const deleteBankAccountThunk = createAsyncThunk(
  "bankAccount/deleteBankAccount",
  async (id, thunkAPI) => {
    try {
      const res = await deleteBankAccountApi(id);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  shopBankAccounts: [],
  currentBankAccount: null,
  isLoading: false,
  error: null,
  success: false,
  isShopBankAccountsLoading: false,
};

const bankAccountSlice = createSlice({
  name: "bankAccount",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create bank account
      .addCase(createBankAccountThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBankAccountThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shopBankAccounts.push(action.payload);
        state.success = true;
      })
      .addCase(createBankAccountThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get all bank accounts
      .addCase(getBankAccountsThunk.pending, (state) => {
        state.isShopBankAccountsLoading = true;
        state.error = null;
      })
      .addCase(getBankAccountsThunk.fulfilled, (state, action) => {
        state.isShopBankAccountsLoading = false;
        state.shopBankAccounts = action.payload;
      })
      .addCase(getBankAccountsThunk.rejected, (state, action) => {
        state.isShopBankAccountsLoading = false;
        state.error = action.payload;
      })
      // Get single bank account
      .addCase(getBankAccountByIdThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBankAccountByIdThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentBankAccount = action.payload;
      })
      .addCase(getBankAccountByIdThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update bank account
      .addCase(updateBankAccountThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBankAccountThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.bankAccounts.findIndex(
          (account) => account._id === action.payload._id
        );
        if (index !== -1) {
          state.shopBankAccounts[index] = action.payload;
        }
        state.success = true;
      })
      .addCase(updateBankAccountThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete bank account
      .addCase(deleteBankAccountThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBankAccountThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shopBankAccounts = state.shopBankAccounts.filter(
          (account) => account._id !== action.payload.id
        );
        state.success = true;
      })
      .addCase(deleteBankAccountThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess } = bankAccountSlice.actions;
export default bankAccountSlice.reducer;
