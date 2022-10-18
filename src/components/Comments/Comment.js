import React, { Fragment, useState } from "react";
import CommentsModal from "../UI/CommentsModal/CommentsModal";
import image from "../../Images/userimg.png";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "@mui/icons-material/Close";
import OptionsMenu from "./CommentOptions";
import { TextField } from "@mui/material";
const ViewComments = (props) => {
  const [showOptions, setShowOptions] = useState(false);
  const optionsHandler = () => {
    setShowOptions(true);
  };

  const closeOptionsDiv = () => {
    setShowOptions(false);
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
        <div className="flex flex-wrap mt-4">
          <img
            src={image}
            alt="user"
            className="w-12 h-12 rounded-full bg-white mr-4"
          />
          <div className=" w-5/6">
            <TextField
              onClick={optionsHandler}
              className="w-full"
              id="standard-basic"
              placeholder="add a comment"
              variant="standard"
            />
            {showOptions && (
              <div className="mt-2">
                <button
                  onClick={closeOptionsDiv}
                  className="p-2 ml-[56.5%] bg-gray-700 rounded-sm mr-2"
                >
                  Cancel
                </button>
                <button disabled className="p-2 bg-gray-700 rounded-sm">
                  Comment
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
