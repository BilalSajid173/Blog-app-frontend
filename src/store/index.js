import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import modeReducer from "./darkmode";
import postsReducer from "./allposts";
import usersReducer from "./topusers";

const store = configureStore({
  reducer: {
    auth: authReducer,
    mode: modeReducer,
    posts: postsReducer,
    users: usersReducer,
  },
});

export default store;
