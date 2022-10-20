import image from "../../Images/userimg.png";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import EditDeleteComment from "./EditDeleteComment";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import useHttp from "../../hooks/use-http";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

const SingleComment = (props) => {
  const [isLiked, setIsLiked] = useState(props.isLiked);
  const [isDisliked, setIsDisliked] = useState(props.isDisliked);
  const [likes, setLikes] = useState(props.likes);
  const [dislikes, setDislikes] = useState(props.dislikes);
  const { sendRequest: commentReaction } = useHttp();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const reactionResponseHandler = (action, data) => {
    console.log(action);
    if (action === "like") {
      setIsLiked(true);
      dispatch(authActions.updateLikedComments({ like: true, id: props.id }));
      dispatch(
        authActions.updateDislikedComments({ dislike: false, id: props.id })
      );
      setLikes((prev) => {
        return prev + 1;
      });
      let isdisliked = isDisliked;
      if (isdisliked) {
        setDislikes((prev) => {
          return prev - 1;
        });
      }
      setIsDisliked(false);
    }
    if (action === "dislike") {
      setDislikes((prev) => {
        return prev + 1;
      });
      dispatch(authActions.updateLikedComments({ like: false, id: props.id }));
      dispatch(
        authActions.updateDislikedComments({ dislike: true, id: props.id })
      );
      let isliked = isLiked;
      if (isliked) {
        setLikes((prev) => {
          return prev - 1;
        });
      }
      setIsLiked(false);
      setIsDisliked(true);
    }
    if (action === "removelike") {
      dispatch(authActions.updateLikedComments({ like: false, id: props.id }));
      setIsLiked(false);
      setLikes((prev) => {
        return prev - 1;
      });
    }
    if (action === "removedislike") {
      dispatch(
        authActions.updateDislikedComments({ dislike: false, id: props.id })
      );
      setIsDisliked(false);
      setDislikes((prev) => {
        return prev - 1;
      });
    }
  };

  const likeDislikeHandler = (action) => {
    let url = "";
    switch (action) {
      case "removelike":
        url =
          "http://localhost:8000/api/user/removelikecomment/" + props.id + "/";
        break;
      case "like":
        url = "http://localhost:8000/api/user/likecomment/" + props.id + "/";
        break;
      case "dislike":
        url = "http://localhost:8000/api/user/unlikecomment/" + props.id + "/";
        break;
      case "removedislike":
        url =
          "http://localhost:8000/api/user/removeunlikecomment/" +
          props.id +
          "/";
        break;
      default:
        url = "";
    }
    commentReaction(
      {
        url: url,
        method: "POST",
        body: {
          like: action === "dislike" && isLiked ? true : false,
          unlike: action === "like" && isDisliked ? true : false,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      },
      reactionResponseHandler.bind(null, action)
    );
  };
  return (
    <div className="flex mb-4">
      <img
        src={image}
        alt="user"
        className="w-10 h-10 rounded-full bg-white mr-4"
      />
      <div className="mr-auto">
        <div className="flex flex-wrap items-center">
          <span className="font mr-2">{props.name}</span>
          <span className="font-thin text-sm">{props.created_at}</span>
        </div>
        <div className="flex flex-wrap">
          <p>{props.content}</p>
        </div>
        <div className="mt-2">
          <span className="mr-4">
            {isLiked && (
              <ThumbUpIcon
                className="mr-2 cursor-pointer"
                onClick={likeDislikeHandler.bind(null, "removelike")}
              />
            )}{" "}
            {!isLiked && (
              <ThumbUpOffAltIcon
                className="mr-2 cursor-pointer"
                onClick={likeDislikeHandler.bind(null, "like")}
              />
            )}{" "}
            {likes}
          </span>
          <span>
            {isDisliked && (
              <ThumbDownIcon
                className="mr-2 cursor-pointer"
                onClick={likeDislikeHandler.bind(null, "removedislike")}
              />
            )}
            {!isDisliked && (
              <ThumbDownOffAltIcon
                className="mr-2 cursor-pointer"
                onClick={likeDislikeHandler.bind(null, "dislike")}
              />
            )}{" "}
            {dislikes}
          </span>
        </div>
      </div>
      <div>
        <EditDeleteComment />
      </div>
    </div>
  );
};

export default SingleComment;
