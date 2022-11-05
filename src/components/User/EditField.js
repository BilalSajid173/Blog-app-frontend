import { TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { useState } from "react";
import useHttp from "../../hooks/use-http";
import { authActions } from "../../store/auth";
import { BASE_URL } from "../../lib/apiurl";

//pass updated values to user in redux and extract that data on profile page

const EditField = (props) => {
  const isDark = useSelector((state) => state.mode.isDark);
  const [fieldValue, setFieldValue] = useState(props.value);
  const { sendRequest: fieldEdit } = useHttp();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const darkTheme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
    },
  });

  const fieldChangeHandler = (event) => {
    setFieldValue(event.target.value);
  };

  const editResponseHandler = (data) => {
    dispatch(authActions.updateUser({ user: data }));
    props.cross();
  };

  const submitHandler = (title) => {
    let body;
    if (title === "email") {
      body = {
        email: fieldValue,
      };
    } else if (title === "education") {
      body = {
        education: fieldValue,
      };
    } else if (title === "age") {
      body = {
        age: fieldValue,
      };
    } else if (title === "address") {
      body = {
        address: fieldValue,
      };
    } else if (title === "number") {
      body = {
        number: fieldValue,
      };
    }

    fieldEdit(
      {
        url: BASE_URL + "api/user/editprofile/",
        method: "PUT",
        body: { ...body },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      },
      editResponseHandler
    );
  };

  return (
    <div className="w-full mt-2">
      <div className="flex flex-wrap">
        <h1 className="mr-auto font-bold">{props.title}</h1>
        <span className="cursor-pointer" onClick={props.cross}>
          <CloseIcon fontSize="small" />
        </span>
        <span
          className="cursor-pointer"
          onClick={submitHandler.bind(null, props.title.toLowerCase())}
        >
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
