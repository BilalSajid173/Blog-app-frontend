import { useSelector, useDispatch } from "react-redux";
import EditProfileModal from "../UI/EditProfileModal/EditProfileModal";
import { useEffect } from "react";
import useHttp from "../../hooks/use-http";
import Article from "../Article/Article";
import { savedPostsActions } from "../../store/savedposts";

const GetSavedPosts = (props) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const { sendRequest } = useHttp();
  const user = useSelector((state) => state.auth.user);
  const likedPosts = useSelector((state) => state.auth.likedPosts);
  const savedPosts = useSelector((state) => state.auth.savedPosts);
  const articles = useSelector((state) => state.savedPosts.posts);

  useEffect(() => {
    const responseHandler = (data) => {
      let likedposts = likedPosts ? likedPosts : [];
      let savedposts = savedPosts ? savedPosts : [];
      const posts = data.savedPosts.map((post) => {
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
      dispatch(savedPostsActions.saveposts({ posts: posts }));
    };
    sendRequest(
      {
        url: "http://localhost:8000/api/user/getsavedposts/",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      },
      responseHandler
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendRequest, token, user.id]);

  const SavedPostsModalContent = (
    <div className="w-full mt-2 dark:text-white p-2">
      {articles &&
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
              userimgId={article.userimgId}
              imageId={article.imageId}
              authorId={article.authorId}
              id={article.id}
              isLiked={article.isLiked}
              isSaved={article.isSaved}
            />
          );
        })}
      {articles && articles.length === 0 && (
        <h1 className="font-bold text-lg text-center">No Saved Articles</h1>
      )}
    </div>
  );

  return (
    <EditProfileModal onClose={props.onClick}>
      {SavedPostsModalContent}
    </EditProfileModal>
  );
};
export default GetSavedPosts;
