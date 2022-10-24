import React, { Fragment } from "react";
// import { useState } from "react";
import ImageModal from "../UI/ProfileImageModal/ProfileImageModal";
// import { useSelector, useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const EditImage = (props) => {
  //   sendEditRequest({
  //     url: "http://localhost:8000/api/user/editprofile/",
  //     method: "PUT",
  //     body: {
  //     },
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + token,
  //     },
  //   });

  const EditImageModalContent = (
    <Fragment>
      <div className="p-2 dark:text-white"></div>
    </Fragment>
  );

  return (
    <ImageModal onClose={props.onClick}>{EditImageModalContent}</ImageModal>
  );
};

export default EditImage;
