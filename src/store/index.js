import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import modeReducer from "./darkmode";

const store = configureStore({
  reducer: { auth: authReducer, mode: modeReducer },
});

export default store;
