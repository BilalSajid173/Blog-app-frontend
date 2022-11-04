import { TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

const PersonalInfo = (props) => {
  const isDark = useSelector((state) => state.mode.isDark);

  const darkTheme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
    },
  });

  return (
    <div className="w-full">
      <h1 className="font-bold mb-6 text-2xl dark:text-gray-400 mx-auto">
        Personal Information
      </h1>
      <ThemeProvider theme={darkTheme}>
        <div className="mb-6">
          <TextField
            required
            className="w-full"
            id="standard-basic"
            variant="standard"
            autoComplete="off"
            onChange={props.valueChangeHandler.bind(null, "name")}
            placeholder="Name *"
            value={props.name}
          />
        </div>
        <div className="mb-6">
          <TextField
            required
            className="w-full"
            id="standard-basic"
            variant="standard"
            autoComplete="off"
            onChange={props.valueChangeHandler.bind(null, "email")}
            placeholder="Email *"
            value={props.email}
          />
        </div>
        <div className="mb-6">
          <TextField
            className="w-full"
            id="standard-basic"
            variant="standard"
            autoComplete="off"
            onChange={props.valueChangeHandler.bind(null, "number")}
            placeholder="Phone Number"
            value={props.number}
          />
        </div>
        <div className="mb-6">
          <TextField
            className="w-full"
            id="standard-basic"
            variant="standard"
            autoComplete="off"
            onChange={props.valueChangeHandler.bind(null, "address")}
            placeholder="Address"
            value={props.address}
          />
        </div>
        <div className="mb-6">
          <TextField
            type="number"
            className="w-full"
            id="standard-basic"
            variant="standard"
            autoComplete="off"
            onChange={props.valueChangeHandler.bind(null, "age")}
            placeholder="Age"
            value={props.age}
          />
        </div>
      </ThemeProvider>
      <div className="flex flex-wrap justify-center">
        <button
          onClick={props.nextHandler}
          className="border-2 text-lg border-blue-500 p-2 px-6 mt-4 rounded-md hover:bg-blue-500 hover:text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default PersonalInfo;
