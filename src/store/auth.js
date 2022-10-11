import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: "",
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      localStorage.setItem("token", action.payload.token)
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    logout(state) {
      localStorage.removeItem("token")
      state.token = "";
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
