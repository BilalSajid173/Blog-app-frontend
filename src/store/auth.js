import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: "",
  isLoggedIn: false,
  user: null,
  likedPosts: null,
  savedPosts: null,
  comments: null,
  likedComments: null,
  dislikedComments: null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.likedPosts = action.payload.likedPosts;
      state.savedPosts = action.payload.savedPosts;
      state.comments = action.payload.comments;
      state.likedComments = action.payload.likedComments;
      state.dislikedComments = action.payload.dislikedComments;
    },
    logout(state) {
      localStorage.removeItem("token");
      state.token = "";
      state.isLoggedIn = false;
      state.user = null;
      state.likedPosts = null;
      state.savedPosts = null;
      state.comments = null;
      state.likedComments = null;
      state.dislikedComments = null;
    },
    updateLikedPostsCount(state, action) {
      if (action.payload.increase) {
        state.likedPosts.push(action.payload.id);
        const index = state.user.products.findIndex(
          (post) => post.id === action.payload.id
        );
        state.user.products[index].likesCount += 1;
      } else {
        state.likedPosts = state.likedPosts.filter((id) => {
          return id !== action.payload.id;
        });
        const index = state.user.products.findIndex(
          (post) => post.id === action.payload.id
        );
        state.user.products[index].likesCount -= 1;
      }
    },
    increaseCommentsCount(state, action) {
      const index = state.user.products.findIndex(
        (post) => post.id === action.payload.id
      );
      state.user.products[index].commentCount += 1;
    },
    decreaseCommentsCount(state, action) {
      const index = state.user.products.findIndex(
        (post) => post.id === action.payload.id
      );
      state.user.products[index].commentCount -= 1;
    },
    updateSavedPosts(state, action) {
      if (action.payload.save) {
        state.savedPosts.push(action.payload.id);
      } else {
        state.savedPosts = state.savedPosts.filter((id) => {
          return id !== action.payload.id;
        });
      }
    },
    updateComments(state, action) {
      if (action.payload.add) {
        state.comments.push(action.payload.id);
      } else {
        state.comments = state.comments.filter((id) => {
          return id !== action.payload.id;
        });
      }
    },
    updateLikedComments(state, action) {
      if (action.payload.like) {
        state.likedComments.push(action.payload.id);
      } else {
        state.likedComments = state.likedComments.filter((id) => {
          return id !== action.payload.id;
        });
      }
    },
    updateDislikedComments(state, action) {
      if (action.payload.dislike) {
        state.dislikedComments.push(action.payload.id);
      } else {
        state.dislikedComments = state.dislikedComments.filter((id) => {
          return id !== action.payload.id;
        });
      }
    },
    updateUser(state, action) {
      state.user = action.payload.user;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
