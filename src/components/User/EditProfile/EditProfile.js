import React, { Fragment } from "react";
import { useState } from "react";
import EditProfileModal from "../../UI/EditProfileModal/EditProfileModal";
// import { useSelector, useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import useHttp from "../../hooks/use-http";
import PersonalInfo from "./PersonalInfo";

const EditProfile = (props) => {
  const [page, setPage] = useState(1);
  const [name, setName] = useState(props.name);
  const [email, setEmail] = useState(props.email);
  const [address, setAddress] = useState(props.address);
  const [age, setAge] = useState(props.age);
  const [number, setNumber] = useState(props.number);

  const valueChangeHandler = (field, e) => {
    if (field === "name") {
      setName(e.target.value);
    } else if (field === "email") {
      setEmail(e.target.value);
    } else if (field === "number") {
      setNumber(e.target.value);
    } else if (field === "age") {
      setAge(e.target.value);
    } else if (field === "address") {
      setAddress(e.target.value);
    }
  };

  const nextHandler = () => {
    setPage((prev) => {
      return prev + 1;
    });
  };
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
        {page === 1 && (
          <PersonalInfo
            name={name}
            age={age}
            email={email}
            address={address}
            number={number}
            valueChangeHandler={valueChangeHandler}
            nextHandler={nextHandler}
          />
        )}
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
