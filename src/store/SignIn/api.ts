import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../../core/apiFetch";
import { ApiAuthenticationResponse, User } from "./types";

export const loginWithCredentials = createAsyncThunk<
  {
    user: User;
    accessToken: string;
  },
  {
    username: string;
    password: string;
  },
  {}
>("user/loginWithCredentials", async ({ username, password }, thunkAPI) => {
  try {
    const response = await apiFetch<ApiAuthenticationResponse>(
      "/api/auth/login",
      {
        requestConfig: {
          method: "POST",
          data: JSON.stringify({ username, password }),
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      }
    );

    const { accessToken, user } = response;
    // Set access token
    localStorage.setItem("token", accessToken);
    return {
      user: user,
      accessToken,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
