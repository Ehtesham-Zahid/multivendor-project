import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createEventApi,
  deleteEventApi,
  getActiveEventsApi,
  getShopEventsApi,
  updateEventApi,
  getAllEventsAdminApi,
} from "./eventAPI";

export const createEventThunk = createAsyncThunk(
  "event/createEvent",
  async (data, thunkAPI) => {
    try {
      const res = await createEventApi(data);
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
      return eventId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getShopEventsThunk = createAsyncThunk(
  "event/getShopEvents",
  async ({ page, limit }, thunkAPI) => {
    try {
      const res = await getShopEventsApi({ page, limit });
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
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getAllEventsAdminThunk = createAsyncThunk(
  "event/getAllEventsAdmin",
  async ({ page, limit, onlyActive, sortBy }, thunkAPI) => {
    try {
      const res = await getAllEventsAdminApi({
        page,
        limit,
        onlyActive,
        sortBy,
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getPopularEventThunk = createAsyncThunk(
  "event/getPopularEvent",
  async (thunkAPI) => {
    try {
      const res = await getActiveEventsApi({ sortBy: "sales", limit: 1 });
      return res.data[0];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteEventAdminThunk = createAsyncThunk(
  "event/deleteEventAdmin",
  async (eventId, thunkAPI) => {
    try {
      await deleteEventApi(eventId);
      return eventId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  allEvents: [],
  shopEvents: [],
  popularEvent: null,
  isAllEventsLoading: false,
  isShopEventsLoading: false,
  isPopularEventLoading: false,
  isAdminEventsLoading: false,
  error: null,
  totalPages: 0,
  totalShopEvents: 0,
  adminEvents: [],
  totalAdminEventsPages: 0,
  totalAdminEvents: 0,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEventThunk.pending, (state) => {
        state.isShopEventsLoading = true;
        state.error = null;
      })
      .addCase(createEventThunk.fulfilled, (state, action) => {
        state.isShopEventsLoading = false;
        state.shopEvents.push(action.payload);
      })
      .addCase(createEventThunk.rejected, (state, action) => {
        state.isShopEventsLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getShopEventsThunk.pending, (state) => {
        state.isShopEventsLoading = true;
        state.error = null;
      })
      .addCase(getShopEventsThunk.fulfilled, (state, action) => {
        state.isShopEventsLoading = false;
        state.shopEvents = action.payload.events;
        state.totalPages = action.payload.totalPages;
        state.totalShopEvents = action.payload.totalEvents;
      })
      .addCase(getShopEventsThunk.rejected, (state, action) => {
        state.isShopEventsLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getPopularEventThunk.pending, (state) => {
        state.isPopularEventLoading = true;
        state.error = null;
      })
      .addCase(getPopularEventThunk.fulfilled, (state, action) => {
        state.isPopularEventLoading = false;
        state.popularEvent = action.payload;
      })
      .addCase(getPopularEventThunk.rejected, (state, action) => {
        state.isPopularEventLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(deleteEventThunk.pending, (state) => {
        state.isShopEventsLoading = true;
        state.error = null;
      })
      .addCase(deleteEventThunk.fulfilled, (state, action) => {
        state.isShopEventsLoading = false;
        state.shopEvents = state.shopEvents.filter(
          (event) => event._id !== action.payload
        );
        state.totalShopEvents = state.totalShopEvents - 1;
      })
      .addCase(deleteEventThunk.rejected, (state, action) => {
        state.isShopEventsLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(updateEventThunk.pending, (state) => {
        state.isShopEventsLoading = true;
        state.error = null;
      })
      .addCase(updateEventThunk.fulfilled, (state, action) => {
        state.isShopEventsLoading = false;
        state.shopEvents = state.shopEvents.map((event) =>
          event._id === action.payload._id ? action.payload : event
        );
      })
      .addCase(updateEventThunk.rejected, (state, action) => {
        state.isShopEventsLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getActiveEventsThunk.pending, (state) => {
        state.isAllEventsLoading = true;
        state.error = null;
      })
      .addCase(getActiveEventsThunk.fulfilled, (state, action) => {
        state.isAllEventsLoading = false;
        state.allEvents = action.payload;
      })
      .addCase(getActiveEventsThunk.rejected, (state, action) => {
        state.isAllEventsLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getAllEventsAdminThunk.pending, (state) => {
        state.isAdminEventsLoading = true;
        state.error = null;
      })
      .addCase(getAllEventsAdminThunk.fulfilled, (state, action) => {
        state.isAdminEventsLoading = false;
        state.adminEvents = action.payload.events;
        state.totalAdminEventsPages = action.payload.totalPages;
        state.totalAdminEvents = action.payload.totalEvents;
      })
      .addCase(getAllEventsAdminThunk.rejected, (state, action) => {
        state.isAdminEventsLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(deleteEventAdminThunk.pending, (state) => {
        state.isAdminEventsLoading = true;
        state.error = null;
      })
      .addCase(deleteEventAdminThunk.fulfilled, (state, action) => {
        state.isAdminEventsLoading = false;
        state.adminEvents = state.adminEvents.filter(
          (event) => event._id !== action.payload
        );
        state.totalAdminEvents = state.totalAdminEvents - 1;
      })
      .addCase(deleteEventAdminThunk.rejected, (state, action) => {
        state.isAdminEventsLoading = false;
        state.error = action.payload;
      });
  },
});

export default eventSlice.reducer;
