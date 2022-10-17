import { Fragment, useEffect } from "react";
import Article from "./Article";
import useHttp from "../../hooks/use-http";
import Loader from "../UI/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { postsActions } from "../../store/allposts";
import { useLocation } from "react-router-dom";

const AllArticles = () => {
  const { isLoading, sendRequest: fetchArticles } = useHttp();
  const articles = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const tag = query.get("tag");
  const sort = query.get("sort");
  const page = query.get("page");
  console.log(tag, sort, page);
  useEffect(() => {
    const autoLoginHandler = (data) => {
      const posts = data.data.map((post) => {
        return {
          // isLiked: likedposts.includes(post._id) ? true : false,
          // isSaved: savedposts.includes(post._id) ? true : false,
          id: post.id,
          name: post.user.name,
          content: post.content.slice(0, 150) + "...",
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
      dispatch(
        postsActions.saveallposts({ posts: posts, totalPosts: data.totalPosts })
      );
      return;
    };
    if (location.search !== "") {
      fetchArticles(
        {
          url: tag
            ? "http://localhost:8000/api/products/filter/?page=" +
              page +
              "&sort=" +
              sort +
              "&tag=" +
              tag
            : "http://localhost:8000/api/products/filter/?page=" +
              page +
              "&sort=" +
              sort,
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
      {!isLoading &&
        articles &&
        articles.map((article) => {
          return (
            <Article
              name={article.name}
              createdAt={article.createdAt}
              title={article.title}
              tags={article.tags}
              likes={article.likesCount}
              comments={article.commentsCount}
              content={article.content}
              userimgId={article.userimgId}
              imageId={article.imageId}
              authorId={article.authorId}
              id={article.id}
            />
          );
        })}
    </Fragment>
  );
};

export default AllArticles;
