import { Fragment } from "react";
import image from "../../Images/userimg.png";
import classes from "./AuthorInfo.module.css";

const AuthInfo = (props) => {
  return (
    <Fragment>
      <div
        className={`${classes["profile-card"]} before:bg-[#9db4f4] dark:before:bg-[#4e409d] dark:bg-gray-900 dark:text-gray-200`}
      >
        <div className={classes.image}>
          <img
            src={image}
            alt="xyz"
            className={`${classes["profile-img"]} bg-[#9db4f4] dark:bg-[#4e409d]`}
          />
        </div>

        <div
          className={`${classes["text-data"]} text-black dark:text-gray-200`}
        >
          {/* name and email should be links to profile and email client respectively */}
          <span className={classes.name}>{props.name}</span>
          <span className={classes.job}>{props.email}</span>
        </div>

        <div className={classes["media-buttons"]}>
          {props.facebook && (
            <a
              rel="noreferrer"
              target="_blank"
              href={props.facebook}
              style={{ backgroundColor: "#4267b2" }}
              className={classes.link}
            >
              <i class="fa-brands fa-facebook-f"></i>
            </a>
          )}
          {props.twitter && (
            <a
              rel="noreferrer"
              target="_blank"
              href={props.twitter}
              style={{ backgroundColor: "#1da1f2" }}
              className={classes.link}
            >
              <i class="fa-brands fa-twitter"></i>
            </a>
          )}
          {props.linkedIn && (
            <a
              rel="noreferrer"
              target="_blank"
              href={props.linkedIn}
              style={{ backgroundColor: "#4070f4" }}
              className={classes.link}
            >
              <i class="fa-brands fa-linkedin-in"></i>
            </a>
          )}
        </div>
        <div className="text-black w-full mt-2 dark:text-gray-200">
          <h2 className="text-[0.8rem]">{props.exp}</h2>
          {props.address && <h1 className="text-lg font-semibold">Location</h1>}
          <h2 className="text-[0.8rem]">{props.address}</h2>
          {props.edu && <h1 className="text-lg font-semibold">Education</h1>}
          <h2 className="text-[0.8rem]">{props.edu}</h2>
          {props.work && <h1 className="text-lg font-semibold">Work</h1>}
          <h2 className="text-[0.8rem]">{props.work}</h2>
        </div>
      </div>
    </Fragment>
  );
};

export default AuthInfo;
