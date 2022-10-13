import React from "react";
// import image from "../../Images/hpbgimg.png";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";

//Checkout responsive images from cloudinary if needed

const TopArticle = (props) => {
  return (
    <Link to={`/${props.id}`}>
      <div className="h-[100%] transition-all duration-300 bg-gray-200 w-[100%] rounded-md shadow-md shadow-gray-400 hover:scale-90 cursor-pointer dark:shadow-none dark:bg-gray-700">
        {/* <img className="rounded-t-md" src={image2} alt="img"></img> */}
        <Image
          className="rounded-t-md w-full h-[13rem]"
          cloudName="dntn0wocu"
          publicId={props.imageId}
          crop="fill"
        />
        <div className="p-3 dark:bg-gray-700 rounded-b-md dark:text-gray-400">
          <h1 className="font-bold text-lg">{props.title}</h1>
          <p>{props.content}</p>
        </div>
      </div>
    </Link>
  );
};

export default TopArticle;
