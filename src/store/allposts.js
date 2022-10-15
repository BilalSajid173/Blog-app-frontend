import { createSlice } from "@reduxjs/toolkit";

const initialPostsState = {
  page: 1,
  posts: null,
  topPosts: null,
  tag: null,
  sort: "latest",
  totalPosts: 100,
};

const postsSlice = createSlice({
  name: "posts",
  initialState: initialPostsState,
  reducers: {
    saveallposts(state, action) {
      state.posts = action.payload.posts;
    },
    savetopposts(state, action) {
      state.topPosts = action.payload.topposts;
    },
    setTag(state, action) {
      state.tag = action.payload.tag;
    },
    setPage(state, action) {
      state.page = action.payload.page;
    },
    setSort(state, action) {
      state.sort = action.payload.sort;
    },
    resetposts(state) {
      state.posts = null;
    },
    addNewPosts(state, action) {
      state.posts = state.posts.concat(action.payload.posts);
    },
  },
});

export const postsActions = postsSlice.actions;

export default postsSlice.reducer;
