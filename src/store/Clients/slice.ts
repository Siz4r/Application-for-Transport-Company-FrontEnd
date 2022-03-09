import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getClientById, getClients } from "./api";
import { Client, ClientGetById } from "./types";

export type ClientEntity = ClientGetById | boolean;

interface IclientsSlice {
  clients: Client[];
  client: ClientEntity;
  loading: boolean;
}

export const clientsSlice = createSlice<IclientsSlice, {}>({
  name: "employees",
  initialState: {
    clients: [],
    client: false,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getClients.fulfilled, (state, action) => {
      state.clients = action.payload;
    });

    builder.addCase(getClientById.fulfilled, (state, action) => {
      state.client = action.payload;
    });

    builder.addMatcher(
      isAnyOf(getClients.pending, getClientById.pending),
      (state) => {
        state.loading = true;
      }
    );

    builder.addMatcher(
      isAnyOf(
        getClients.fulfilled,
        getClients.rejected,
        getClientById.fulfilled,
        getClientById.rejected
      ),
      (state) => {
        state.loading = false;
      }
    );
  },
});
