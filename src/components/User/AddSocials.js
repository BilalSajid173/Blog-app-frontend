import { TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import EditProfileModal from "../UI/EditProfileModal/EditProfileModal";
import { authActions } from "../../store/auth";
import { useState } from "react";
import useHttp from "../../hooks/use-http";

const AddSocials = (props) => {
  const isDark = useSelector((state) => state.mode.isDark);
  const [twitter, setTwitter] = useState(props.twitter);
  const [linkedIn, setLinkedIn] = useState(props.linkedIn);
  const [github, setGithub] = useState(props.github);
  const [facebook, setFacebook] = useState(props.facebook);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const { sendRequest: sendEditRequest } = useHttp();

  const valueChangeHandler = (field, e) => {
    if (field === "twitter") {
      setTwitter(e.target.value);
    } else if (field === "facebook") {
      setFacebook(e.target.value);
    } else if (field === "linkedIn") {
      setLinkedIn(e.target.value);
    } else if (field === "github") {
      setGithub(e.target.value);
    }
  };

  const editProfileResponseHandler = (data) => {
    dispatch(authActions.updateUser({ user: data }));
    props.onClick();
  };

  const submitHandler = () => {
    sendEditRequest(
      {
        url: "http://localhost:8000/api/user/editprofile/",
        method: "PUT",
        body: {
          twitter: twitter,
          facebook: facebook,
          linkedIn: linkedIn,
          github: github,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      },
      editProfileResponseHandler
    );
  };

  const darkTheme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
    },
  });

  const EditModalContent = (
    <div className="w-full mt-2 dark:text-white p-2">
      <h1 className="font-bold mb-6 text-2xl dark:text-gray-400 mx-auto">
        Add Socials
      </h1>
      <ThemeProvider theme={darkTheme}>
        <div className="mb-6">
          <TextField
            required
            className="w-full"
            id="standard-basic"
            variant="standard"
            autoComplete="off"
            onChange={valueChangeHandler.bind(null, "linkedIn")}
            placeholder="LinkedIn"
            value={linkedIn}
          />
        </div>
        <div className="mb-6">
          <TextField
            required
            className="w-full"
            id="standard-basic"
            variant="standard"
            autoComplete="off"
            onChange={valueChangeHandler.bind(null, "github")}
            placeholder="Github"
            value={github}
          />
        </div>
        <div className="mb-6">
          <TextField
            required
            className="w-full scollbar"
            id="standard-basic"
            variant="standard"
            autoComplete="off"
            onChange={valueChangeHandler.bind(null, "facebook")}
            placeholder="Facebook"
            value={facebook}
          />
        </div>
        <div className="mb-6">
          <TextField
            required
            className="w-full"
            id="standard-basic"
            variant="standard"
            autoComplete="off"
            onChange={valueChangeHandler.bind(null, "twitter")}
            placeholder="Twitter"
            value={twitter}
          />
        </div>
      </ThemeProvider>
      <div className="flex flex-wrap justify-center">
        <button
          onClick={submitHandler}
          className="border-2 text-lg border-blue-500 p-2 px-6 mt-4 rounded-md hover:bg-blue-500"
        >
          Done
        </button>
      </div>
    </div>
  );

  return (
    <EditProfileModal onClose={props.onClick}>
      {EditModalContent}
    </EditProfileModal>
  );
};
export default AddSocials;
