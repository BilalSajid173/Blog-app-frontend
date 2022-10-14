import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import modeReducer from "./darkmode";
import postsReducer from "./allposts";

const store = configureStore({
  reducer: { auth: authReducer, mode: modeReducer, posts: postsReducer },
});

export default store;
