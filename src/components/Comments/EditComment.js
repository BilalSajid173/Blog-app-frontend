import { useState } from "react";
import { TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { commentsActions } from "../../store/comments";
import useHttp from "../../hooks/use-http";
import image from "../../Images/userimg.png";

const EditComment = (props) => {
  const [comment, setComment] = useState(props.comment);
  const isdisabled = comment.trim() === "";
  const isDark = useSelector((state) => state.mode.isDark);
  const { sendRequest: editComment } = useHttp();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const darkTheme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
    },
  });

  const commentChangeHandler = (event) => {
    setComment(event.target.value);
  };

  const editCommentResponse = (data) => {
    dispatch(
      commentsActions.updateComment({
        comment: comment,
        id: props.id,
      })
    );
    props.onClick();
  };

  const editCommentHandler = () => {
    editComment(
      {
        url:
          "http://localhost:8000/api/products/updatecomment/" + props.id + "/",
        method: "PUT",
        body: {
          comment: comment,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      },
      editCommentResponse
    );
  };
  return (
    <div className="flex w-full">
      <img
        src={image}
        alt="user"
        className="w-10 h-10 rounded-full bg-white mr-4"
      />
      <div className="w-full">
        <ThemeProvider theme={darkTheme}>
          <TextField
            onChange={commentChangeHandler}
            className="w-full"
            id="standard-basic"
            variant="standard"
            value={comment}
            autoComplete="off"
          />
        </ThemeProvider>
        {
          <div className="mt-2 flex flex-wrap ">
            <button
              onClick={props.onClick}
              className="p-2 ml-auto bg-gray-300 dark:bg-gray-700 rounded-sm mr-2"
            >
              CANCEL
            </button>
            <button
              onClick={editCommentHandler}
              disabled={isdisabled ? true : false}
              className="p-2 bg-gray-300 dark:bg-gray-700 rounded-sm disabled:bg-slate-300 disabled:opacity-40 disabled:dark:bg-zinc-700 disabled:dark:text-gray-500"
            >
              COMMENT
            </button>
          </div>
        }
      </div>
    </div>
  );
};

export default EditComment;
