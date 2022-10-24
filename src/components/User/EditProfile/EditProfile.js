import React, { Fragment } from "react";
import { useState } from "react";
import EditProfileModal from "../../UI/EditProfileModal/EditProfileModal";
// import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import useHttp from "../../hooks/use-http";
import PersonalInfo from "./PersonalInfo";
import WorkInfo from "./Work";
import About from "./About";
import SocialLinks from "./Socials";

const EditProfile = (props) => {
  const [page, setPage] = useState(1);
  const [name, setName] = useState(props.name);
  const [email, setEmail] = useState(props.email);
  const [address, setAddress] = useState(props.address);
  const [age, setAge] = useState(props.age);
  const [number, setNumber] = useState(props.number);
  const [education, setEducation] = useState(props.education);
  const [work, setWork] = useState(props.work);
  const [experience, setExperience] = useState(props.experience);
  const [bio, setBio] = useState(props.bio);
  const [about, setAbout] = useState(props.about);
  const [twitter, setTwitter] = useState(props.twitter);
  const [linkedIn, setLinkedIn] = useState(props.linkedIn);
  const [github, setGithub] = useState(props.github);
  const [facebook, setFacebook] = useState(props.facebook);

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
    } else if (field === "education") {
      setEducation(e.target.value);
    } else if (field === "work") {
      setWork(e.target.value);
    } else if (field === "experience") {
      setExperience(e.target.value);
    } else if (field === "about") {
      setAbout(e.target.value);
    } else if (field === "bio") {
      setBio(e.target.value);
    } else if (field === "twitter") {
      setTwitter(e.target.value);
    } else if (field === "facebook") {
      setFacebook(e.target.value);
    } else if (field === "linkedIn") {
      setLinkedIn(e.target.value);
    } else if (field === "github") {
      setGithub(e.target.value);
    }
  };

  const nextHandler = () => {
    setPage((prev) => {
      return prev + 1;
    });
  };

  const prevHandler = () => {
    setPage((prev) => {
      return prev - 1;
    });
  };

  const submitHandler = () => {
    if (name.trim() === "") {
      console.log("name cannot be empty");
      toast.error("Name cannot be empty.");
      return;
    } else if (!email.trim().includes("@")) {
      console.log("please enter a valid email");
      toast.error("Please enter a valid email!");
      return;
    }
    props.onClick();
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
        {page === 2 && (
          <WorkInfo
            valueChangeHandler={valueChangeHandler}
            education={education}
            work={work}
            experience={experience}
            nextHandler={nextHandler}
            prevHandler={prevHandler}
          />
        )}
        {page === 3 && (
          <About
            bio={bio}
            valueChangeHandler={valueChangeHandler}
            about={about}
            nextHandler={nextHandler}
            prevHandler={prevHandler}
          />
        )}
        {page === 4 && (
          <SocialLinks
            valueChangeHandler={valueChangeHandler}
            prevHandler={prevHandler}
            submitHandler={submitHandler}
            facebook={facebook}
            twitter={twitter}
            linkedIn={linkedIn}
            github={github}
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
