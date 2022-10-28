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
    //works for both delete post and remove from saved posts
    deletepost(state, action) {
      if (state.posts) {
        state.posts = state.posts.filter((post) => {
          return post.id !== action.payload.id;
        });
      }
    },
    editpost(state, action) {},
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
