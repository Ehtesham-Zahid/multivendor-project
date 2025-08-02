import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentProfilePageSection: "profile",
  user: null,
  isLoading: false,
  error: null,
  success: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    profilePageSection(state, action) {
      state.currentProfilePageSection = action.payload;
    },
  },
});

export const { profilePageSection } = profileSlice.actions;
export default profileSlice.reducer;
