import { Fragment, useEffect } from "react";
import Article from "./Article";
import useHttp from "../../hooks/use-http";
import Loader from "../UI/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { postsActions } from "../../store/allposts";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../../lib/apiurl";

const AllArticles = () => {
  const { isLoading, sendRequest: fetchArticles } = useHttp();
  const articles = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const tag = query.get("tag");
  const sort = query.get("sort");
  const page = query.get("page");
  // const user = useSelector((state) => state.auth.user);
  const likedPosts = useSelector((state) => state.auth.likedPosts);
  const savedPosts = useSelector((state) => state.auth.savedPosts);
  useEffect(() => {
    const autoLoginHandler = (data) => {
      let likedposts = likedPosts ? likedPosts : [];
      let savedposts = savedPosts ? savedPosts : [];
      const posts = data.data.map((post) => {
        return {
          isLiked: likedposts.includes(post.id) ? true : false,
          isSaved: savedposts.includes(post.id) ? true : false,
          id: post.id,
          name: post.user.name,
          content: post.content,
          createdAt: post.created_at,
          authorId: post.user.id,
          title: post.title,
          imageId: post.imageId,
          userimgId: post.user.profilePic
            ? post.user.profilePic
            : "chat-app/noynwdkfnsyt33lrsyld",
          commentsCount: post.commentCount,
          likesCount: post.likesCount,
          tags: post.tags.split(", "),
        };
      });
      dispatch(
        postsActions.saveallposts({ posts: posts, totalPosts: data.totalPosts })
      );
      return;
    };
    if (location.search !== "") {
      fetchArticles(
        {
          url: tag
            ? BASE_URL +
              "api/products/filter/?page=" +
              page +
              "&sort=" +
              sort +
              "&tag=" +
              tag
            : BASE_URL + "api/products/filter/?page=" + page + "&sort=" + sort,
          headers: {
            "Content-Type": "application/json",
          },
        },
        autoLoginHandler
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchArticles, dispatch, location.search]);
  return (
    <Fragment>
      {isLoading && (
        <div className="w-full h-full flex justify-center items-center absolute">
          <Loader />
        </div>
      )}
      {!isLoading && articles && articles.length === 0 && (
        <h1 className="font-bold my-28 text-2xl dark:text-white text-center">
          No posts found!!
        </h1>
      )}
      {!isLoading &&
        articles &&
        articles.map((article) => {
          return (
            <Article
              key={article.id}
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
    </Fragment>
  );
};

export default AllArticles;
