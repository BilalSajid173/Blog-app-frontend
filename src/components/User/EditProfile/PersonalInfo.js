import { TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useState } from "react";

const PersonalInfo = (props) => {
  const isDark = useSelector((state) => state.mode.isDark);
  const [fieldValue, setFieldValue] = useState(props.value);

  const darkTheme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
    },
  });

  const fieldChangeHandler = (event) => {
    setFieldValue(event.target.value);
  };

  return (
    <div className="w-full mt-2">
      <ThemeProvider theme={darkTheme}>
        <TextField
          className="w-full"
          id="standard-basic"
          variant="standard"
          autoComplete="off"
          onChange={fieldChangeHandler}
          placeholder="Email"
          value={fieldValue}
        />
        <TextField
          className="w-full"
          id="standard-basic"
          variant="standard"
          autoComplete="off"
          onChange={fieldChangeHandler}
          placeholder="Email"
          value={fieldValue}
        />
        <TextField
          className="w-full"
          id="standard-basic"
          variant="standard"
          autoComplete="off"
          onChange={fieldChangeHandler}
          placeholder="Email"
          value={fieldValue}
        />
      </ThemeProvider>
    </div>
  );
};
export default PersonalInfo;
