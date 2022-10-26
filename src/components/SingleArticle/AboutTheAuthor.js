import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import classes from "../OtherUserProfile/OtherUserProfile.module.css";
import { Image } from "cloudinary-react";

const AboutTheAuthor = (props) => {
  return (
    <div
      className={`${classes["profile-card"]} before:bg-[#9db4f4] dark:before:bg-[#4e409d] lg:h-[84vh] hidden lg:flex flex-wrap flex-col items-center bg-gray-200 dark:bg-gray-900 rounded-md relative lg:sticky lg:top-20 mb-6 lg:mb-0 w-full md:w-10/12 lg:w-4/12 dark:text-white p-6 py-8 shadow-lg`}
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
      </div>
    </div>
  );
};

export default AboutTheAuthor;
