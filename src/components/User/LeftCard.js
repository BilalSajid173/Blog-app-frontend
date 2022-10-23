import image from "../../Images/userimg.png";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router-dom";
import classes from "./UserProfile.module.css";

const LeftCard = () => {
  return (
    <div
      className={`${classes["profile-card"]} before:bg-[#9db4f4] dark:before:bg-[#4e409d] hidden lg:flex min-h-[82vh] flex-wrap flex-col items-center bg-gray-200 dark:bg-gray-900 rounded-md sticky top-10 lg:w-4/12 dark:text-white p-6 py-8 shadow-lg`}
    >
      <img
        className="relative rounded-full w-150 h-150 bg-blue-900 border-white border-4"
        src={image}
        alt="userimg"
      ></img>
      <h1 className="font-bold text-3xl pt-4">Bilal Sajid</h1>
      <h1 className="font-bold pt-1 italic">UI Designer</h1>
      <div className="flex flex-wrap mt-2 justify-between">
        <span className="text-blue-500"> 29 Followers</span>
        <span className="mx-4">.</span>
        <span className="text-blue-500"> 60 Following</span>
      </div>
      <div className="pt-4">
        <p className="text-center font-serif italic">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam
        </p>
      </div>
      <div className="pt-8 text-2xl flex flex-wrap space-x-4 text-blue-600">
        <Link to="" className="hover:text-blue-800">
          <FacebookRoundedIcon fontSize="large" />
        </Link>
        <Link to="" className="hover:text-blue-800">
          <TwitterIcon fontSize="large" />
        </Link>
        <Link to="" className="hover:text-blue-800">
          <LinkedInIcon fontSize="large" />
        </Link>
        <Link to="" className="hover:text-blue-800">
          <GitHubIcon fontSize="large" />
        </Link>
      </div>
    </div>
  );
};

export default LeftCard;
