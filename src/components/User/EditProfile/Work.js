import { TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

const WorkInfo = (props) => {
  const isDark = useSelector((state) => state.mode.isDark);

  const darkTheme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
    },
  });

  return (
    <div className="w-full">
      <h1 className="font-bold mb-6 text-2xl dark:text-gray-400 mx-auto">
        Education and Work
      </h1>
      <ThemeProvider theme={darkTheme}>
        <div className="mb-6">
          <TextField
            required
            className="w-full"
            id="standard-basic"
            variant="standard"
            autoComplete="off"
            onChange={props.valueChangeHandler.bind(null, "education")}
            placeholder="Education"
            value={props.education || ""}
          />
        </div>
        <div className="mb-6">
          <TextField
            required
            className="w-full"
            id="standard-basic"
            variant="standard"
            autoComplete="off"
            onChange={props.valueChangeHandler.bind(null, "work")}
            placeholder="Occupation"
            value={props.work || ""}
          />
        </div>
        <div className="mb-6">
          <TextField
            className="w-full"
            id="standard-basic"
            variant="standard"
            autoComplete="off"
            multiline
            onChange={props.valueChangeHandler.bind(null, "experience")}
            placeholder="Experience"
            value={props.experience || ""}
          />
        </div>
      </ThemeProvider>
      <div className="flex flex-wrap justify-center">
        <button
          onClick={props.prevHandler}
          className="border-2 hover:text-white text-lg border-blue-500 p-2 px-6 mt-4 rounded-md hover:bg-blue-500 mr-2"
        >
          Previous
        </button>
        <button
          onClick={props.nextHandler}
          className="border-2 hover:text-white text-lg border-blue-500 p-2 px-6 mt-4 rounded-md hover:bg-blue-500"
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default WorkInfo;
