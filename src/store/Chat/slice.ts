import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createConv, getContacts, getConv } from "./api";
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

    builder.addCase(createConv.fulfilled, (state, action) => {
      const args = action.meta.arg;
      const contacts = state.contacts.filter((c) => args.users.includes(c.id));
      state.conversations = [
        ...state.conversations,
        { name: args.name, users: contacts, messages: [], id: action.payload },
      ];
    });

    builder.addMatcher(
      isAnyOf(getContacts.pending, getConv.pending, createConv.pending),
      (state) => {
        state.loading = true;
      }
    );

    builder.addMatcher(
      isAnyOf(
        getContacts.fulfilled,
        getContacts.rejected,
        getConv.fulfilled,
        getConv.rejected,
        createConv.fulfilled,
        createConv.rejected
      ),
      (state) => {
        state.loading = false;
      }
    );
  },
});
