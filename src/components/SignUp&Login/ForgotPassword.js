import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import useHttp from "../../hooks/use-http";
import { useSelector } from "react-redux";
import useHttp from "../../hooks/use-http";

const ForgotPasswordModal = (props) => {
  //   const { error, setError, isLoading, sendRequest: userLogin } = useHttp();
  const isDark = useSelector((state) => state.mode.isDark);
  const [email, setEmail] = useState("");
  const { sendRequest } = useHttp();
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const responseHandler = (data) => {
    toast.success("Email sent successfully!!")
    props.onClose();
  };

  const submitHandler = () => {
    if (!email.trim().includes("@") || email.trim().length === 0) {
      toast.error("Please enter a valid email address");
      return;
    }
    sendRequest(
      {
        url: "http://localhost:8000/api/user/forgetpassword/",
        method: "POST",
        body: {
          email: email.trim().toLowerCase(),
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
      responseHandler
    );
  };

  const darkTheme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
    },
  });

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="rounded-sm absolute flex flex-col top-2/4 left-2/4 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 p-4 py-10 dark:bg-slate-700 dark:text-white">
          <div className="flex flex-wrap p-1 justify-center mb-4">
            <h2 className="text-xl sm:text-2xl text-gray-600 mr-auto dark:text-gray-200">
              Enter Your Email.
            </h2>
          </div>
          <div className="mb-4 w-[calc(100vw-5rem)] sm:w-96">
            <ThemeProvider theme={darkTheme}>
              <TextField
                className="w-full"
                required
                onChange={emailChangeHandler}
                value={email}
                id="outlined-basic"
                label="Email"
                variant="outlined"
              />
            </ThemeProvider>
          </div>
          <div className="flex flex-wrap justify-center">
            <button
              onClick={submitHandler}
              className="border-2 text-lg border-blue-500 p-2 px-6 mt-4 rounded-md hover:bg-blue-500 hover:text-white"
            >
              Send Link
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ForgotPasswordModal;
