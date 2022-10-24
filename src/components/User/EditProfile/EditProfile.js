import React, { Fragment } from "react";
import EditProfileModal from "../../UI/EditProfileModal/EditProfileModal";
// import { useSelector, useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import useHttp from "../../hooks/use-http";
import PersonalInfo from "./PersonalInfo";

const EditProfile = (props) => {
  //   fetchComments(
  //     {
  //       url: "http://localhost:8000/api/products/getcomments/" + props.id + "/",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     },
  //     commentsHandler
  //   );

  const EditModalContent = (
    <Fragment>
      <div className="p-2 dark:text-white">
        <PersonalInfo />
      </div>
    </Fragment>
  );

  return (
    <EditProfileModal onClose={props.onClick}>
      {EditModalContent}
    </EditProfileModal>
  );
};

export default EditProfile;
