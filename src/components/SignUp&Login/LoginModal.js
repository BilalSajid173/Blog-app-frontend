import React, { useContext } from "react";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import DarkContext from "../../store/darkmode-context";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const LoginModal = (props) => {
  const DarkCtx = useContext(DarkContext);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const darkTheme = createTheme({
    palette: {
      mode: DarkCtx.isDark ? "dark" : "light",
    },
  });

  const handleShowPassword = () => {
    setShowPassword((prev) => {
      return !prev;
    });
  };

  const passwordChangeHandler = (event) => {
    // console.log(event.target.value);
    // console.log(DarkCtx.isDark);
    setPassword(event.target.value);
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
          <div className="flex flex-wrap p-1 justify-center mb-4">
            <h2 className="text-xl sm:text-2xl text-gray-600 mr-auto dark:text-gray-200">
              Login To Continue
            </h2>
            <div className="flex flex-wrap justify-center pt-1">
              <FacebookIcon className="cursor-pointer text-blue-700 mr-1 dark:text-gray-200" />
              <TwitterIcon className="cursor-pointer text-blue-700 dark:text-blue-400" />
            </div>
          </div>
          <div className="mb-4 w-[calc(100vw-5rem)] sm:w-96">
            <ThemeProvider theme={darkTheme}>
              <TextField
                className="w-full"
                // color="red"
                required
                // sx={{ input: { color: "gray" } }}
                id="outlined-basic"
                label="Email"
                variant="outlined"
              />
            </ThemeProvider>
          </div>
          <div className="mb-8 w-[calc(100vw-5rem)] sm:w-96">
            <ThemeProvider theme={darkTheme}>
              <FormControl variant="outlined" className="w-full">
                <InputLabel htmlFor="outlined-adornment-password" required>
                  Password
                </InputLabel>
                {/*for the eye icon */}
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={passwordChangeHandler}
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
          <button className="mb-4 p-2 px-6 rounded bg-blue-500 hover:bg-blue-700 text-white">
            Sign In
          </button>
          <div className="flex flex-wrap justify-center">
            <span className="cursor-pointer mr-auto text-blue-600 dark:text-blue-300">
              Forgot Password?
            </span>
            <span className="cursor-pointer text-blue-600 dark:text-blue-300">
              Sign Up
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LoginModal;
