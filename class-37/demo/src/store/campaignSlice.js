import { createSlice } from "@reduxjs/toolkit";

const campaignSlice = createSlice({
  name: "rock-paper-scissors",
  initialState: {
    totalGamesPlayed: 0,
    totalPlayerWins: 0,
  },
  reducers: {
    updateCampaign: (state, action) => {
      state.totalGamesPlayed += 1;
      if (action.payload >= 2) state.totalPlayerWins += 1;
    },
  },
});

export default campaignSlice;
