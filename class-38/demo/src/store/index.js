import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";

const store = configureStore({
  reducer: {
    productSlice: productSlice.reducer,
  },
});

export default store;
