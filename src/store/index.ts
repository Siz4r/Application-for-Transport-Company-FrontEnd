import {
  AnyAction,
  CombinedState,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { employeesSlice } from "./Employees/slice";
import { IuserSlice, userSlice } from "./SignIn/slice";

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
