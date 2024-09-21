import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./redux/cartReducer";
import { apiSlice } from "./redux/apiSlice";

export default configureStore({
  reducer: {
    cart: cartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add the apiSlice middleware
});
