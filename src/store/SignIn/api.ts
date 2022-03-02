import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
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
    "/api/auth/refresh_token",
    {
      requestConfig: {
        method: "POST",
        withCredentials: true,
      },
    }
  );

  const { accessToken, user } = response;
  // Update access token
  localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, response.accessToken);
  return {
    user: serializeUser(user),
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
    localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, accessToken);
    return {
      user: serializeUser(user),
      accessToken,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const logout = createAsyncThunk<void, void, {}>(
  "user/logout",
  async (_) => {
    // await apiFetch("/api/auth/logout", {
    //   requestConfig: {
    //     method: "POST",
    //     withCredentials: true,
    //   },
    // });

    localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
    // localStorage.removeItem();
    storage.removeItem("persist:root");
    localStorage.removeItem("persist:root");

    return;
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
