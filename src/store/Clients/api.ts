import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { apiFetch, AuthorizationLevel } from "../../core/apiFetch";
import { RegisterData } from "../../utils/types";
import { serializeClients } from "./serializers/serializeClients";
import { serializeSingleClient } from "./serializers/serializeSingleClient";
import {
  Client,
  ClientGetById,
  ClientGetByIdResponse,
  ClientListResponse,
} from "./types";

export const getClients = createAsyncThunk<Client[], void, {}>(
  "client/get",
  async (_, thunkAPI) => {
    try {
      const response = await apiFetch<ClientListResponse[]>(
        "/api/clients/",
        {
          requestConfig: {
            method: "GET",
            withCredentials: true,
          },
        },
        AuthorizationLevel.AUTHORIZED
      );

      return serializeClients(response);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getClientById = createAsyncThunk<
  ClientGetById,
  { id: string },
  {}
>("client/getById", async ({ id }, thunkAPI) => {
  try {
    const response = await apiFetch<ClientGetByIdResponse>(
      `/api/clients/${id}`,
      {
        requestConfig: {
          method: "GET",
          withCredentials: true,
        },
      },
      AuthorizationLevel.AUTHORIZED
    );

    return serializeSingleClient(response);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteClient = createAsyncThunk<void, { id: string }, {}>(
  "client/delete",
  async ({ id }, thunkAPI) => {
    try {
      await apiFetch<AxiosResponse>(
        `/api/clients/${id}`,
        {
          requestConfig: {
            method: "DELETE",
            withCredentials: true,
          },
        },
        AuthorizationLevel.AUTHORIZED
      );
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addClient = createAsyncThunk<string, RegisterData, {}>(
  "client/add",
  async (data, thunkAPI) => {
    try {
      const response = apiFetch<string>(
        `/api/clients/`,
        {
          requestConfig: {
            method: "POST",
            withCredentials: true,
            data: JSON.stringify(data),
          },
        },
        AuthorizationLevel.AUTHORIZED
      );

      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
