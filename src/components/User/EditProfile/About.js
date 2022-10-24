import { TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

const About = (props) => {
  const isDark = useSelector((state) => state.mode.isDark);

  const darkTheme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
    },
  });

  return (
    <div className="w-full mt-2">
      <h1 className="font-bold mb-6 text-2xl dark:text-gray-400 mx-auto">
        About Yourself
      </h1>
      <ThemeProvider theme={darkTheme}>
        <div className="mb-6">
          <TextField
            required
            className="w-full scollbar"
            id="standard-basic"
            variant="standard"
            autoComplete="off"
            multiline
            rows={5}
            onChange={props.valueChangeHandler.bind(null, "bio")}
            placeholder="Bio"
            value={props.bio}
          />
        </div>
        <div className="mb-6">
          <TextField
            required
            className="w-full"
            id="standard-basic"
            variant="standard"
            autoComplete="off"
            multiline
            rows={3}
            onChange={props.valueChangeHandler.bind(null, "about")}
            placeholder="About"
            value={props.about}
          />
        </div>
      </ThemeProvider>
      <div className="flex flex-wrap justify-center">
        <button
          onClick={props.prevHandler}
          className="border-2 text-lg border-blue-500 p-2 px-6 mt-4 rounded-md hover:bg-blue-500 mr-2"
        >
          Previous
        </button>
        <button
          onClick={props.nextHandler}
          className="border-2 text-lg border-blue-500 p-2 px-6 mt-4 rounded-md hover:bg-blue-500"
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default About;
