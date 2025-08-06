import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createEventApi,
  deleteEventApi,
  getActiveEventsApi,
  getShopEventsApi,
  updateEventApi,
} from "./eventAPI";

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

export const deleteEventThunk = createAsyncThunk(
  "event/deleteEvent",
  async (eventId, thunkAPI) => {
    try {
      const res = await deleteEventApi(eventId);
      console.log(res);
      return eventId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getShopEventsThunk = createAsyncThunk(
  "event/getShopEvents",
  async (_, thunkAPI) => {
    try {
      const res = await getShopEventsApi();
      console.log(res);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateEventThunk = createAsyncThunk(
  "event/updateEvent",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await updateEventApi(id, data);
      console.log(res);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getActiveEventsThunk = createAsyncThunk(
  "event/getActiveEvents",
  async ({ sortBy, limit }, thunkAPI) => {
    try {
      const res = await getActiveEventsApi({ sortBy, limit });
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  allEvents: [],
  shopEvents: [],
  popularEvent: null,
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
    builder
      .addCase(getShopEventsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getShopEventsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.shopEvents = action.payload;
      })
      .addCase(getShopEventsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
    builder
      .addCase(deleteEventThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteEventThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.shopEvents = state.shopEvents.filter(
          (event) => event._id !== action.payload
        );
      })
      .addCase(deleteEventThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
    builder
      .addCase(updateEventThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateEventThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.shopEvents = state.shopEvents.map((event) =>
          event._id === action.payload._id ? action.payload : event
        );
      })
      .addCase(updateEventThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
    builder
      .addCase(getActiveEventsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getActiveEventsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        console.log("MAAA", action.payload);
        const { sortBy, limit } = action.meta.arg;
        if (sortBy === "sales" && limit === 1) {
          state.popularEvent = action.payload[0];
        } else {
          state.allEvents = action.payload;
        }
      })
      .addCase(getActiveEventsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export default eventSlice.reducer;
