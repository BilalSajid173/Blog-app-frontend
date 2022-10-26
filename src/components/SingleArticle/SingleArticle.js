import { useEffect, useState } from "react";
import classes from "../User/UserProfile.module.css";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { useDispatch } from "react-redux";
import ViewComments from "../Comments/Comments";
import { commentsActions } from "../../store/comments";
import PostContent from "./PostContent";

const SingleArticle = (props) => {
  const { postId } = useParams();
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const dispatch = useDispatch();
  const [article, setArticle] = useState(null);
  //   const [author, setAuthor] = useState(null);
  const [paras, setParas] = useState(null);
  const { sendRequest } = useHttp();
  const responseHandler = (data) => {
    console.log(data);
    const post = {
      id: data.id,
      name: data.user.name,
      content: data.content,
      createdAt: data.created_at,
      category: data.category,
      authorId: data.user.id,
      title: data.title,
      imageId: data.imageId,
      userimgId: data.user.profilePic
        ? data.user.profilePic
        : "chat-app/noynwdkfnsyt33lrsyld",
      commentsCount: data.commentCount,
      likesCount: data.likesCount,
      tags: data.tags.split(", "),
    };
    setParas(post.content.split("\n"));
    setArticle(post);
  };
  useEffect(() => {
    sendRequest(
      {
        url: "http://localhost:8000/api/products/" + postId + "/",
        headers: {
          "Content-Type": "application/json",
        },
      },
      responseHandler
    );
  }, [sendRequest, postId]);

  const CommentsModalHandler = () => {
    dispatch(commentsActions.removeComments());
    setShowCommentsModal((prev) => {
      return !prev;
    });
  };

  return (
    <>
      <div className="flex flex-wrap justify-center px-4 py-10 sm:p-10">
        {showCommentsModal && (
          <ViewComments onClick={CommentsModalHandler} id={article.id} />
        )}
        <div className="w-full md:w-10/12 lg:w-7/12 lg:mr-6 bg-gray-200 dark:bg-gray-900 rounded-md p-4 sm:p-6 py-8 dark:text-white shadow-lg">
          {article && (
            <PostContent
              article={article}
              paras={paras}
              CommentsModalHandler={CommentsModalHandler}
            />
          )}
        </div>
        <div
          className={`${classes["profile-card"]} before:bg-[#9db4f4] dark:before:bg-[#4e409d] lg:h-[84vh] hidden lg:flex flex-wrap flex-col items-center bg-gray-200 dark:bg-gray-900 rounded-md lg:sticky lg:top-20 mb-6 lg:mb-0 w-full md:w-10/12 lg:w-4/12 dark:text-white p-6 py-8 shadow-lg`}
        ></div>
      </div>
    </>
  );
};

export default SingleArticle;
