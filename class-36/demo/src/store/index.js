import { configureStore } from "@reduxjs/toolkit";
import beastSlice from "./beast";

export const store = configureStore({
  reducer: {
    beast: beastSlice.reducer,
  },
});
