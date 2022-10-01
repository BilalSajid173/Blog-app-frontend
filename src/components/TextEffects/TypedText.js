import React from "react";
import classes from "./TypedText.module.css";
import useTypedText from "../../hooks/useTypedText";

const typedtextarray = [
  "Something On Your Mind?",
  "Write A Blog!",
  "Read Articles From Top Authors!",
];

const TypedText = () => {
  const typedText = useTypedText(typedtextarray);
  return (
    <>
      <div>
        <span
          className={`${classes.blinkingcursor} text-lg pl-2 text-black dark:text-gray-400`}
        >
          {typedText}
        </span>
      </div>
    </>
  );
};

export default TypedText;
