import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import jwtDecode from "jwt-decode";
import storage from "redux-persist/lib/storage";
import { apiFetch, AuthorizationLevel } from "../../core/apiFetch";
import { LocalStorageKeys } from "../../types/LocalStorageKeys";
import { serializeUser } from "./serializer/serializeUser";
import { ApiAuthenticationResponse, UpdateData, User } from "./types";

export const refreshToken = createAsyncThunk<
  {
    user: User;
    accessToken: string;
  },
  void,
  {}
>("user/refreshToken", async (_) => {
  const response = await apiFetch<ApiAuthenticationResponse>(
    "/auth/refresh_token",
    {
      requestConfig: {
        method: "POST",
        withCredentials: true,
      },
    }
  );

  const { accessToken, user } = response;
  const role: { ROLE: string } = jwtDecode(accessToken);
  // Update access token
  localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, response.accessToken);
  return {
    user: serializeUser(user, role.ROLE),
    accessToken,
  };
});

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
    const response = await apiFetch<ApiAuthenticationResponse>("/auth/login", {
      requestConfig: {
        method: "POST",
        data: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    });

    const { accessToken, user } = response;
    const role: { ROLE: string } = jwtDecode(accessToken);
    // Set access token
    localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, accessToken);
    return {
      user: serializeUser(user, role.ROLE),
      accessToken,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const logout = createAsyncThunk<void, void, {}>(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      await apiFetch(
        "/auth/logout/",
        {
          requestConfig: {
            method: "POST",
            withCredentials: true,
          },
        },
        AuthorizationLevel.AUTHORIZED
      );
      localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
      storage.removeItem("persist:root");
      localStorage.removeItem("persist:root");
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUserData = createAsyncThunk<void, UpdateData, {}>(
  "user/updateData",
  async (updateData, thunkAPI) => {
    try {
      const { street, buildingNumber, postalCode, city, phoneNumber } =
        updateData;

      await apiFetch<AxiosResponse>(
        `/api/user/${updateData.id}`,
        {
          requestConfig: {
            method: "PUT",
            data: JSON.stringify({
              buildingNumber,
              city,
              phoneNumber,
              postalCode,
              street,
            }),
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
