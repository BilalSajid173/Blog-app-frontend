import image from "../../Images/userimg.png";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import EditDeleteComment from "./EditDeleteComment";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import useHttp from "../../hooks/use-http";
import { useState } from "react";

const SingleComment = (props) => {
  const [isLiked, setIsLiked] = useState(props.isLiked);
  const [isDisliked, setIsDisliked] = useState(props.isDisliked);
  console.log(isLiked, isDisliked);
  const { sendRequest: commentReaction } = useHttp();

  const reactionResponseHandler = () => {};

  const likeDislikeHandler = () => {
    commentReaction(
      {
        url: "http://localhost:8000/api/user/login/",
        method: "POST",
        body: {},
        headers: {
          "Content-Type": "application/json",
        },
      },
      reactionResponseHandler
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
            {isLiked && <ThumbUpIcon className="mr-2" />}{" "}
            {!isLiked && <ThumbUpOffAltIcon className="mr-2" />} {props.likes}
          </span>
          <span>
            {isDisliked && <ThumbDownIcon className="mr-2" />}
            {!isDisliked && <ThumbDownOffAltIcon className="mr-2" />}{" "}
            {props.dislikes}
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
