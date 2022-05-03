import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { addUserToChat, deleteUserFromChat } from "./api";

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
    builder.addCase(deleteUserFromChat.fulfilled, () => {});

    builder.addMatcher(
      isAnyOf(addUserToChat.pending, deleteUserFromChat.pending),
      (state) => {
        state.loading = true;
      }
    );

    builder.addMatcher(
      isAnyOf(
        addUserToChat.fulfilled,
        addUserToChat.rejected,
        deleteUserFromChat.fulfilled,
        deleteUserFromChat.rejected
      ),
      (state) => {
        state.loading = false;
      }
    );
  },
});
