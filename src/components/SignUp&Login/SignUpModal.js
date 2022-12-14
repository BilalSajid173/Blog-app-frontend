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
import { useSelector } from "react-redux";
import Loader from "../UI/Loader/Loader";
import { BASE_URL } from "../../lib/apiurl";

const SignupModal = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const { error, setError, isLoading, sendRequest: userSignup } = useHttp();
  const isDark = useSelector((state) => state.mode.isDark);

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
    value: enteredName,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    onBlurHandler: nameBlurHandler,
    isValid: nameIsValid,
    reset: resetName,
  } = useInput((value) => value.trim() !== "");

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
    resetName();
    setError(null);
    toast.error("User with this email already exists!");
    props.handleClose();
  }

  const signupResponseHandler = (data) => {
    props.handleClose();
    toast.success("Signup Successful!");
    resetEmail();
    resetpassword();
    resetName();
  };

  const userSignupHandler = () => {
    if (!emailIsValid || !passwordIsValid || !nameIsValid) return;
    userSignup(
      {
        url: BASE_URL + "api/user/register/",
        method: "POST",
        body: {
          name: enteredName,
          email: enteredEmail.trim().toLowerCase(),
          password: enteredPassword.trim(),
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
      signupResponseHandler
    );
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => {
      return !prev;
    });
  };

  //change input fields to error fields conditionally on errors
  return (
    <div>
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
              Create Account
            </h2>
            {/* <div className="flex flex-wrap justify-center pt-1">
              <FacebookIcon className="cursor-pointer text-blue-700 mr-1 dark:text-gray-200" />
              <TwitterIcon className="cursor-pointer text-blue-700 dark:text-blue-400" />
            </div> */}
          </div>
          <div className="mb-4 w-[calc(100vw-5rem)] sm:w-96">
            {nameHasError && (
              <p className="text-red-600 mb-2">Please enter a name.</p>
            )}
            <ThemeProvider theme={darkTheme}>
              <TextField
                error={nameHasError}
                className="w-full"
                required
                id="outlined-basic"
                label="Name"
                variant="outlined"
                value={enteredName}
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
              />
            </ThemeProvider>
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
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={enteredEmail}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
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
            onClick={userSignupHandler}
          >
            Sign Up!
          </button>
          <div className="flex flex-wrap justify-center">
            <span
              className="cursor-pointer text-blue-600 dark:text-blue-300"
              onClick={props.loginHandler}
            >
              Already Have an account? Sign In
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SignupModal;
