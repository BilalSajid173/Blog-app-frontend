import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import modeReducer from "./darkmode";
import postsReducer from "./allposts";
import usersReducer from "./topusers";
import commentsReducer from "./comments";
import savedPostsReducer from "./savedposts";
import searchedPostsReducer from "./searchposts";
import userPostsReducer from "./profile";

const store = configureStore({
  reducer: {
    auth: authReducer,
    mode: modeReducer,
    posts: postsReducer,
    users: usersReducer,
    comments: commentsReducer,
    savedPosts: savedPostsReducer,
    searchedPosts: searchedPostsReducer,
    userPosts: userPostsReducer,
  },
});

export default store;
