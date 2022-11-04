import { useSelector } from "react-redux";
import { Image } from "cloudinary-react";
import Moment from "react-moment";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const ArticlePreview = (props) => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="flex flex-col p-3 bg-gray-300 dark:bg-[#201d36] dark:text-white my-3 first:mt-0 rounded-md">
      <div className="flex flex-wrap justify-center mb-2">
        <div className="rounded-full h-16 w-16 flex flex-wrap bg-gray-500 dark:bg-white">
          <Image
            className="rounded-full"
            cloudName="dntn0wocu"
            publicId={
              user.profilePic
                ? user.profilePic
                : "chat-app/noynwdkfnsyt33lrsyld"
            }
            width="80"
            height="80"
            crop="scale"
          />
        </div>
        <div className="ml-2 mr-auto flex flex-wrap flex-col items-start justify-start">
          <h2 className="font-bold">{user.name}</h2>
          <span>
            <Moment fromNow>{new Date()}</Moment>
          </span>
        </div>
      </div>
      <div className="">
        <h1 className="text-2xl font-bold mb-4">{props.title}</h1>
        <div className="flex flex-wrap justify-center mt-3 mb-3">
          {props.previewSource ? (
            <img
              className="w-300 h-48"
              src={props.previewSource}
              alt="preview_img"
            ></img>
          ) : (
            "No Image Selected"
          )}
        </div>
        <div>
          {props.paragraphs.map((para) => {
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
        </div>
        <div className="flex flex-wrap mt-4">
          {props.tags.map((tag) => {
            return (
              <div className="transition-all rounded-md mt-2 border border-blue-300 w-fit px-2 py-1 hover:bg-blue-200 mr-2 dark:hover:text-black">
                <span>#{tag}</span>
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap mt-3">
          <div className="flex flex-wrap mt-3">
            <div className="flex flex-wrap justify-center items-center transition-all rounded-sm w-fit mx-2 ml-0  dark:hover:text-black">
              <span className="p-1 px-2 border border-blue-500 rounded-md  hover:bg-blue-300">
                <CommentIcon /> 0 comments
              </span>
            </div>
            <div className="flex flex-wrap justify-center items-center transition-all rounded-sm w-fit mx-2  dark:hover:text-black">
              <span className="p-1 px-2 border border-blue-500 rounded-md  hover:bg-blue-300 relative">
                <FavoriteBorderIcon /> 0 likes
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePreview;
