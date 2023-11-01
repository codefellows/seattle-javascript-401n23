import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./gameSlice";
import campaignSlice from "./campaignSlice";

const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
    campaign: campaignSlice.reducer,
  },
});

export default store;
