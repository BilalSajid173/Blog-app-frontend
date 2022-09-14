import { Avatar } from "@mui/material";
import { Fragment } from "react";
import image from "../../Images/userimg.png";
import Button from "../UI/Button/Button";

const AuthInfo = () => {
  return (
    <Fragment>
      <div className="p-2 text-black text-sm font-sans dark:text-white">
        <div className="flex flex-wrap mb-3">
          <Avatar className="mr-2 bg-slate-400" src={image} />
          <div className="mr-auto">
            <h2 className="font-bold">Bilal</h2>
            <p className="font-medium">San Francisco, California</p>
          </div>
          <Button className="p-1 px-3 bg-blue-400 hover:bg-blue-600 rounded-sm">
            Follow
          </Button>
        </div>
        <div>
          <h2 className="font-semibold">Experience</h2>
          <p className="font-normal mb-2 dark:text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <h2 className="font-semibold">Email</h2>
          {/*Make email as link */}
          <span className="dark:text-gray-300">bsajid173@gmail.com</span>
          <h2 className="font-semibold mt-2">Education</h2>
          <p className="font-normal dark:text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default AuthInfo;
