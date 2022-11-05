import classes from "./OtherUserProfile.module.css";
import { useSelector } from "react-redux";
import LeftCard from "./LeftCard";
import DataField from "./DataField";
import Article from "../Article/Article";
import { useState, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../lib/apiurl";

const OtherUserProfile = (props) => {
  const isDark = useSelector((state) => state.mode.isDark);
  const { sendRequest: getUserProfile } = useHttp();
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const likedPosts = useSelector((state) => state.auth.likedPosts);
  const savedPosts = useSelector((state) => state.auth.savedPosts);
  const Following = useSelector((state) => state.auth.following);
  let likedposts = likedPosts ? likedPosts : [];
  let savedposts = savedPosts ? savedPosts : [];
  let following = Following ? Following : [];
  const { userId } = useParams();

  useEffect(() => {
    const responseHandler = (data) => {
      console.log(data);
      setUser(data.User);
      setArticles(data.User.products);
    };
    if (!user) {
      getUserProfile(
        {
          url: BASE_URL + "api/user/getprofile/" + userId + "/",
          headers: {
            "Content-Type": "application/json",
          },
        },
        responseHandler
      );
    }
  }, [getUserProfile, user, userId]);

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

  return (
    <>
      <div className="flex flex-wrap justify-center px-4 py-10 sm:p-10">
        {user && (
          <LeftCard
            isFollowed={following.includes(user.id) ? true : false}
            id={user.id}
            name={user.name}
            work={user.work}
            about={user.about}
            followers={user.followers.length}
            following={user.following.length}
            github={user.github}
            facebook={user.facebook}
            linkedIn={user.linkedIn}
            twitter={user.twitter}
            imageId={
              user.profilePic
                ? user.profilePic
                : "chat-app/noynwdkfnsyt33lrsyld"
            }
          />
        )}
        {user && (
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
                  {user.bio ? user.bio : "Pretty Boring!"}
                </p>

                <h1 className="font-bold text-lg mt-4">Experience</h1>
                <p className="pt-1 font-semibold font-['Nunito Sans']">
                  {user.experience ? user.experience : "None?!"}
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
                    value={user.address ? user.address : "No address provided."}
                  />
                  <DataField
                    title="Age"
                    value={user.age ? user.age : "A 1000 years I suppose ;)"}
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
                      user.education ? user.education : "Could be illiterate :/"
                    }
                  />
                  <DataField
                    title="Number"
                    value={user.number ? user.number : "No phone added!"}
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
        )}
      </div>
    </>
  );
};

export default OtherUserProfile;
