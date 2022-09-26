import React, { Fragment } from "react";
import AddArticleModal from "../UI/AddArticleModal/AddArticleModal";
// import useInput from "../../hooks/use-input";
// import AuthContext from "../../store/auth-context";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const AddNewArticle = (props) => {
  const NewArticleFormContent = (
    <Fragment>
      <div>Hello World!</div>
    </Fragment>
  );

  return (
    <AddArticleModal onClose={props.onClick}>
      {NewArticleFormContent}
    </AddArticleModal>
  );
};

export default AddNewArticle;
