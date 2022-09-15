import React, { useState } from "react";

const DarkContext = React.createContext({
  isDark: false,
  changeMode: () => {},
});

export const DarkContextProvider = (props) => {
  const [isDark, setIsDark] = useState(false);

  const changeModeHandler = () => {
    setIsDark((prev) => {
      //   if (prev) {
      //     document.body.classList.remove("bg-gray-800");
      //     document.documentElement.classList.remove("dark");
      //   } else {
      //     document.body.classList.add("bg-gray-800");
      //     document.documentElement.classList.add("dark");
      //   }
      return !prev;
    });
  };
  const contextValue = {
    isDark: isDark,
    changeMode: changeModeHandler,
  };

  return (
    <DarkContext.Provider value={contextValue}>
      {props.children}
    </DarkContext.Provider>
  );
};

export default DarkContext;
