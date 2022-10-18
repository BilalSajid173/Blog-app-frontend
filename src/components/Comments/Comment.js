import React, { Fragment, useEffect, useState } from "react";
import CommentsModal from "../UI/CommentsModal/CommentsModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewComments = (props) => {
  const CommentsModalContent = (
    <Fragment>
      <div className="p-2 sm:px-6 dark:text-white"></div>
    </Fragment>
  );

  return (
    <CommentsModal onClose={props.onClick}>
      {CommentsModalContent}
    </CommentsModal>
  );
};

export default ViewComments;
