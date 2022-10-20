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
      const index = state.comments.findIndex(
        (comment) => comment.id === action.payload.id
      );
      state.comments[index].content = action.payload.comment;
    },
  },
});

export const commentsActions = commentsSlice.actions;

export default commentsSlice.reducer;
