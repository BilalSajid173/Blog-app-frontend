import React from "react";
// import image from "../../Images/hpbgimg.png";
import image2 from "../../Images/hpbgimg2.jpg";

const TopArticle = (props) => {
  return (
    <div className="transition-all duration-300 bg-gray-200 w-[31%] rounded-md shadow-md shadow-gray-400 hover:scale-90 cursor-pointer dark:shadow-none dark:bg-gray-800">
      <img className="rounded-t-md" src={image2} alt="img"></img>
      <div className="p-3 dark:bg-gray-700 rounded-b-md dark:text-gray-400">
        <h1 className="font-bold text-lg">{props.title}</h1>
        <p>{props.content.substring(0, 200)}...</p>
      </div>
    </div>
  );
};

export default TopArticle;
