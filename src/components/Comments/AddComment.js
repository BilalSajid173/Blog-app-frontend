import { useState } from "react";
import { TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

import image from "../../Images/userimg.png";

const AddComment = (props) => {
  const [showOptions, setShowOptions] = useState(false);
  const [comment, setComment] = useState("");
  const isdisabled = comment.trim() === "";
  const isDark = useSelector((state) => state.mode.isDark);

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

  return (
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
  );
};

export default AddComment;
