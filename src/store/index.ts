import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { chatSlice } from "./Chat/slice";
import { clientsSlice } from "./Clients/slice";
import { companiesSlice } from "./Companies/slice";
import { employeesSlice } from "./Employees/slice";
import { filesSlice } from "./Files/slice";
import { ordersSlice } from "./Orders/slice";
import { logout } from "./SignIn/api";
import { userSlice } from "./SignIn/slice";

const persistConfig = {
  key: "root",
  storage,
};

const appReducer = combineReducers({
  user: userSlice.reducer,
  employees: employeesSlice.reducer,
  clients: clientsSlice.reducer,
  orders: ordersSlice.reducer,
  companies: companiesSlice.reducer,
  files: filesSlice.reducer,
  chat: chatSlice.reducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === logout) {
    storage.removeItem("persist:root");

    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
