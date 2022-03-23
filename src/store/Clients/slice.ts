import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { isBoolean } from "../../utils/isCheckers/isBooleans";
import { addClient, deleteClient, getClientById, getClients } from "./api";
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

    builder.addCase(deleteClient.fulfilled, (state) => {
      if (!isBoolean(state.client)) {
        const client = state.client;
        state.clients = state.clients.filter((c) => c.id !== client.id);
      }
      state.client = false;
    });

    builder.addCase(addClient.fulfilled, (state, action) => {
      state.clients = [
        ...state.clients,
        { ...action.meta.arg, id: action.payload },
      ];
    });

    builder.addMatcher(
      isAnyOf(
        getClients.pending,
        getClientById.pending,
        deleteClient.pending,
        addClient.pending
      ),
      (state) => {
        state.loading = true;
      }
    );

    builder.addMatcher(
      isAnyOf(
        getClients.fulfilled,
        getClients.rejected,
        getClientById.fulfilled,
        getClientById.rejected,
        deleteClient.fulfilled,
        deleteClient.rejected,
        addClient.fulfilled,
        addClient.rejected
      ),
      (state) => {
        state.loading = false;
      }
    );
  },
});
