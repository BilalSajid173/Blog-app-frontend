import { createSlice } from "@reduxjs/toolkit";

const initialModeState = {
  isDark: false,
};

const modeSlice = createSlice({
  name: "darkmode",
  initialState: initialModeState,
  reducers: {
    toggle(state) {
      state.isDark = !state.isDark;
    },
  },
});

export const modeActions = modeSlice.actions;

export default modeSlice.reducer;
