import React, { Fragment } from "react";
import SearchModal from "../UI/SearchBarModal/SearchBarModal";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

const SearchQueryModal = (props) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const isDark = useSelector((state) => state.mode.isDark);

  const darkTheme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
    },
  });

  const valueChangeHandler = (event) => {
    setQuery(event.target.value);
  };

  const searchClickHandler = (e) => {
    if (query.trim() === "") return;
    navigate(`/search?query=${query}`);
    setQuery("");
    props.onClick();
  };
  const SearchModalContent = (
    <Fragment>
      <div className="flex flex-col justify-center items-center h-full p-2 dark:text-white">
        <ThemeProvider theme={darkTheme}>
          <TextField
            className="w-full"
            required
            autoComplete="off"
            onChange={valueChangeHandler}
            id="outlined-basic"
            variant="outlined"
            placeholder="Search..."
          />
        </ThemeProvider>
        <button
          onClick={searchClickHandler}
          className="p-2 border-blue-500 border-2 rounded-md mt-4 w-[50%] transition-all duration-300 hover:bg-blue-500 hover:text-white"
        >
          Search
        </button>
      </div>
    </Fragment>
  );

  return (
    <SearchModal onClose={props.onClick}>{SearchModalContent}</SearchModal>
  );
};

export default SearchQueryModal;
