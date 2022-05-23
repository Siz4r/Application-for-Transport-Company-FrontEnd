import { createAsyncThunk } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { apiFetch, AuthorizationLevel } from "../../core/apiFetch";

import { serializeContacts } from "./serializers/serializeContacts";
import {
  Contact,
  ContactDto,
  Conversation,
  ConversationDTO,
  Message,
} from "./type";

export const getContacts = createAsyncThunk<Contact[], void, {}>(
  "contacts/get",
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

export const getConv = createAsyncThunk<Conversation[], void, {}>(
  "conversations/get",
  async (_, thunkAPI) => {
    try {
      const response = await apiFetch<ConversationDTO[]>(
        "/api/conversations/",
        {
          requestConfig: {
            method: "GET",
            withCredentials: true,
          },
        },
        AuthorizationLevel.AUTHORIZED
      );

      return response.map(
        (c) =>
          ({
            ...c,
            messages: c.messages.map(
              (m) =>
                ({ ...m, createdAt: dayjs(m.createdAt).toDate() } as Message)
            ),
          } as Conversation)
      );
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createConv = createAsyncThunk<
  ConversationDTO,
  { name: string; users: string[] },
  {}
>("conversations/create", async (data, thunkAPI) => {
  try {
    const response = await apiFetch<ConversationDTO>(
      "/api/conversations/",
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
});

export const onConvReceived = createAsyncThunk<ConversationDTO, string, {}>(
  "conversations/received",
  async (data, thunkAPI) => {
    return JSON.parse(data);
  }
);
