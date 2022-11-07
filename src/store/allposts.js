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
      state.totalPosts = action.payload.totalPosts;
    },
    updatepost(state, action) {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      if (index !== -1) {
        state.posts[index].content = action.payload.content;
        state.posts[index].title = action.payload.title;
        state.posts[index].tags = action.payload.tags;
      }
    },
    savetopposts(state, action) {
      state.topPosts = action.payload.topposts;
    },
    increaseCommentsCount(state, action) {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      if (index) state.posts[index].commentsCount += 1;
    },
    decreaseCommentsCount(state, action) {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      if (index) state.posts[index].commentsCount -= 1;
    },
  },
});

export const postsActions = postsSlice.actions;

export default postsSlice.reducer;
