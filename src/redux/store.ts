import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import productsReducer from "./features/products/productsSlice";
import { baseApi } from "./api/baseApi";

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
  key: "auth",
  storage,
};

const productsPersistConfig = {
  key: "products",
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedProductsReducer = persistReducer(productsPersistConfig, productsReducer);

export const store = configureStore({
  reducer: {
    // Automatically adds the api reducer to the store with a key based on the reducerPath
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    products: persistedProductsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
