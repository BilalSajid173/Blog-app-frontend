import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Moment from "react-moment";
import BasicMenu from "./MenuOptions";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import useHttp from "../../hooks/use-http";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authActions } from "../../store/auth";
import { commentsActions } from "../../store/comments";
import Loader1 from "../UI/Loader/Loader1";
import ViewComments from "../Comments/Comments";
import { Image } from "cloudinary-react";
import { BASE_URL } from "../../lib/apiurl";

const Article = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(props.isLiked);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [likesCount, setLikesCount] = useState(props.likesCount);
  const { isLoading, sendRequest: likePost } = useHttp();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    setLikesCount(props.likesCount);
    setIsLiked(props.isLiked);
  }, [props.isLiked, props.likesCount]);

  const likeResponseHandler = (data) => {
    const like = isLiked;
    dispatch(
      authActions.updateLikedPostsCount({
        increase: like ? false : true,
        id: props.id,
      })
    );
    setLikesCount((prev) => {
      return like ? likesCount - 1 : likesCount + 1;
    });
    setIsLiked((prevState) => {
      !prevState && toast.success("Post liked");
      return !prevState;
    });
  };

  const likeHandler = () => {
    if (!isLoggedIn) {
      toast.error("You must be logged in to like an article!");
      return;
    }
    likePost(
      {
        url: `${BASE_URL}api/user/${
          isLiked ? `unlikepost/${props.id}/` : `likepost/${props.id}/`
        }`,
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
      },
      likeResponseHandler
    );
  };

  const CommentsModalHandler = () => {
    dispatch(commentsActions.removeComments());
    setShowCommentsModal((prev) => {
      return !prev;
    });
  };
  const clickHandler = (tag) => {
    navigate(`/all?page=1&sort=latest&tag=${tag}`);
  };
  return (
    <Fragment>
      {showCommentsModal && (
        <ViewComments onClick={CommentsModalHandler} id={props.id} />
      )}
      <div className="transition-all flex flex-col p-3 bg-gray-200 dark:bg-[#201d36] dark:text-white my-3 first:mt-0 rounded shadow-lg">
        <div className="flex flex-wrap justify-center mb-2">
          {/*use cloudinary image component for image*/}
          <div className="rounded-full h-16 w-16">
            {/* <img src={image} className="" alt="img"></img> */}
            <Image
              className="rounded-full"
              cloudName="dntn0wocu"
              publicId={props.userimgId}
              width="80"
              height="80"
              crop="scale"
            />
          </div>
          <div className="ml-2 mr-auto flex flex-wrap flex-col items-start justify-start">
            <Link
              to={`${
                user && user.id === props.authorId
                  ? "/profile"
                  : `/userprofile/${props.authorId}`
              }`}
              className="font-bold"
            >
              {user && props.authorId === user.id ? "You" : props.name}
            </Link>
            <Moment fromNow>{props.createdAt}</Moment>
          </div>
          <div>
            {/* <i class="fa-regular fa-star"></i> */}
            {/* <i class="fa-solid fa-star"></i> */}
            <BasicMenu
              authorId={props.authorId}
              postid={props.id}
              isSaved={props.isSaved}
              content={props.content}
              title={props.title}
              tags={props.tags}
            />
          </div>
        </div>
        <div className="">
          <h1 className="text-2xl font-bold">{props.title}</h1>
          <p>
            {props.content.slice(0, 250) + "..."}
            {/*Single post + post id */}
            <Link to={`/post/${props.id}`} className="text-blue-500">
              Read More
            </Link>
          </p>

          <div className="flex flex-wrap mt-4">
            {props.tags.map((tag) => {
              return (
                <div
                  key={Math.random()}
                  onClick={clickHandler.bind(null, tag)}
                  className="transition-all cursor-pointer rounded-md border border-blue-300 w-fit px-2 py-1 hover:bg-blue-200 mr-2 mt-2 dark:hover:text-black"
                >
                  <span>#{tag}</span>
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap mt-3">
            <div className="flex flex-wrap justify-center items-center transition-all cursor-pointer rounded-sm w-fit mx-2 ml-0  dark:hover:text-black">
              <span
                onClick={CommentsModalHandler}
                className="p-1 px-2 border border-blue-500 rounded-md  hover:bg-blue-300"
              >
                <CommentIcon /> {props.comments} comments
              </span>
            </div>
            <div className="flex flex-wrap justify-center items-center transition-all cursor-pointer rounded-sm w-fit mx-2  dark:hover:text-black">
              <span
                className="p-1 px-2 border border-blue-500 rounded-md  hover:bg-blue-300 relative"
                onClick={likeHandler}
              >
                {isLoading && (
                  <div className="flex justify-center absolute w-full top-0 left-0 z-40">
                    <Loader1 />
                  </div>
                )}
                {isLiked && <FavoriteIcon className="mr-2" />}
                {!isLiked && <FavoriteBorderIcon className="mr-2" />}
                {likesCount} likes
              </span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Article;
