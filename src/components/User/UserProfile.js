import classes from "./UserProfile.module.css";
import { useSelector } from "react-redux";
import LeftCard from "./LeftCard";
import DataField from "./DataField";
import Article from "../Article/Article";
import { useState } from "react";
import Sidebar from "./Sidebar";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EditProfile from "./EditProfile/EditProfile";
import AddNewArticle from "../AddArticle/AddArticle";
import EditImage from "./ProfileImage";
import ChangePassword from "./ChangePassword";
import GetFollowers from "./GetFollowers";
import GetFollowing from "./GetFollowing";
import GetSavedPosts from "./GetSavedPosts";

const UserProfile = (props) => {
  const isDark = useSelector((state) => state.mode.isDark);
  const user = useSelector((state) => state.auth.user);
  const articles = useSelector((state) => state.auth.user.products);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const likedPosts = useSelector((state) => state.auth.likedPosts);
  const savedPosts = useSelector((state) => state.auth.savedPosts);
  const Following = useSelector((state) => state.auth.following);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  let likedposts = likedPosts ? likedPosts : [];
  let savedposts = savedPosts ? savedPosts : [];
  let following = Following ? Following : [];

  const posts = articles.map((post) => {
    return {
      isLiked: likedposts.includes(post.id) ? true : false,
      isSaved: savedposts.includes(post.id) ? true : false,
      id: post.id,
      name: post.user.name,
      content: post.content.slice(0, 250) + "...",
      createdAt: post.created_at,
      authorId: post.user.id,
      title: post.title,
      imageId: post.imageId,
      commentsCount: post.commentCount,
      likesCount: post.likesCount,
      tags: post.tags.split(", "),
    };
  });

  const showMenuHandler = () => {
    setShowMenu((prev) => {
      return !prev;
    });
  };

  const showEdit = () => {
    setShowEditProfile(true);
    setShowMenu(false);
  };

  const articleModalHandler = () => {
    setShowArticleModal((prev) => {
      return !prev;
    });
    setShowMenu(false);
  };

  const imageModalHandler = () => {
    setShowImageModal((prev) => {
      return !prev;
    });
    setShowMenu(false);
  };
  const closeEdit = () => {
    setShowEditProfile(false);
  };

  const passwordModalHandler = () => {
    setShowPasswordModal((prev) => {
      return !prev;
    });
    setShowMenu(false);
  };

  const followersHandler = () => {
    setShowFollowers((prev) => {
      return !prev;
    });
    setShowMenu(false);
  };

  const followingHandler = () => {
    setShowFollowing((prev) => {
      return !prev;
    });
    setShowMenu(false);
  };

  const savedPostsHandler = () => {
    setShowSaved((prev) => {
      return !prev;
    });
    setShowMenu(false);
  };

  return (
    <>
      <div className="flex flex-wrap justify-center px-4 py-10 sm:p-10">
        {showImageModal && <EditImage onClick={imageModalHandler} />}
        {showArticleModal && <AddNewArticle onClick={articleModalHandler} />}
        {showPasswordModal && <ChangePassword onClick={passwordModalHandler} />}
        {showFollowers && <GetFollowers onClick={followersHandler} />}
        {showFollowing && <GetFollowing onClick={followingHandler} />}
        {showSaved && <GetSavedPosts onClick={savedPostsHandler} />}
        {showEditProfile && (
          <EditProfile
            onClick={closeEdit}
            name={user.name}
            email={user.email}
            address={user.address}
            age={user.age}
            number={user.number}
            education={user.education}
            work={user.work}
            experience={user.experience}
            bio={user.bio}
            about={user.about}
            linkedIn={user.linkedIn}
            facebook={user.facebook}
            twitter={user.twitter}
            github={user.github}
          />
        )}
        <span
          className="fixed left-0 top-96 z-10 rounded-md cursor-pointer"
          onClick={showMenuHandler}
        >
          <ArrowForwardIosIcon fontSize="large" />
        </span>
        {showMenu && (
          <div
            onClick={showMenuHandler}
            className="fixed top-0 left-0 w-full h-screen z-10 bg-gray-900 opacity-50"
          ></div>
        )}
        <Sidebar
          imageModal={imageModalHandler}
          showMenu={showMenu}
          passwordModal={passwordModalHandler}
          showMenuHandler={showMenuHandler}
          followersHandler={followersHandler}
          followingHandler={followingHandler}
          savedPostsHandler={savedPostsHandler}
          showEdit={showEdit}
          articleModal={articleModalHandler}
        />
        <LeftCard
          name={user.name}
          work={user.work}
          about={user.about}
          followers={user.followers.length}
          following={following.length}
          github={user.github}
          facebook={user.facebook}
          linkedIn={user.linkedIn}
          twitter={user.twitter}
          imageId={
            user.profilePic ? user.profilePic : "chat-app/noynwdkfnsyt33lrsyld"
          }
        />
        <div className="w-full md:w-10/12 lg:w-7/12 lg:ml-6 bg-gray-200 dark:bg-gray-900 rounded-md p-4 sm:p-6 py-8 dark:text-white shadow-lg">
          <div className="dark:text-gray-400">
            <div
              className={`${
                isDark
                  ? classes["top-div-gradient"]
                  : classes["top-div-gradient-light"]
              } p-4 mb-2 rounded-md dark:bg-[#201d36] shadow-lg bg-blue-300`}
            >
              <h1 className="font-bold text-lg">BIO</h1>
              <p className="pt-1 font-semibold font-['Nunito Sans']">
                {user.bio ? user.bio : "Tell others about yourself!"}
              </p>

              <h1 className="font-bold text-lg mt-4">Experience</h1>
              <p className="pt-1 font-semibold font-['Nunito Sans']">
                {user.experience ? user.experience : "What is your experience?"}
              </p>
            </div>
            <div className="flex flex-wrap mt-2 pt-2 justify-between">
              <div
                className={`${
                  isDark
                    ? classes["top-div-gradient2"]
                    : classes["top-div-gradient-light2"]
                } only:grow p-4 w-full md:w-[48%] dark:bg-[#201d36] rounded-md shadow-lg bg-gray-300`}
              >
                <DataField title="Email" value={user.email} />
                <DataField
                  title="Address"
                  value={user.address ? user.address : "Where do you live?"}
                />
                <DataField
                  title="Age"
                  value={user.age ? user.age : "How old are you?"}
                />
              </div>
              <div
                className={`${
                  isDark
                    ? classes["top-div-gradient3"]
                    : classes["top-div-gradient-light3"]
                } p-4 w-full mt-4 md:mt-0 md:w-[48%] rounded-md dark:bg-[#201d36] shadow-lg bg-gray-300`}
              >
                <DataField
                  title="Education"
                  value={
                    user.education
                      ? user.education
                      : "Your educational background!"
                  }
                />
                <DataField
                  title="Number"
                  value={user.number ? user.number : "Add a phone!"}
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap justify-center">
            <h1 className="font-bold text-2xl mb-4">Your Posts</h1>
            <div>
              {user &&
                posts.map((article) => {
                  return (
                    <Article
                      name={article.name}
                      createdAt={article.createdAt}
                      title={article.title}
                      tags={article.tags}
                      likesCount={article.likesCount}
                      comments={article.commentsCount}
                      content={article.content}
                      userimgId={
                        user.profilePic
                          ? user.profilePic
                          : "chat-app/noynwdkfnsyt33lrsyld"
                      }
                      imageId={article.imageId}
                      authorId={article.authorId}
                      id={article.id}
                      isLiked={article.isLiked}
                      isSaved={article.isSaved}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
