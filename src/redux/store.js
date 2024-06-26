import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authReducer } from "../redux/auth/authSlice";
import productReducer from "../redux/products/productSlice";
import supplierReducer from "./suppliers/suppliersSlice";
import orderReducer from "./orders/ordersSlice";
import customerReducer from "./customers/customersSlice";
import dashboardReducer from "./dashboard/dashboardSlice";

const authConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authConfig, authReducer),
    products: productReducer,
    suppliers: supplierReducer,
    orders: orderReducer,
    customers: customerReducer,
    dashboard: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
