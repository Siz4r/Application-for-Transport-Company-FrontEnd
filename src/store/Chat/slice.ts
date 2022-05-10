import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getContacts } from "./api";
import { Contact } from "./type";

export interface IchatSlice {
  loading: boolean;
  contacts: Contact[];
}

export const chatSlice = createSlice<IchatSlice, {}>({
  name: "employees",
  initialState: {
    loading: false,
    contacts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getContacts.fulfilled, (state, action) => {
      state.contacts = action.payload;
    });

    builder.addMatcher(isAnyOf(getContacts.pending), (state) => {
      state.loading = true;
    });

    builder.addMatcher(
      isAnyOf(getContacts.fulfilled, getContacts.rejected),
      (state) => {
        state.loading = false;
      }
    );
  },
});
