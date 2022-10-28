import { createSlice } from "@reduxjs/toolkit";

const initialSavedPostsState = {
  posts: null,
};

const savedPostsSlice = createSlice({
  name: "savedposts",
  initialState: initialSavedPostsState,
  reducers: {
    saveposts(state, action) {
      state.posts = action.payload.posts;
    },
    removeposts(state, action) {
      state.posts = null;
    },
    //works for both delete post and remove from saved posts
    deletepost(state, action) {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      if (index !== -1) {
        state.posts.splice(index, 1);
      }
    },
    editpost(state, action) {},
    increaseCommentsCount(state, action) {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      if (index !== -1) state.posts[index].commentsCount += 1;
    },
    decreaseCommentsCount(state, action) {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      if (index !== -1) state.posts[index].commentsCount -= 1;
    },
    //no need for likes count updation
  },
});

export const savedPostsActions = savedPostsSlice.actions;

export default savedPostsSlice.reducer;
