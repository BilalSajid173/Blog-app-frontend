// import { Link } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import EditIcon from "@mui/icons-material/Edit";
import AddBoxIcon from "@mui/icons-material/AddBox";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import GroupIcon from "@mui/icons-material/Group";
import PortraitIcon from "@mui/icons-material/Portrait";
import KeyIcon from "@mui/icons-material/Key";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import GetFollowers from "./GetFollowers";
import GetFollowing from "./GetFollowing";
import { useState } from "react";

const Sidebar = (props) => {
  const dispatch = useDispatch();
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const followersHandler = () => {
    setShowFollowers((prev) => {
      return !prev;
    });
  };

  const followingHandler = () => {
    setShowFollowing((prev) => {
      return !prev;
    });
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };
  return (
    <div
      className={`duration-300 ease-in-out transition-all transform ${
        props.showMenu ? "-translate-x-0" : "-translate-x-full"
      } py-3 flex flex-col w-[20rem] top-0 left-0 fixed h-screen bg-white z-20 ml-auto dark:bg-gray-800 dark:text-white`}
    >
      {showFollowers && <GetFollowers onClick={followersHandler} />}
      {showFollowing && <GetFollowing onClick={followingHandler} />}
      <div className="px-2 text-right text-lg">
        <i
          onClick={props.showMenuHandler}
          className="cursor-pointer fa-solid fa-xmark"
        ></i>
      </div>
      <button
        onClick={props.showEdit}
        className="transition-all duration-300 my-1 text-left px-2 py-1 hover:bg-blue-600 hover:text-white"
      >
        <span className="mr-2 p-2">
          <EditIcon />
        </span>{" "}
        Edit Profile
      </button>
      <button
        onClick={props.imageModal}
        className="transition-all duration-300 my-1 text-left px-2 py-1 hover:bg-blue-600 hover:text-white"
      >
        <span className="mr-2 p-2">
          <PortraitIcon />
        </span>{" "}
        Profile Image
      </button>
      <button
        onClick={props.articleModal}
        className="transition-all duration-300 my-1 text-left px-2 py-1 hover:bg-blue-600 hover:text-white"
      >
        <span className="mr-2 p-2">
          <AddBoxIcon />
        </span>{" "}
        Add Article
      </button>
      <button
        onClick={followersHandler}
        className="transition-all duration-300 my-1 text-left px-2 py-1 hover:bg-blue-600 hover:text-white"
      >
        <span className="mr-2 p-2">
          <GroupIcon />
        </span>{" "}
        Followers
      </button>
      <button
        onClick={followingHandler}
        className="transition-all duration-300 my-1 text-left px-2 py-1 hover:bg-blue-600 hover:text-white"
      >
        <span className="mr-2 p-2">
          <GroupIcon />
        </span>{" "}
        Following
      </button>
      <button
        //   onClick={logoutHandler}
        className="transition-all duration-300 my-1 text-left px-2 py-1 hover:bg-blue-600 hover:text-white"
      >
        <span className="mr-2 p-2">
          <BookmarkIcon />
        </span>{" "}
        Saved Articles
      </button>
      <button
        onClick={props.passwordModal}
        className="transition-all duration-300 my-1 text-left px-2 py-1 hover:bg-blue-600 hover:text-white"
      >
        <span className="mr-2 p-2">
          <KeyIcon />
        </span>{" "}
        Change Password
      </button>
      <button
        onClick={logoutHandler}
        className="transition-all duration-300 my-1 text-left px-2 py-1 hover:bg-blue-600 hover:text-white"
      >
        <span className="mr-2 p-2">
          <ExitToAppIcon />
        </span>{" "}
        Sign Out
      </button>
    </div>
  );
};

export default Sidebar;
