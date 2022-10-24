import ImageModal from "../UI/ProfileImageModal/ProfileImageModal";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useState } from "react";
import useHttp from "../../hooks/use-http";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = (props) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const isDark = useSelector((state) => state.mode.isDark);
  const { sendRequest: editPasswordRequest } = useHttp();
  const token = useSelector((state) => state.auth.token);
  const darkTheme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
    },
  });

  const responseHandler = (data) => {
    toast.success("Password updated successfully!");
    props.onClick()
  };

  const submitHandler = () => {
    if (oldPassword.trim().length < 8 || newPassword.trim().length < 8) {
      toast.error("Password length cannot be less than 8!");
      return;
    }

    editPasswordRequest(
      {
        url: "http://localhost:8000/api/user/changepassword/",
        method: "PUT",
        body: {
          old_password: oldPassword,
          new_password: newPassword,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      },
      responseHandler
    );
  };

  const handleShowOldPassword = () => {
    setShowOldPassword((prev) => {
      return !prev;
    });
  };

  const handleShowNewPassword = () => {
    setShowNewPassword((prev) => {
      return !prev;
    });
  };

  const passwordChangeHandler = (type, e) => {
    if (type === "old") {
      setOldPassword(e.target.value);
    } else {
      setNewPassword(e.target.value);
    }
  };

  const PasswordModalContent = (
    <div className="dark:text-white p-2">
      <h1 className="font-bold text-lg mb-4 mt-4 dark:text-gray-400">
        Change Password
      </h1>
      <ThemeProvider theme={darkTheme}>
        <div className="mb-6">
          <FormControl variant="outlined" className="w-full">
            <InputLabel htmlFor="outlined-adornment-password" required>
              Old Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showOldPassword ? "text" : "password"}
              required
              value={oldPassword}
              onChange={passwordChangeHandler.bind(null, "old")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowOldPassword}
                    edge="end"
                  >
                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Old Password"
            />
          </FormControl>
        </div>
        <div className="mb-6">
          <FormControl variant="outlined" className="w-full">
            <InputLabel htmlFor="outlined-adornment-password" required>
              New Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showNewPassword ? "text" : "password"}
              required
              value={newPassword}
              onChange={passwordChangeHandler.bind(null, "new")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowNewPassword}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="New Password"
            />
          </FormControl>
        </div>
      </ThemeProvider>
      <div className="p-2 flex flex-wrap justify-center">
        <button
          onClick={submitHandler}
          className="p-2 px-6 mr-2 border-2 border-blue-500 rounded-md hover:bg-blue-500"
        >
          Submit
        </button>
        <button
          onClick={props.onClick}
          className="p-2 px-6 border-2 border-blue-500 rounded-md hover:bg-blue-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
  return (
    <ImageModal onClose={props.onClick}>{PasswordModalContent}</ImageModal>
  );
};

export default ChangePassword;
