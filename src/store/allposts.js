import { createSlice } from "@reduxjs/toolkit";

const initialPostsState = {
  posts: null,
  topPosts: null,
  totalPosts: 0,
};

const postsSlice = createSlice({
  name: "posts",
  initialState: initialPostsState,
  reducers: {
    saveallposts(state, action) {
      state.posts = action.payload.posts;
      state.totalPosts = action.payload.totalPosts
    },
    savetopposts(state, action) {
      state.topPosts = action.payload.topposts;
    },
  },
});

export const postsActions = postsSlice.actions;

export default postsSlice.reducer;
