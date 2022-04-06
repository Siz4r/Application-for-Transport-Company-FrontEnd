import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { addUserToChat } from "./api";

interface IchatSlice {
  loading: boolean;
}

export const chatSlice = createSlice<IchatSlice, {}>({
  name: "employees",
  initialState: {
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addUserToChat.fulfilled, () => {});

    builder.addMatcher(isAnyOf(addUserToChat.pending), (state) => {
      state.loading = true;
    });

    builder.addMatcher(
      isAnyOf(addUserToChat.fulfilled, addUserToChat.rejected),
      (state) => {
        state.loading = false;
      }
    );
  },
});
