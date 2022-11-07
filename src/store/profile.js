import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: null,
};

const postsSlice = createSlice({
  name: "userposts",
  initialState: initialState,
  reducers: {
    saveposts(state, action) {
      state.posts = action.payload.posts;
    },
    increaseCommentsCount(state, action) {
      if (state.posts) {
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1) state.posts[index].commentsCount += 1;
      }
    },
    decreaseCommentsCount(state, action) {
      if (state.posts) {
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1) state.posts[index].commentsCount -= 1;
      }
    },
  },
});

export const userPostsActions = postsSlice.actions;

export default postsSlice.reducer;
