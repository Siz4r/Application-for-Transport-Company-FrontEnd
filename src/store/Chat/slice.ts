import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getContacts, getConv } from "./api";
import { Contact, Conversation } from "./type";

export interface IchatSlice {
  loading: boolean;
  contacts: Contact[];
  conversations: Conversation[];
}

export const chatSlice = createSlice<IchatSlice, {}>({
  name: "employees",
  initialState: {
    loading: false,
    contacts: [],
    conversations: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getContacts.fulfilled, (state, action) => {
      state.contacts = action.payload;
    });

    builder.addCase(getConv.fulfilled, (state, action) => {
      state.conversations = action.payload;
    });

    builder.addMatcher(
      isAnyOf(getContacts.pending, getConv.pending),
      (state) => {
        state.loading = true;
      }
    );

    builder.addMatcher(
      isAnyOf(
        getContacts.fulfilled,
        getContacts.rejected,
        getConv.fulfilled,
        getConv.rejected
      ),
      (state) => {
        state.loading = false;
      }
    );
  },
});
