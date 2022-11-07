import { createSlice } from "@reduxjs/toolkit";

const initialSearchedPostsState = {
  posts: null,
};

const searchedPostsSlice = createSlice({
  name: "searchedposts",
  initialState: initialSearchedPostsState,
  reducers: {
    saveposts(state, action) {
      state.posts = action.payload.posts;
    },
    removeposts(state, action) {
      state.posts = null;
    },
    deletepost(state, action) {
      if (state.posts) {
        state.posts = state.posts.filter((post) => {
          return post.id !== action.payload.id;
        });
      }
    },
    updatePost(state, action) {
      if (state.posts) {
        const idx = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        if (idx !== -1) {
          state.posts[idx].content = action.payload.content;
          state.posts[idx].title = action.payload.title;
          state.posts[idx].tags = action.payload.tags;
        }
      }
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
    //no need for likes count updation
  },
});

export const searchedPostsActions = searchedPostsSlice.actions;

export default searchedPostsSlice.reducer;
