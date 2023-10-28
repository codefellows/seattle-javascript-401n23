import { createSlice } from "@reduxjs/toolkit";
import beastData from "../data.json";

const beastSlice = createSlice({
  name: "beast",
  initialState: {
    beastData: beastData,
    selectedBeast: undefined,
    numOfHorns: "all",
  },
  reducers: {
    /// name of action to dispatch, state action
    showBeast: (state, action) => {
      // when action occurs we do:
      state.selectedBeast = action.payload;
    },
    setHornCount: (state, action) => {
      state.numOfHorns = action.payload;
    },
  },
});

export default beastSlice;
