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
          <span className="mr-auto">Comments 50</span>
          <div className="flex flex-wrap justify-center items-center">
            <OptionsMenu className="cursor-pointer" />
            <CloseIcon
              onClick={props.onClick}
              className="cursor-pointer ml-4"
            />
          </div>
        </div>
        <div className="flex flex-wrap mt-4 w-full">
          <img
            src={image}
            alt="user"
            className="w-12 h-12 rounded-full bg-white mr-4"
          />
          <div className="w-[80%] sm:w-[85%]">
            <ThemeProvider theme={darkTheme}>
              <TextField
                onChange={commentChangeHandler}
                onClick={optionsHandler}
                className="w-full"
                id="standard-basic"
                placeholder="add a comment"
                variant="standard"
              />
            </ThemeProvider>
            {showOptions && (
              <div className="mt-2 flex flex-wrap ">
                <button
                  onClick={closeOptionsDiv}
                  className="p-2 ml-auto bg-gray-700 rounded-sm mr-2"
                >
                  CANCEL
                </button>
                <button
                  disabled={isdisabled ? true : false}
                  className="p-2 bg-gray-700 rounded-sm disabled:bg-zinc-700 disabled:text-gray-500"
                >
                  COMMENT
                </button>
              </div>
            )}
          </div>
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
