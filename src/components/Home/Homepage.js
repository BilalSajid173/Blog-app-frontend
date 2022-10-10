import React, { Fragment, useContext, useEffect, useRef } from "react";
//import image from "../../Images/hpbgimg2.jpg";
// import image1 from "../../Images/hpbgimg.png";
import Button from "../UI/Button/Button";
import AllArticles from "../Article/AllArticles";
import TopAuths from "./TopAuthors";
// import TopPicks from "./TopArticles";
import lottie from "lottie-web";
import classes from "../TextEffects/TextEffects.module.css";
import TypedText from "../TextEffects/TypedText";
import Carousel from "./Carousel";
import  DarkContextProvider  from "../../store/darkmode-context";

const authors = [
  {
    name: "Rashid",
    address: "New York",
    exp: "orem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua.",
    email: "rashid@gmail.com",
    education: "Oxford Uni",
  },
  {
    name: "Aatir",
    address: "San Francisco",
    exp: "orem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua.",
    email: "aatir@gmail.com",
    education: "Cambridge Uni",
  },
  {
    name: "Anzal",
    address: "Paris",
    exp: "orem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua.",
    email: "anzal@gmail.com",
    education: "Yale Uni",
  },
  {
    name: "Ijlal",
    address: "Sambhal",
    exp: "orem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua.",
    email: "ijlal@gmail.com",
    education: "Oxford Uni",
  },
  {
    name: "Faiz",
    address: "Portugal",
    exp: "orem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua.",
    email: "faiz@gmail.com",
    education: "Cambridge Uni",
  },
];

const Home = () => {
    const {isDark} = useContext(DarkContextProvider)

  const container = useRef(null);
  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: isDark ? require("../../Animations/animation.json") : require("../../Animations/animation2.json"),
    });

    return () => instance.destroy();
  }, [isDark]);
  return (
    <Fragment>
      {/* <div className="flex flex-wrap justify-center mb-5 md:my-10"> */}
      {/* {isDark === null && (
          <img className="h-96 w-9/12" src={image1} alt="img"></img>
        )} */}
      {/* <img
          className="md:w-11/12 lg:w-9/12 lg:h-96"
          src={image}
          alt="img"
        ></img>
      </div> */}
      <div className="flex flex-wrap justify-center dark:text-gray-100">
        <div className="pt-10 mb-10 md:mb-0 w-full md:w-[45%] flex flex-col md:pt-24 items-center lg:pl-10">
          <h1 className="text-2xl pl-2">WELCOME TO</h1>
          <div className={`${classes.content} flex flex-wrap justify-center`}>
            <h1 className="text-7xl sm:text-9xl md:text-7xl lg:text-8xl xl:text-9xl font-bold">
              BLOGIFY
            </h1>
            <h1 className="text-7xl sm:text-9xl md:text-7xl lg:text-8xl xl:text-9xl font-bold">
              BLOGIFY
            </h1>
          </div>
          <TypedText />
        </div>
        {/* get started button here */}
        <div
          ref={container}
          className="mb-10 md:mb-0 w-full container flex flex-wrap justify-center md:my-6 md:h-[20rem] lg:h-[25rem] md:w-[55%] xl:h-[30rem]"
        ></div>
      </div>
      {/* <TopPicks articles={articles.slice(0, 3)} /> */}
      <Carousel />
      <div className="flex flex-wrap justify-center">
        {/*handle active state for button bg color */}
        <div className="w-11/12 sm:w-9/12 md:w-6/12 lg:w-5/12 md:mr-6">
          <div className="mb-5">
            <Button className="p-1 md:p-3 py-2 bg-blue-300 dark:bg-white rounded-sm font-bold mr-1 md:mr-2 hover:bg-gray-200 mb-1">
              Latest
            </Button>
            <Button className="p-1 md:p-3 py-2 bg-blue-300 dark:bg-white rounded-sm font-bold mr-1 md:mr-2  hover:bg-gray-200 mb-1">
              Top Rated
            </Button>
            <select
              className="p-1 py-2 cursor-pointer rounded-sm md:p-3 border-0 outline-none bg-blue-300 dark:bg-white font-bold hover:bg-gray-200"
              // value={enteredCategory}
              // onChange={categoryChangeHandler}
            >
              <option disabled selected hidden>
                Category
              </option>
              <option value="Web Development">Web Development</option>
              <option value="Android Development">Android Development</option>
              <option value="Technology">Technology</option>
              <option value="Web Development">Web Development</option>
              <option value="Android Development">Android Development</option>
              <option value="Technology">Technology</option>
            </select>
          </div>
          <AllArticles />
        </div>
        <div className="hidden md:block sticky top-10 h-0 md:w-4/12 lg:w-3/12 dark:text-white">
          <div className="mb-6">
            <h2 className="font-semibold mb-4 mt-6">Top Authors</h2>
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
