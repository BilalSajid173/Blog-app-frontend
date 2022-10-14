import { Fragment, useEffect } from "react";
import Article from "./Article";
import useHttp from "../../hooks/use-http";
import Loader from "../UI/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { postsActions } from "../../store/allposts";

const AllArticles = () => {
  const { isLoading, sendRequest: fetchArticles } = useHttp();
  const articles = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    const autoLoginHandler = (data) => {
      const posts = data.map((post) => {
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
      dispatch(postsActions.saveallposts({ posts: posts }));
    };
    if (articles === null) {
      fetchArticles(
        {
          url: "http://localhost:8000/api/products/all/",
          headers: {
            "Content-Type": "application/json",
          },
        },
        autoLoginHandler
      );
    }
  }, [fetchArticles, articles, dispatch]);
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
