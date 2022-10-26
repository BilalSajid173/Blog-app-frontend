import CommentIcon from "@mui/icons-material/Comment";
import CategoryIcon from "@mui/icons-material/Category";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PostContent = (props) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const clickHandler = (tag) => {
    navigate(`/all?page=1&sort=latest&tag=${tag}`);
  };
  return (
    <>
      <div className="flex flex-wrap justify-center mb-2">
        <div className="rounded-full h-16 w-16 mr-2">
          {/* <img src={image} className="" alt="img"></img> */}
          <Image
            className="rounded-full"
            cloudName="dntn0wocu"
            publicId={props.article.userimgId}
            width="80"
            height="80"
            crop="scale"
          />
        </div>
        <div className="ml-2 mr-auto flex flex-wrap flex-col items-start justify-start">
          <Link
            to={`${
              user && user.id === props.article.authorId
                ? "/profile"
                : `/userprofile/${props.article.authorId}`
            }`}
            className="font-bold"
          >
            {user && props.article.authorId === user.id
              ? "You"
              : props.article.name}
          </Link>
          <Moment fromNow>{props.article.createdAt}</Moment>
        </div>
      </div>
      <div className="mt-2">
        <h1 className="font-bold text-2xl md:text-3xl mb-4">
          {props.article.title}
        </h1>
        <div className="w-full mb-8 flex flex-wrap justify-center">
          {/* <img src={image} className="" alt="img"></img> */}
          <Image
            cloudName="dntn0wocu"
            publicId={props.article.imageId}
            crop="scale"
            height="300"
          />
        </div>
        {props.paras.map((para) => {
          let heading = "";
          if (para[0] === "{") {
            heading = para.split("}")[0].substring(1);
            para = para.split("}")[1];
          }
          return (
            <>
              {heading !== "" && (
                <h2 className="font-semibold text-lg">{heading}</h2>
              )}
              <p className="mb-2">{para}</p>
            </>
          );
        })}
        <div className="flex flex-wrap mt-4">
          <CategoryIcon />
          <span className="ml-2 font-bold italic">
            {props.article.category}
          </span>
          <span className="ml-auto italic flex flex-wrap items-center">
            <ThumbUpIcon className="mr-2" />
            {props.article.likesCount === 1
              ? props.article.likesCount + " Like"
              : props.article.likesCount + " Likes"}{" "}
          </span>
        </div>
        <div className="flex flex-wrap mt-4">
          {props.article.tags.map((tag) => {
            return (
              <div
                onClick={clickHandler.bind(null, tag)}
                className="transition-all cursor-pointer rounded-md w-fit px-2 py-1 mx-2 hover:bg-blue-300 first:ml-0 dark:hover:text-black"
              >
                <span>#{tag}</span>
              </div>
            );
          })}
        </div>
        <div className="my-6 flex flex-wrap justify-center items-center transition-all rounded-sm ">
          <span
            onClick={props.CommentsModalHandler}
            className="p-1 px-2 border-2 border-blue-500 rounded-md cursor-pointer hover:bg-blue-500  dark:hover:text-black"
          >
            <CommentIcon /> View Comments
          </span>
        </div>
      </div>
    </>
  );
};

export default PostContent;
