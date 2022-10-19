import React, { Fragment, useState } from "react";
import CommentsModal from "../UI/CommentsModal/CommentsModal";
import { useSelector } from "react-redux";
import image from "../../Images/userimg.png";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "@mui/icons-material/Close";
import OptionsMenu from "./CommentOptions";
import { TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import EditDeleteComment from "./EditDeleteComment";

const dummycomments = [
  {
    name: "Bilal",
    created_at: "12 hours ago",
    content: "lorem ipsum dolor sit amet hahahahahaha",
    likes: 120,
    dislikes: 20,
  },
  {
    name: "Rashid",
    created_at: "7 hours ago",
    content: "lorem ipsum dolor sit amet hahahahahaha",
    likes: 80,
    dislikes: 25,
  },
  {
    name: "Aatir",
    created_at: "5 hours ago",
    content: "lorem ipsum dolor sit amet hahahahahaha",
    likes: 80,
    dislikes: 25,
  },
  {
    name: "Anzal",
    created_at: "10 hours ago",
    content:
      "lorem ipsum dolor sit amet hahahahahaha this is a comment to see if this is a comment",
    likes: 80,
    dislikes: 25,
  },
  {
    name: "Faiz",
    created_at: "3 hours ago",
    content:
      "lorem ipsum dolor sit amet hello there lololo hahahahahaha this is a comment to see if this is a comment",
    likes: 9,
    dislikes: 25,
  },
  {
    name: "Ijlal",
    created_at: "6 hours ago",
    content:
      "lorem ipsum dolor sit amet hahahahahaha this fkjk fjkdjf jfsfkjdkvj is a comment to see if this is a comment",
    likes: 50,
    dislikes: 2,
  },
];

const ViewComments = (props) => {
  const [showOptions, setShowOptions] = useState(false);
  const isDark = useSelector((state) => state.mode.isDark);
  const [comment, setComment] = useState("");
  const isdisabled = comment.trim() === "";
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

  const CommentsModalContent = (
    <Fragment>
      <div className="p-2 dark:text-white">
        <div className="flex flex-wrap justify-center">
          <span className="mr-auto">Comments {dummycomments.length}</span>
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
                autoComplete="false"
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
          {dummycomments.map((comment) => {
            return (
              <div className="flex mb-4">
                <img
                  src={image}
                  alt="user"
                  className="w-10 h-10 rounded-full bg-white mr-4"
                />
                <div className="mr-auto">
                  <div className="flex flex-wrap items-center">
                    <span className="font mr-2">{comment.name}</span>
                    <span className="font-thin text-sm">
                      {comment.created_at}
                    </span>
                  </div>
                  <div className="flex flex-wrap">
                    <p>{comment.content}</p>
                  </div>
                  <div className="mt-2">
                    <span className="mr-4">
                      <ThumbUpOffAltIcon className="mr-2" /> {comment.likes}
                    </span>
                    <span>
                      <ThumbDownOffAltIcon className="mr-2" />{" "}
                      {comment.dislikes}
                    </span>
                  </div>
                </div>
                <div>
                  <EditDeleteComment />
                </div>
              </div>
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
