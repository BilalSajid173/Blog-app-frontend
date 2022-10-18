import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: "",
  isLoggedIn: false,
  user: null,
  likedPosts: null,
  savedPosts: null,
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
    },
    logout(state) {
      localStorage.removeItem("token");
      state.token = "";
      state.isLoggedIn = false;
      state.user = null;
      state.likedPosts = null;
      state.savedPosts = null;
    },
    updateLikedPostsCount(state, action) {
      if (action.payload.increase) {
        state.likedPosts.push(action.payload.id);
      } else {
        state.likedPosts = state.likedPosts.filter((id) => {
          return id !== action.payload.id;
        });
      }
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
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
