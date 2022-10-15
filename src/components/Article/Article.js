import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../../Images/userimg.png";
import Moment from "react-moment";
import BasicMenu from "./MenuOptions";

const Article = (props) => {
  const navigate = useNavigate();

  const clickHandler = (tag) => {
    navigate(`/all?page=1&sort=latest&tag=${tag}`);
  };
  return (
    <Fragment>
      <div className="border border-gray-300 dark:border-gray-500 flex flex-col p-3 bg-white dark:bg-[#1a2027] dark:text-white my-3 first:mt-0 rounded-sm">
        <div className="flex flex-wrap justify-center mb-2">
          {/*use cloudinary image component for image*/}
          <div className="rounded-full h-16 w-16 flex flex-wrap bg-gray-500 dark:bg-white">
            <img src={image} className="" alt="img"></img>
          </div>
          <div className="ml-2 mr-auto flex flex-wrap flex-col items-start justify-start">
            <Link to="/profile" className="font-bold">
              {props.name}
            </Link>
            <Moment fromNow>{props.createdAt}</Moment>
          </div>
          <div>
            {/* <i class="fa-regular fa-star"></i> */}
            {/* <i class="fa-solid fa-star"></i> */}
            <BasicMenu authorId={props.authorId} />
          </div>
        </div>
        <div className="">
          <h1 className="text-2xl font-bold">{props.title}</h1>
          <p>
            {props.content}
            {/*Single post + post id */}
            <Link to="/singlepost">Read More</Link>
          </p>

          <div className="flex flex-wrap mt-2">
            {props.tags.map((tag) => {
              return (
                <div
                  onClick={clickHandler.bind(null, tag)}
                  className="transition-all cursor-pointer rounded-sm w-fit p-1 mx-2 hover:bg-red-200 first:ml-0 dark:hover:text-black"
                >
                  <span>#{tag}</span>
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap mt-3">
            <div className="flex flex-wrap transition-all cursor-pointer rounded-sm w-fit mx-2 ml-0  dark:hover:text-black">
              <span className="p-1 px-2 border border-rose-400 rounded-sm  hover:bg-gray-100">
                <i class="fas mr-2 fa-light fa-message"></i> {props.comments}{" "}
                comments
              </span>
            </div>
            <div className="flex flex-wrap transition-all cursor-pointer rounded-sm w-fit mx-2  dark:hover:text-black">
              <span className="p-1 px-2 border border-rose-400 rounded-sm  hover:bg-gray-100">
                <i class="mr-2 fa-solid fa-heart"></i> {props.likes} likes
              </span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Article;
