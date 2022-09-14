import React, { Fragment } from "react";
import image from "../../Images/hpbgimg2.jpg";
// import image1 from "../../Images/hpbgimg.png";
import Button from "../UI/Button/Button";
import AllArticles from "../Article/AllArticles";
import TopAuths from "./TopAuthors";

const authors = [
  { name: "Rashid" },
  { name: "Aatir" },
  { name: "Anzal" },
  { name: "Ijlal" },
  { name: "Faiz" },
];

const Home = () => {
  //   const isDark = localStorage.getItem("theme");
  //   console.log(isDark);
  return (
    <Fragment>
      <div className="relative flex flex-wrap justify-center my-10">
        {/* {isDark === null && (
          <img className="h-96 w-9/12" src={image1} alt="img"></img>
        )} */}
        <img className="h-96 w-9/12" src={image} alt="img"></img>
        <Button className="absolute bottom-12 left-2/3 p-3 px-5 bg-blue-500 text-2xl hover:bg-blue-800 dark:text-white rounded-sm">
          Write Something!!
        </Button>
      </div>
      <div className="flex flex-wrap justify-center">
        {/*handle active state for button bg color */}
        <div className="w-5/12 mr-6">
          <div className="mb-5">
            <Button className="p-3 bg-blue-300 dark:bg-white rounded-sm font-bold mr-3 hover:bg-gray-200">
              Latest
            </Button>
            <Button className="p-3 bg-blue-300 dark:bg-white rounded-sm font-bold  hover:bg-gray-200">
              Top Rated
            </Button>
          </div>
          <AllArticles />
        </div>
        <div className="sticky top-10 h-0 w-3/12 dark:text-white">
          <div className="mb-6">
            <h2 className="font-semibold mb-4">Top Authors</h2>
            <TopAuths authors={authors} />
          </div>
          <div>
            <h2 className="font-semibold">Popular Tags</h2>
            <div className="flex flex-wrap mt-2">
              <div className="transition-all cursor-pointer rounded-sm w-fit p-2 hover:bg-blue-200 first:ml-0 dark:hover:text-black">
                <span>#javascript</span>
              </div>
              <div className="transition-all cursor-pointer rounded-sm w-fit p-2 hover:bg-blue-200 first:ml-0 dark:hover:text-black">
                <span>#mongodb</span>
              </div>
              <div className="transition-all cursor-pointer rounded-sm w-fit p-2 hover:bg-blue-200 first:ml-0 dark:hover:text-black">
                <span>#nodejs</span>
              </div>
              <div className="transition-all cursor-pointer rounded-sm w-fit p-2 hover:bg-blue-200 first:ml-0 dark:hover:text-black">
                <span>#nextjs</span>
              </div>
              <div className="transition-all cursor-pointer rounded-sm w-fit p-2 hover:bg-blue-200 first:ml-0 dark:hover:text-black">
                <span>#typescript</span>
              </div>
              <div className="transition-all cursor-pointer rounded-sm w-fit p-2 hover:bg-blue-200 first:ml-0 dark:hover:text-black">
                <span>#javascript</span>
              </div>
              <div className="transition-all cursor-pointer rounded-sm w-fit p-2 hover:bg-blue-200 first:ml-0 dark:hover:text-black">
                <span>#mongodb</span>
              </div>
              <div className="transition-all cursor-pointer rounded-sm w-fit p-2 hover:bg-blue-200 first:ml-0 dark:hover:text-black">
                <span>#nodejs</span>
              </div>
              <div className="transition-all cursor-pointer rounded-sm w-fit p-2 hover:bg-blue-200 first:ml-0 dark:hover:text-black">
                <span>#nextjs</span>
              </div>
              <div className="transition-all cursor-pointer rounded-sm w-fit p-2 hover:bg-blue-200 first:ml-0 dark:hover:text-black">
                <span>#typescript</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
