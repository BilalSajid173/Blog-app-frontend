import { createSlice } from "@reduxjs/toolkit";

const initialCommentsState = {
  comments: [],
};

const commentsSlice = createSlice({
  name: "comments",
  initialState: initialCommentsState,
  reducers: {},
});

export const commentsActions = commentsSlice.actions;

export default commentsSlice.reducer;
