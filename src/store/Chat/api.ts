import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { NewChatUserRequestData } from "./type";

export const addUserToChat = createAsyncThunk<{}, NewChatUserRequestData, {}>(
  "chat/add",
  async (data, thunkAPI) => {
    try {
      axios({
        method: "post",
        url: "https://api.chatengine.io/users/",
        headers: {
          "PRIVATE-KEY": "87a61791-3d9d-4989-93ca-ccf600297f0b",
        },
        data: {
          username: data.username,
          secret: data.secret,
          email: data.email,
          first_name: data.firstName,
          last_name: data.lastName,
        },
      })
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
