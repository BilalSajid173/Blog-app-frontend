import { createSlice } from "@reduxjs/toolkit";

const initialCommentsState = {
  comments: [],
};

const commentsSlice = createSlice({
  name: "comments",
  initialState: initialCommentsState,
  reducers: {
    addComments(state, action) {
      state.comments = action.payload.comments;
    },
    removeComments(state, action) {
      state.comments = null;
    },
    addNewComment(state, action) {
      state.comments.push(action.payload.comment);
    },
    deleteComment(state, action) {
      state.comments = state.comments.filter((comment) => {
        return comment.id !== action.payload.id;
      });
    },
    updateComment(state, action) {
      let comment = state.comments.filter((comment) => {
        return comment.id === action.payload.id;
      });
      comment.content = action.payload.content;
      state.comments = state.comments.filter((comment) => {
        return comment.id !== action.payload.id;
      });
      state.comments.push(comment);
    },
  },
});

export const commentsActions = commentsSlice.actions;

export default commentsSlice.reducer;
