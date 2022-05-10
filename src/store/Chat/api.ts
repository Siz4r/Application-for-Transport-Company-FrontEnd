import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch, AuthorizationLevel } from "../../core/apiFetch";
import { serializeContacts } from "./serializers/serializeContacts";
import { Contact, ContactDto } from "./type";

export const getContacts = createAsyncThunk<Contact[], void, {}>(
  "client/get",
  async (_, thunkAPI) => {
    try {
      const response = await apiFetch<ContactDto[]>(
        "/api/user/",
        {
          requestConfig: {
            method: "GET",
            withCredentials: true,
          },
        },
        AuthorizationLevel.AUTHORIZED
      );

      return serializeContacts(response);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
