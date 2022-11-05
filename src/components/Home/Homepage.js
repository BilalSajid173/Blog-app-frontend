import React, { Fragment, useEffect, useRef } from "react";
import AllArticles from "../Article/AllArticles";
import TopAuths from "./TopAuthors";
import lottie from "lottie-web";
import classes from "../TextEffects/TextEffects.module.css";
import TypedText from "../TextEffects/TypedText";
import Carousel from "./Carousel";
import { useSelector, useDispatch } from "react-redux";
import useHttp from "../../hooks/use-http";
import { authActions } from "../../store/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../UI/Loader/Loader";
import CategoryPicker from "./CategorySelection";
import Tags from "./Tags";
import PaginationRounded from "../Paginator/Paginator";

const Home = () => {
  const isDark = useSelector((state) => state.mode.isDark);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { isLoading, sendRequest: userAutoLogin } = useHttp();
  const dispatch = useDispatch();

  useEffect(() => {
    const autoLoginHandler = (data) => {
      dispatch(
        authActions.login({
          user: data.User,
          token: localStorage.getItem("token"),
          likedPosts: data.User.likedPosts.map((post) => {
            return post.id;
          }),
          savedPosts: data.User.savedPosts.map((post) => {
            return post.id;
          }),
          comments: data.User.comments.map((comment) => {
            return comment.id;
          }),
          likedComments: data.User.likedComments.map((comment) => {
            return comment.id;
          }),
          dislikedComments: data.User.dislikedComments.map((comment) => {
            return comment.id;
          }),
          following: data.User.following.map((user) => {
            return user.following_user_id;
          }),
        })
      );
      toast.success("Welcome Back!");
    };
    const token = localStorage.getItem("token");
    if (token && !isLoggedIn) {
      userAutoLogin(
        {
          url: "http://localhost:8000/api/user/profile/",
          headers: {
            Authorization: "Bearer " + token,
          },
        },
        autoLoginHandler
      );
    }
  }, [userAutoLogin, dispatch, isLoggedIn]);

  const container = useRef(null);
  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: isDark
        ? require("../../Animations/animation2.json")
        : require("../../Animations/animation2.json"),
    });

    return () => instance.destroy();
  }, [isDark, isLoading]);
  return (
    <Fragment>
      {isLoading && (
        <div className="w-11/12 h-5/6 flex justify-center items-center absolute">
          <Loader />
        </div>
      )}
      {!isLoading && (
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
      )}
      {/* <TopPicks articles={articles.slice(0, 3)} /> */}
      {!isLoading && <Carousel />}
      {!isLoading && (
        <div className="flex flex-wrap justify-center">
          {/*handle active state for button bg color */}
          <div className="w-11/12 sm:w-9/12 md:w-6/12 lg:w-5/12 md:mr-6 relative">
            <CategoryPicker />
            <AllArticles />
          </div>
          <div className="hidden md:block sticky top-10 h-0 md:w-4/12 lg:w-3/12 dark:text-white">
            <div className="mb-6">
              <h2 className="font-semibold mb-4 mt-6">Top Authors</h2>
              <TopAuths />
            </div>
            <div>
              <h2 className="font-semibold">Popular Tags</h2>
              <Tags />
            </div>
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="flex justify-center p-10">
          <PaginationRounded />
        </div>
      )}
    </Fragment>
  );
};

export default Home;
