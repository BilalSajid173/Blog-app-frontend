import { useState } from "react";
import { TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { commentsActions } from "../../store/comments";
import { postsActions } from "../../store/allposts";
import useHttp from "../../hooks/use-http";
import { authActions } from "../../store/auth";
import { savedPostsActions } from "../../store/savedposts";
import { searchedPostsActions } from "../../store/searchposts";
import { Image } from "cloudinary-react";

const AddComment = (props) => {
  const [showOptions, setShowOptions] = useState(false);
  const [comment, setComment] = useState("");
  const isdisabled = comment.trim() === "";
  const isDark = useSelector((state) => state.mode.isDark);
  const { sendRequest: addComment } = useHttp();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const optionsHandler = () => {
    setShowOptions(true);
  };

  const closeOptionsDiv = () => {
    setShowOptions(false);
    setComment("");
  };

  const darkTheme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
    },
  });

  const commentChangeHandler = (event) => {
    setComment(event.target.value);
  };

  const addCommentResponse = (data) => {
    dispatch(
      commentsActions.addNewComment({
        comment: {
          id: data.id,
          name: data.name,
          content: data.comment,
          createdAt: data.created_at,
          authorId: data.user.id,
          likesCount: data.likesCount,
          dislikesCount: data.dislikesCount,
          userimgid: data.user.profilePic,
        },
      })
    );
    dispatch(postsActions.increaseCommentsCount({ id: props.postid }));
    dispatch(authActions.increaseCommentsCount({ id: props.postid }));
    dispatch(savedPostsActions.increaseCommentsCount({ id: props.postid }));
    dispatch(searchedPostsActions.increaseCommentsCount({ id: props.postid }));
    setShowOptions(false);
    setComment("");
  };

  const addCommentHandler = () => {
    addComment(
      {
        url: "http://localhost:8000/api/products/addcomment/",
        method: "POST",
        body: {
          comment: comment,
          product: props.postid,
          name: user.name,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      },
      addCommentResponse
    );
  };
  return (
    <div className="flex mt-4 w-full">
      <div className="mr-2">
        <Image
          className="rounded-full"
          cloudName="dntn0wocu"
          publicId={props.userimgId}
          width="60"
          height="60"
          crop="scale"
        />
      </div>
      <div className="w-full">
        <ThemeProvider theme={darkTheme}>
          <TextField
            onChange={commentChangeHandler}
            onClick={optionsHandler}
            className="w-full"
            id="standard-basic"
            placeholder="add a comment"
            variant="standard"
            value={comment}
            autoComplete="off"
          />
        </ThemeProvider>
        {showOptions && (
          <div className="mt-2 flex flex-wrap ">
            <button
              onClick={closeOptionsDiv}
              className="p-2 ml-auto bg-gray-300 dark:bg-gray-700 rounded-sm mr-2"
            >
              CANCEL
            </button>
            <button
              onClick={addCommentHandler}
              disabled={isdisabled ? true : false}
              className="p-2 bg-gray-300 dark:bg-gray-700 rounded-sm disabled:bg-slate-300 disabled:opacity-40 disabled:dark:bg-zinc-700 disabled:dark:text-gray-500"
            >
              COMMENT
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddComment;
