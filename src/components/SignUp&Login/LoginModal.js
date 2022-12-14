import React from "react";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import FacebookIcon from "@mui/icons-material/Facebook";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import Loader from "../UI/Loader/Loader";
import { useNavigate } from "react-router-dom";
import ForgotPasswordModal from "./ForgotPassword";
import { BASE_URL } from "../../lib/apiurl";

const LoginModal = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const { error, setError, isLoading, sendRequest: userLogin } = useHttp();
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.mode.isDark);
  const navigate = useNavigate();
  const [openForgotModal, setOpenForgotModal] = useState(false);

  const darkTheme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
    },
  });

  const {
    value: enteredEmail,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    onBlurHandler: emailBlurHandler,
    isValid: emailIsValid,
    reset: resetEmail,
  } = useInput((value) => value.trim().includes("@"));

  const {
    value: enteredPassword,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    onBlurHandler: passwordBlurHandler,
    isValid: passwordIsValid,
    reset: resetpassword,
  } = useInput((value) => value.trim().length >= 8);

  if (error) {
    resetEmail();
    resetpassword();
    setError(null);
    toast.error("Invalid username or password");
    props.handleClose();
  }

  const loginResponseHandler = (data) => {
    dispatch(
      authActions.login({
        user: data.data,
        token: data.data.token,
        likedPosts: data.data.likedPosts.map((post) => {
          return post.id;
        }),
        savedPosts: data.data.savedPosts.map((post) => {
          return post.id;
        }),
        comments: data.data.comments.map((comment) => {
          return comment.id;
        }),
        likedComments: data.data.likedComments.map((comment) => {
          return comment.id;
        }),
        dislikedComments: data.data.dislikedComments.map((comment) => {
          return comment.id;
        }),
        following: data.data.following.map((user) => {
          return user.following_user_id;
        }),
      })
    );
    props.handleClose();
    toast.success("Login Successful!");
    resetEmail();
    resetpassword();
    navigate("/");
  };

  const userLoginHandler = () => {
    if (!emailIsValid || !passwordIsValid) return;
    userLogin(
      {
        url: BASE_URL + "api/user/login/",
        method: "POST",
        body: {
          email: enteredEmail.trim().toLowerCase(),
          password: enteredPassword.trim(),
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
      loginResponseHandler
    );
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => {
      return !prev;
    });
  };

  const forgotModalHandler = () => {
    setOpenForgotModal((prev) => {
      return !prev;
    });
    props.handleClose();
  };

  return (
    <div>
      {openForgotModal && (
        <ForgotPasswordModal
          open={openForgotModal}
          onClose={forgotModalHandler}
        />
      )}
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="rounded-sm absolute flex flex-col top-2/4 left-2/4 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 p-4 py-10 dark:bg-slate-700 dark:text-white">
          {isLoading && (
            <div className="w-11/12 h-5/6 flex justify-center items-center absolute">
              <Loader />
            </div>
          )}
          <div className="flex flex-wrap p-1 justify-center mb-4">
            <h2 className="text-xl sm:text-2xl text-gray-600 mr-auto dark:text-gray-200">
              Login To Continue
            </h2>
          </div>
          <div className="mb-4 w-[calc(100vw-5rem)] sm:w-96">
            {emailHasError && (
              <p className="text-red-600 mb-2">Please enter a valid email.</p>
            )}
            <ThemeProvider theme={darkTheme}>
              <TextField
                error={emailHasError}
                className="w-full"
                required
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                value={enteredEmail}
                id="outlined-basic"
                label="Email"
                variant="outlined"
              />
            </ThemeProvider>
          </div>
          <div className="mb-8 w-[calc(100vw-5rem)] sm:w-96">
            {passwordHasError && (
              <p className="text-red-600 mb-2">
                Password should be a minimum of 8 characters long.
              </p>
            )}
            <ThemeProvider theme={darkTheme}>
              <FormControl
                variant="outlined"
                className="w-full"
                error={passwordHasError}
              >
                <InputLabel htmlFor="outlined-adornment-password" required>
                  Password
                </InputLabel>
                {/*for the eye icon */}
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={enteredPassword}
                  onChange={passwordChangeHandler}
                  onBlur={passwordBlurHandler}
                  required
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </ThemeProvider>
          </div>
          <button
            className="mb-4 p-2 px-6 rounded bg-blue-500 hover:bg-blue-700 text-white"
            onClick={userLoginHandler}
          >
            Sign In
          </button>
          <div className="flex flex-wrap justify-center">
            <span
              onClick={forgotModalHandler}
              className="cursor-pointer mr-auto text-blue-600 dark:text-blue-300"
            >
              Forgot Password?
            </span>
            <span
              className="cursor-pointer text-blue-600 dark:text-blue-300"
              onClick={props.signUpHandler}
            >
              Sign Up
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LoginModal;
