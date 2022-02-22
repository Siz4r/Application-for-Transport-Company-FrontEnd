import { User } from "./types";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { loginWithCredentials } from "./api";

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

    builder.addMatcher(
      isAnyOf(loginWithCredentials.pending),
      (state, action) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(loginWithCredentials.rejected, loginWithCredentials.fulfilled),
      (state, action) => {
        state.loading = false;
      }
    );
  },
});
