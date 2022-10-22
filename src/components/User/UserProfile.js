import image from "../../Images/userimg.png";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router-dom";
import classes from "./UserProfile.module.css";

const UserProfile = () => {
  return (
    <>
      <div className="flex flex-wrap justify-center p-10 ">
        <div
          className={`${classes["profile-card"]} before:bg-[#9db4f4] dark:before:bg-[#4e409d] hidden md:flex min-h-[82vh] flex-wrap flex-col items-center bg-gray-300 dark:bg-gray-900 rounded-md sticky top-10 md:w-4/12 lg:w-3/12 dark:text-white p-6 py-8 shadow-2xl`}
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
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
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
        <div className="w-11/12 sm:w-9/12 md:w-6/12 lg:w-5/12 md:ml-6 bg-gray-300 dark:bg-gray-900 rounded-md p-6 py-8 dark:text-white">
          <div>
            <h1 className="font-bold text-lg">BIO</h1>
            <p className="text-sm pt-1 italic">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <h1 className="font-bold text-lg mt-4">Experience</h1>
            <p className="text-sm pt-1 italic">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex flex-wrap justify-between mt-2 pt-2">
              <div className="w-[17rem] mt-2">
                <h1 className="font-bold">Email</h1>
                <span>bsajid173@gmail.com</span>
              </div>
              <div className="w-[17rem] mt-2">
                <h1 className="font-bold">Address</h1>
                <span>London, UK</span>
              </div>
              <div className="w-[17rem] mt-2">
                <h1 className="font-bold">Age</h1>
                <span>22</span>
              </div>
              <div className="w-[17rem] mt-2">
                <h1 className="font-bold">Education</h1>
                <span>Jamia Millia Islamia</span>
              </div>
              <div className="w-[17rem] mt-2">
                <h1 className="font-bold">Number</h1>
                <span>7310587987</span>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap justify-center">
            <h1 className="font-bold text-2xl">Your Posts</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
