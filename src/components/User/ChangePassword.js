import ImageModal from "../UI/ProfileImageModal/ProfileImageModal";
import { TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
// import { authActions } from "../../store/auth";
// import { useState } from "react";
// import useHttp from "../../hooks/use-http";

const ChangePassword = (props) => {
  const isDark = useSelector((state) => state.mode.isDark);
  const darkTheme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
    },
  });
  const PasswordModalContent = (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className="mb-6">
          <TextField
            required
            className="w-full"
            id="standard-basic"
            variant="standard"
            autoComplete="off"
          />
        </div>
        <div className="mb-6">
          <TextField
            required
            className="w-full"
            id="standard-basic"
            variant="standard"
            autoComplete="off"
          />
        </div>
      </ThemeProvider>
    </div>
  );
  return <ImageModal>{PasswordModalContent}</ImageModal>;
};

export default ChangePassword;
