import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import classes from "./OtherUserProfile.module.css";
import { Image } from "cloudinary-react";
import useHttp from "../../hooks/use-http";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../lib/apiurl";

const LeftCard = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.auth.token);
  const [isFollowing, setIsFollowing] = useState(props.isFollowed);
  const { sendRequest: followRequest } = useHttp();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const unfollowResponseHandler = (data) => {
    dispatch(authActions.updateFollowing({ id: props.id, add: false }));
    setIsFollowing(false);
  };

  const unfollowHandler = () => {
    followRequest(
      {
        url:
          BASE_URL + "api/user/removefollowers/" +
          user.id +
          "/" +
          props.id +
          "/",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      },
      unfollowResponseHandler
    );
  };

  const followResponseHandler = (data) => {
    dispatch(authActions.updateFollowing({ id: props.id, add: true }));
    setIsFollowing(true);
  };

  const followHandler = () => {
    if (!isLoggedIn) {
      toast.error("You are not logged In!");
      return;
    }
    followRequest(
      {
        url: BASE_URL + "api/user/addfollowers/",
        method: "POST",
        body: {
          following_user_id: props.id,
          user_id: user.id,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      },
      followResponseHandler
    );
  };

  return (
    <div
      className={`${classes["profile-card"]} before:bg-[#9db4f4] dark:before:bg-[#4e409d] lg:h-[84vh] flex flex-wrap flex-col items-center bg-gray-200 dark:bg-gray-900 rounded-md relative lg:sticky lg:top-20 mb-6 lg:mb-0 w-full md:w-10/12 lg:w-4/12 dark:text-white p-6 py-8 shadow-lg`}
    >
      <div className="relative rounded-full w-200 h-200 bg-blue-900 border-[#4e409d] border-4">
        <Image
          className="rounded-full"
          cloudName="dntn0wocu"
          publicId={props.imageId}
          width="200"
          height="200"
          crop="scale"
        />
      </div>
      <h1 className="font-bold text-3xl pt-4">{props.name}</h1>
      <h1 className="font-bold pt-1 italic">{props.work}</h1>
      <div className="flex flex-wrap mt-2 justify-between">
        <span className="text-blue-500"> {props.followers} Followers</span>
        <span className="mx-4">.</span>
        <span className="text-blue-500"> {props.following} Following</span>
      </div>
      <div className="pt-2">
        <p className="text-center font-serif italic">{props.about}</p>
      </div>
      <div className="pt-2 text-2xl flex flex-wrap flex-col text-blue-600">
        <div className="flex flex-wrap justify-center gap-1">
          {props.facebook && (
            <a
              className="hover:text-blue-800"
              rel="noreferrer"
              target="_blank"
              href={props.facebook}
            >
              <FacebookRoundedIcon fontSize="large" />
            </a>
          )}
          {props.twitter && (
            <a
              className="hover:text-blue-800"
              rel="noreferrer"
              target="_blank"
              href={props.twitter}
            >
              <TwitterIcon fontSize="large" />
            </a>
          )}
          {props.linkedIn && (
            <a
              className="hover:text-blue-800"
              rel="noreferrer"
              target="_blank"
              href={props.linkedIn}
            >
              <LinkedInIcon fontSize="large" />
            </a>
          )}
          {props.github && (
            <a
              className="hover:text-blue-800"
              rel="noreferrer"
              target="_blank"
              href={props.github}
            >
              <GitHubIcon fontSize="large" />
            </a>
          )}
        </div>
        {isFollowing ? (
          <button
            onClick={unfollowHandler}
            className="p-1 border-2 mt-4 rounded-md px-4 border-blue-600 hover:bg-blue-600 hover:text-white"
          >
            Unfollow
          </button>
        ) : (
          <button
            onClick={followHandler}
            className="p-1 border-2 mt-4 rounded-md px-4 border-blue-600 hover:bg-blue-600 hover:text-white"
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
};

export default LeftCard;
