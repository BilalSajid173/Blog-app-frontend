import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import modeReducer from "./darkmode";
import postsReducer from "./allposts";
import usersReducer from "./topusers";
import commentsReducer from "./comments";

const store = configureStore({
  reducer: {
    auth: authReducer,
    mode: modeReducer,
    posts: postsReducer,
    users: usersReducer,
    comments: commentsReducer,
  },
});

export default store;
