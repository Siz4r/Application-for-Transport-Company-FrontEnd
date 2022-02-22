import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { userSlice } from "./SignIn/slice";

const reduxer = combineReducers({ user: userSlice.reducer });

export const store = configureStore({
  reducer: reduxer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
