import { createSlice } from "@reduxjs/toolkit";

const initialUsersState = {
  topusers: null
};

const usersSlice = createSlice({
  name: "topusers",
  initialState: initialUsersState,
  reducers: {
    savetopusers(state, action) {
      state.topusers = action.payload.topusers;
    },
  },
});

export const userActions = usersSlice.actions;

export default usersSlice.reducer;
