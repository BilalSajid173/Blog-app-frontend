import React, { Fragment, useState, useEffect } from "react";
import CommentsModal from "../UI/CommentsModal/CommentsModal";
import { useSelector, useDispatch } from "react-redux";
import image from "../../Images/userimg.png";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "@mui/icons-material/Close";
import OptionsMenu from "./CommentOptions";
import { TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SingleComment from "./Comment";
import useHttp from "../../hooks/use-http";
import { commentsActions } from "../../store/comments";

const ViewComments = (props) => {
  const [showOptions, setShowOptions] = useState(false);
  const isDark = useSelector((state) => state.mode.isDark);
  const comments = useSelector((state) => state.comments.comments);
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const isdisabled = comment.trim() === "";
  const { sendRequest: fetchComments } = useHttp();
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

  useEffect(() => {
    const commentsHandler = (data) => {
      console.log(data);
      const comments = data.map((comment) => {
        return {
          // isLiked: likedposts.includes(post.id) ? true : false,
          // isSaved: savedposts.includes(post.id) ? true : false,
          id: comment.id,
          name: comment.name,
          content: comment.comment,
          createdAt: comment.created_at,
          authorId: comment.user,
          likesCount: comment.likesCount,
          dislikesCount: comment.dislikesCount,
        };
      });
      dispatch(commentsActions.addComments({ comments: comments }));
      return;
    };

    fetchComments(
      {
        url: "http://localhost:8000/api/products/getcomments/" + props.id + "/",
        headers: {
          "Content-Type": "application/json",
        },
      },
      commentsHandler
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchComments]);

  const CommentsModalContent = (
    <Fragment>
      <div className="p-2 dark:text-white">
        <div className="flex flex-wrap justify-center">
          <span className="mr-auto">Comments {comments.length}</span>
          <div className="flex flex-wrap justify-center items-center">
            <OptionsMenu className="cursor-pointer" />
            <CloseIcon
              onClick={props.onClick}
              className="cursor-pointer ml-4"
            />
          </div>
        </div>
        <div className="flex mt-4 w-full">
          <img
            src={image}
            alt="user"
            className="w-10 h-10 rounded-full bg-white mr-4"
          />
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
                  disabled={isdisabled ? true : false}
                  className="p-2 bg-gray-300 dark:bg-gray-700 rounded-sm disabled:bg-slate-300 disabled:opacity-40 disabled:dark:bg-zinc-700 disabled:dark:text-gray-500"
                >
                  COMMENT
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="mt-8">
          {comments.map((comment) => {
            return (
              <SingleComment
                name={comment.name}
                content={comment.content}
                created_at={comment.created_at}
                likes={comment.likesCount}
                dislikes={comment.dislikesCount}
                id={comment.id}
              />
            );
          })}
        </div>
      </div>
    </Fragment>
  );

  return (
    <CommentsModal onClose={props.onClick}>
      {CommentsModalContent}
    </CommentsModal>
  );
};

export default ViewComments;
