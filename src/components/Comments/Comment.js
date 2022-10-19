import image from "../../Images/userimg.png";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import EditDeleteComment from "./EditDeleteComment";

const SingleComment = (props) => {
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
            <ThumbUpOffAltIcon className="mr-2" /> {props.likes}
          </span>
          <span>
            <ThumbDownOffAltIcon className="mr-2" /> {props.dislikes}
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
