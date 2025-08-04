import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createEventApi } from "./eventAPI";

export const createEventThunk = createAsyncThunk(
  "event/createEvent",
  async (data, thunkAPI) => {
    try {
      const res = await createEventApi(data);
      console.log(res);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  allEvents: [],
  shopEvents: [],
  isLoading: false,
  error: null,
  success: false,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEventThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createEventThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.shopEvents.push(action.payload);
      })
      .addCase(createEventThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export default eventSlice.reducer;
