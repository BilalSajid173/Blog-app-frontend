import image from "../../Images/userimg.png";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router-dom";
import classes from "./UserProfile.module.css";

const LeftCard = (props) => {
  return (
    <div
      className={`${classes["profile-card"]} before:bg-[#9db4f4] dark:before:bg-[#4e409d] lg:h-[84vh] flex flex-wrap flex-col items-center bg-gray-200 dark:bg-gray-900 rounded-md relative lg:sticky lg:top-20 mb-6 lg:mb-0 w-full md:w-10/12 lg:w-4/12 dark:text-white p-6 py-8 shadow-lg`}
    >
      <img
        className="relative rounded-full w-150 h-150 bg-blue-900 border-white border-4"
        src={image}
        alt="userimg"
      ></img>
      <h1 className="font-bold text-3xl pt-4">{props.name}</h1>
      <h1 className="font-bold pt-1 italic">{props.work}</h1>
      <div className="flex flex-wrap mt-2 justify-between">
        <span className="text-blue-500"> {props.followers} Followers</span>
        <span className="mx-4">.</span>
        <span className="text-blue-500"> {props.following} Following</span>
      </div>
      <div className="pt-4">
        <p className="text-center font-serif italic">{props.bio}</p>
      </div>
      <div className="pt-8 text-2xl flex flex-wrap space-x-4 text-blue-600">
        {props.facebook && (
          <Link to={props.facebook} className="hover:text-blue-800">
            <FacebookRoundedIcon fontSize="large" />
          </Link>
        )}
        {props.twitter && (
          <Link to={props.twitter} className="hover:text-blue-800">
            <TwitterIcon fontSize="large" />
          </Link>
        )}
        {props.linkedIn && (
          <Link to={props.linkedIn} className="hover:text-blue-800">
            <LinkedInIcon fontSize="large" />
          </Link>
        )}
        {props.github && (
          <Link to={props.github} className="hover:text-blue-800">
            <GitHubIcon fontSize="large" />
          </Link>
        )}
        {!props.github &&
          !props.linkedIn &&
          !props.facebook &&
          !props.twitter && (
            <button className="p-2 border-2 rounded-md px-4 border-blue-600 hover:bg-blue-600 hover:text-white">
              Add Socials
            </button>
          )}
      </div>
    </div>
  );
};

export default LeftCard;
