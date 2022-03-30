import { User } from "./types";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  loginWithCredentials,
  logout,
  refreshToken,
  updateUserData,
} from "./api";
import storage from "redux-persist/lib/storage";
import { isBoolean } from "../../utils/isCheckers/isBooleans";

export type UserEntity = User | boolean;

export interface IuserSlice {
  user: UserEntity;
  loading: boolean;
}

export const userSlice = createSlice<IuserSlice, {}>({
  name: "user",
  initialState: {
    user: false,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginWithCredentials.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });

    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.user = false;
      // @ts-ignore
      state = {};
      storage.removeItem("persist:root");
      localStorage.setItem("persist:root", "");
    });

    builder.addCase(updateUserData.fulfilled, (state, action) => {
      if (!isBoolean(state.user)) {
        state.user = {
          ...state.user,
          ...action.meta.arg,
        };
      }
    });

    builder.addMatcher(isAnyOf(loginWithCredentials.pending), (state) => {
      state.loading = true;
    });
    builder.addMatcher(
      isAnyOf(loginWithCredentials.rejected, loginWithCredentials.fulfilled),
      (state) => {
        state.loading = false;
      }
    );
  },
});
