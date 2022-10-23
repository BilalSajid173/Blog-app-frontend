import classes from "./UserProfile.module.css";
import { useSelector } from "react-redux";
import LeftCard from "./LeftCard";
import DataField from "./DataField";
import Article from "../Article/Article";

const UserProfile = (props) => {
  const isDark = useSelector((state) => state.mode.isDark);
  const user = useSelector((state) => state.auth.user);
  const articles = useSelector((state) => state.auth.user.products);
  const likedPosts = useSelector((state) => state.auth.likedPosts);
  const savedPosts = useSelector((state) => state.auth.savedPosts);

  let likedposts = likedPosts ? likedPosts : [];
  let savedposts = savedPosts ? savedPosts : [];
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
      userimgId: post.user.profilePic,
      commentsCount: post.commentCount,
      likesCount: post.likesCount,
      tags: post.tags.split(", "),
    };
  });
  return (
    <>
      <div className="flex flex-wrap justify-center px-4 py-10 sm:p-10 ">
        <LeftCard />
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
                Tell others about yourself!
              </p>

              <h1 className="font-bold text-lg mt-4">Experience</h1>
              <p className="pt-1 font-semibold font-['Nunito Sans']">
                What is your experience??
              </p>
            </div>
            <div className="flex flex-wrap mt-2 pt-2 justify-between">
              <div className=" only:grow p-4 w-full md:w-[48%] dark:bg-[#201d36] rounded-md shadow-lg bg-gray-300">
                <DataField title="Email" value="bsajid173@gmail.com" />
                <DataField title="Address" value="Where Do you live?" />
                <DataField title="Age" value="How old are you?" />
              </div>
              <div className="p-4 w-full mt-4 md:mt-0 md:w-[48%] rounded-md dark:bg-[#201d36] shadow-lg bg-gray-300">
                <DataField title="Education" value="Jamia Millia Islamia" />
                <DataField title="Number" value="Add a number." />
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
                      userimgId={article.userimgId}
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
