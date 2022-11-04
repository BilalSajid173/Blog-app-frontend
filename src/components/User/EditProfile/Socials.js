import { TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

const SocialLinks = (props) => {
  const isDark = useSelector((state) => state.mode.isDark);

  const darkTheme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
    },
  });

  return (
    <div className="w-full">
      <h1 className="font-bold mb-6 text-2xl dark:text-gray-400 mx-auto">
        Add Socials
      </h1>
      <ThemeProvider theme={darkTheme}>
        <div className="mb-6">
          <TextField
            required
            className="w-full"
            id="standard-basic"
            variant="standard"
            autoComplete="off"
            onChange={props.valueChangeHandler.bind(null, "linkedIn")}
            placeholder="LinkedIn"
            value={props.linkedIn}
          />
        </div>
        <div className="mb-6">
          <TextField
            required
            className="w-full"
            id="standard-basic"
            variant="standard"
            autoComplete="off"
            onChange={props.valueChangeHandler.bind(null, "github")}
            placeholder="Github"
            value={props.github}
          />
        </div>
        <div className="mb-6">
          <TextField
            required
            className="w-full scollbar"
            id="standard-basic"
            variant="standard"
            autoComplete="off"
            onChange={props.valueChangeHandler.bind(null, "facebook")}
            placeholder="Facebook"
            value={props.facebook}
          />
        </div>
        <div className="mb-6">
          <TextField
            required
            className="w-full"
            id="standard-basic"
            variant="standard"
            autoComplete="off"
            onChange={props.valueChangeHandler.bind(null, "twitter")}
            placeholder="Twitter"
            value={props.twitter}
          />
        </div>
      </ThemeProvider>
      <div className="flex flex-wrap justify-center">
        <button
          onClick={props.prevHandler}
          className="border-2 text-lg border-blue-500 hover:text-white p-2 px-6 mt-4 rounded-md hover:bg-blue-500 mr-2"
        >
          Previous
        </button>
        <button
          onClick={props.submitHandler}
          className="border-2 text-lg border-blue-500 hover:text-white p-2 px-6 mt-4 rounded-md hover:bg-blue-500"
        >
          Submit
        </button>
      </div>
    </div>
  );
};
export default SocialLinks;
