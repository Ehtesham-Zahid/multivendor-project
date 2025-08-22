import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMessagesApi,
  getOrCreateConversation,
  getShopConversationsApi,
  getUnreadCountApi,
  getUserConversationsApi,
  sendMessageApi,
} from "./chatApi";

export const getOrCreateConversationThunk = createAsyncThunk(
  "chat/getOrCreateConversation",
  async (shopId, thunkAPI) => {
    try {
      const res = await getOrCreateConversation(shopId);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const sendMessageThunk = createAsyncThunk(
  "chat/sendMessage",
  async ({ conversationId, message, isShop = false }, thunkAPI) => {
    try {
      const res = await sendMessageApi({ conversationId, message, isShop });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getUserConversationsThunk = createAsyncThunk(
  "chat/getUserConversations",
  async (thunkAPI) => {
    try {
      const res = await getUserConversationsApi();
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getShopConversationsThunk = createAsyncThunk(
  "chat/getShopConversations",
  async (thunkAPI) => {
    try {
      const res = await getShopConversationsApi();
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getMessagesThunk = createAsyncThunk(
  "chat/getMessages",
  async ({ conversationId, isShop = false }, thunkAPI) => {
    try {
      const res = await getMessagesApi(conversationId, isShop);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getShopUnreadCountThunk = createAsyncThunk(
  "chat/getShopUnreadCount",
  async (thunkAPI) => {
    try {
      const res = await getUnreadCountApi(true);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getUserUnreadCountThunk = createAsyncThunk(
  "chat/getUserUnreadCount",
  async (thunkAPI) => {
    try {
      const res = await getUnreadCountApi(false);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  userConversations: [],
  userConversationsLoading: false,
  shopConversations: [],
  shopConversationsLoading: false,
  conversation: null,
  messages: [],
  isMessagesLoading: false,
  isLoading: false,
  error: null,
  success: false,
  isUserConversationsLoading: false,
  isShopConversationsLoading: false,
  totalShopUnreadCount: 0,
  totalUserUnreadCount: 0,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrCreateConversationThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getOrCreateConversationThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.conversation = action.payload.conversation;
        // state.messages = action.payload.messages;
      })
      .addCase(getOrCreateConversationThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
    builder
      .addCase(sendMessageThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        // state.messages.push(action.payload.message);
      })
      .addCase(sendMessageThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
    builder
      .addCase(getUserConversationsThunk.pending, (state) => {
        state.isUserConversationsLoading = true;
        state.error = null;
      })
      .addCase(getUserConversationsThunk.fulfilled, (state, action) => {
        state.isUserConversationsLoading = false;
        state.userConversations = action.payload.conversations;
      })
      .addCase(getUserConversationsThunk.rejected, (state, action) => {
        state.isUserConversationsLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getShopConversationsThunk.pending, (state) => {
        state.isShopConversationsLoading = true;
        state.error = null;
      })
      .addCase(getShopConversationsThunk.fulfilled, (state, action) => {
        state.isShopConversationsLoading = false;
        state.shopConversations = action.payload.conversations;
      })
      .addCase(getShopConversationsThunk.rejected, (state, action) => {
        state.isShopConversationsLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getMessagesThunk.pending, (state) => {
        state.isMessagesLoading = true;
        state.error = null;
      })
      .addCase(getMessagesThunk.fulfilled, (state, action) => {
        state.isMessagesLoading = false;
        state.messages = action.payload.messages;
      })
      .addCase(getMessagesThunk.rejected, (state, action) => {
        state.isMessagesLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getShopUnreadCountThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getShopUnreadCountThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalShopUnreadCount = action.payload.totalUnread;
      })
      .addCase(getShopUnreadCountThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getUserUnreadCountThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserUnreadCountThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalUserUnreadCount = action.payload.totalUnread;
      })
      .addCase(getUserUnreadCountThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const { setMessages, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
