import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  changePasswordAPI,
  getAdminStatsAPI,
  getAllUsersAPI,
  forgotPasswordAPI,
  getMe,
  login,
  logoutAPI,
  register,
  resetPasswordAPI,
  updateMeAPI,
  verifyToken,
} from "./authAPI";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, thunkAPI) => {
    try {
      const res = await register(data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, thunkAPI) => {
    try {
      const res = await login(data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verify-token",
  async (data, thunkAPI) => {
    try {
      const res = await verifyToken(data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (data, thunkAPI) => {
    try {
      const res = await getMe(data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateMeThunk = createAsyncThunk(
  "auth/updateMe",
  async (data, thunkAPI) => {
    try {
      const res = await updateMeAPI(data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const changePasswordThunk = createAsyncThunk(
  "auth/changePassword",
  async (data, thunkAPI) => {
    try {
      const res = await changePasswordAPI(data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const res = await logoutAPI();
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getAdminStatsThunk = createAsyncThunk(
  "auth/getAdminStats",
  async (_, thunkAPI) => {
    try {
      const res = await getAdminStatsAPI();
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getAllUsersThunk = createAsyncThunk(
  "auth/getAllUsers",
  async (data, thunkAPI) => {
    try {
      const res = await getAllUsersAPI(data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const forgotPasswordThunk = createAsyncThunk(
  "auth/forgotPassword",
  async (data, thunkAPI) => {
    try {
      const res = await forgotPasswordAPI(data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const resetPasswordThunk = createAsyncThunk(
  "auth/resetPassword",
  async (data, thunkAPI) => {
    try {
      const res = await resetPasswordAPI(data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  success: false,
  isInitialized: false,
  allUsers: [],
  totalUsers: 0,
  totalUsersPages: 1,
  isAllUsersLoading: false,
  isAdminStatsLoading: false,
  totalRevenue: 0,
  totalShops: 0,
  totalOrders: 0,
  totalRefunds: 0,
  totalProducts: 0,
  token: null,
  isForgotPasswordLoading: false,
  isResetPasswordLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.user = action.payload;
        state.isInitialized = true;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload;
      });
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.user = action.payload;
        state.isInitialized = true;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload;
        state.isInitialized = true;
        state.user = null;
      });
    builder
      .addCase(updateMeThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateMeThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(updateMeThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload;
      });
    builder
      .addCase(changePasswordThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(changePasswordThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(changePasswordThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload;
      });
    builder
      .addCase(logoutThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.user = null;
        state.isInitialized = true;
        state.token = null;
        localStorage.removeItem("token");
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload;
      });
    builder
      .addCase(getAdminStatsThunk.pending, (state) => {
        state.isAdminStatsLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getAdminStatsThunk.fulfilled, (state, action) => {
        state.isAdminStatsLoading = false;
        state.success = true;
        state.totalRevenue = action.payload.totalRevenue;
        state.totalShops = action.payload.totalShops;
        state.totalOrders = action.payload.totalOrders;
        state.totalRefunds = action.payload.totalRefunds;
        state.totalProducts = action.payload.totalProducts;
      })
      .addCase(getAdminStatsThunk.rejected, (state, action) => {
        state.isAdminStatsLoading = false;
        state.success = false;
        state.error = action.payload;
      });
    builder
      .addCase(getAllUsersThunk.pending, (state) => {
        state.isAllUsersLoading = true;
        state.error = null;
      })
      .addCase(getAllUsersThunk.fulfilled, (state, action) => {
        state.isAllUsersLoading = false;
        state.allUsers = action.payload.users;
        state.totalUsers = action.payload.totalUsers;
        state.totalUsersPages = action.payload.totalUsersPages;
      })
      .addCase(getAllUsersThunk.rejected, (state, action) => {
        state.isAllUsersLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(forgotPasswordThunk.pending, (state) => {
        state.isForgotPasswordLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(forgotPasswordThunk.fulfilled, (state) => {
        state.isForgotPasswordLoading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.isForgotPasswordLoading = false;
        state.success = false;
        state.error = action.payload;
      });
    builder
      .addCase(resetPasswordThunk.pending, (state) => {
        state.isResetPasswordLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(resetPasswordThunk.fulfilled, (state) => {
        state.isResetPasswordLoading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(resetPasswordThunk.rejected, (state, action) => {
        state.isResetPasswordLoading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetError } = authSlice.actions;
export default authSlice.reducer;
