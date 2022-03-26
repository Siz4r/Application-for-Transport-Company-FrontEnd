import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { clientsSlice } from "./Clients/slice";
import { companiesSlice } from "./Companies/slice";
import { employeesSlice } from "./Employees/slice";
import { filesSlice } from "./Files/slice";
import { ordersSlice } from "./Orders/slice";
import { userSlice } from "./SignIn/slice";

const persistConfig = {
  key: "root",
  storage,
};

// const appReducer = combineReducers({
//   user: userSlice.reducer,
// });

// const rootReducer = (
//   state: CombinedState<{ user: IuserSlice }> | undefined,
//   action: AnyAction
// ) => {
//   if (!state?.user) {
//     // for all keys defined in your persistConfig(s)
//     storage.removeItem("persist:root");
//     // storage.removeItem('persist:otherKey')

//     return appReducer(undefined, action);
//   }
//   return appReducer(state, action);
// };

const rootReducer = combineReducers({
  user: userSlice.reducer,
  employees: employeesSlice.reducer,
  clients: clientsSlice.reducer,
  orders: ordersSlice.reducer,
  companies: companiesSlice.reducer,
  files: filesSlice.reducer,
});

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
