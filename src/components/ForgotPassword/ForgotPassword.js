import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const ForgotPasswordForm = () => {
  const isDark = useSelector((state) => state.mode.isDark);
  const [showPassword, setShowPassword] = useState(false);

  const darkTheme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
    },
  });

  const handleShowPassword = () => {
    setShowPassword((prev) => {
      return !prev;
    });
  };

  return (
    <div className="flex flex-wrap justify-center items-center py-36 px-4">
      <div className="sm:w-4/6 w-full md:w-3/6 lg:w-2/6 p-6 bg-gray-200 py-12 rounded-md shadow-lg dark:bg-gray-900 dark:text-white">
        <h1 className="font-bold mb-6 text-2xl dark:text-gray-400 mx-auto">
          Change Password
        </h1>
        <ThemeProvider theme={darkTheme}>
          <div className="mb-6">
            <FormControl variant="outlined" className="w-full">
              <InputLabel htmlFor="outlined-adornment-password" required>
                New Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                // value={enteredPassword}
                // onChange={passwordChangeHandler}
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
                label="New Password"
              />
            </FormControl>
          </div>
          <div className="mb-6">
            <FormControl variant="outlined" className="w-full">
              <InputLabel htmlFor="outlined-adornment-password" required>
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                // value={enteredPassword}
                // onChange={passwordChangeHandler}
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
                label="Confirm Password"
              />
            </FormControl>
          </div>
        </ThemeProvider>
        <div className="flex flex-wrap justify-center">
          <button className="border-2 text-lg border-blue-500 p-2 px-6 mt-4 rounded-md hover:bg-blue-500 hover:text-white">
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
