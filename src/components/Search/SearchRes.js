import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Article from "../Article/Article";
import UserCard from "../User/UserCard";
import { searchedPostsActions } from "../../store/searchposts";

const SearchRes = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const q = query.get("query");
  const dispatch = useDispatch();
  const { sendRequest } = useHttp();
  const [articlesSelected, setArticlesSelected] = useState(true);
  const [authorsSelected, setAuthorsSelected] = useState(false);
  const articles = useSelector((state) => state.searchedPosts.posts);
  const likedPosts = useSelector((state) => state.auth.likedPosts);
  const savedPosts = useSelector((state) => state.auth.savedPosts);
  let likedposts = likedPosts ? likedPosts : [];
  let savedposts = savedPosts ? savedPosts : [];
  const [authors, setAuthors] = useState(null);

  useEffect(() => {
    setArticlesSelected(true);
    setAuthorsSelected(false);
    const responseHandler = (data) => {
      const posts = data.posts.map((post) => {
        return {
          isLiked: likedposts.includes(post.id) ? true : false,
          isSaved: savedposts.includes(post.id) ? true : false,
          id: post.id,
          name: post.user.name,
          content: post.content.slice(0, 250) + "...",
          createdAt: post.created_at,
          authorId: post.user.id,
          userimgId: post.user.profilePic,
          title: post.title,
          imageId: post.imageId,
          commentsCount: post.commentCount,
          likesCount: post.likesCount,
          tags: post.tags.split(", "),
        };
      });
      dispatch(searchedPostsActions.saveposts({ posts: posts }));
      setAuthors((prev) => {
        return data.users.map((user) => {
          return {
            id: user.id,
            name: user.name,
            userimgId: user.profilePic
              ? user.profilePic
              : "chat-app/noynwdkfnsyt33lrsyld",
            email: user.email,
          };
        });
      });
    };
    sendRequest(
      {
        url: "http://localhost:8000/api/products/search/?search=" + q,
        headers: {
          "Content-Type": "application/json",
        },
      },
      responseHandler
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendRequest, q]);

  const showArticlesHandler = () => {
    setArticlesSelected(true);
    setAuthorsSelected(false);
  };

  const showAuthorsHandler = () => {
    setAuthorsSelected(true);
    setArticlesSelected(false);
  };

  return (
    <>
      <div className="py-10 flex flex-wrap flex-col items-center dark:text-white">
        <h1 className="mb-6 font-bold text-lg dark:text-gray-400">
          Search Results for "{q}"
        </h1>
        <div className="w-11/12 sm:w-9/12 lg:w-5/12 md:w-7/12 mb-6">
          <button
            onClick={showArticlesHandler}
            selected
            className={`transition-all duration-300 p-2 mr-2 border-b-4 border-gray-800 dark:text-gray-400 font-bold ${
              articlesSelected ? "border-b-blue-600" : ""
            }`}
          >
            Articles
          </button>
          <button
            onClick={showAuthorsHandler}
            className={`transition-all duration-300 p-2 border-b-4 border-gray-800 dark:text-gray-400 font-bold ${
              authorsSelected ? "border-b-blue-600" : ""
            }`}
          >
            Authors
          </button>
        </div>
        <div className="w-11/12 sm:w-9/12 lg:w-5/12 md:w-7/12">
          {articlesSelected &&
            articles &&
            articles.map((article) => {
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
                    article.userimgId
                      ? article.userimgId
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
          {authorsSelected &&
            authors &&
            authors.map((author) => {
              return (
                <UserCard
                  name={author.name}
                  email={author.email}
                  userimgId={author.userimgId}
                  id={author.id}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};
export default SearchRes;
