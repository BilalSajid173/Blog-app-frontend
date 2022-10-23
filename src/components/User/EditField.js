import { TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { useState } from "react";

//pass updated values to user in redux and extract that data on profile page

const EditField = (props) => {
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
      <div className="flex flex-wrap">
        <h1 className="mr-auto font-bold">{props.title}</h1>
        <span className="cursor-pointer" onClick={props.cross}>
          <CloseIcon fontSize="small" />
        </span>
        <span className="cursor-pointer">
          <DoneIcon fontSize="small" />
        </span>
      </div>
      <ThemeProvider theme={darkTheme}>
        <TextField
          className="w-full"
          id="standard-basic"
          variant="standard"
          autoComplete="off"
          onChange={fieldChangeHandler}
          value={fieldValue}
        />
      </ThemeProvider>
    </div>
  );
};

export default EditField;
