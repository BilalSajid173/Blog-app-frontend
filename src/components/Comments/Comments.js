import React, { Fragment, useEffect, useState } from "react";
import CommentsModal from "../UI/CommentsModal/CommentsModal";
import { useSelector, useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "@mui/icons-material/Close";
import OptionsMenu from "./CommentOptions";
import SingleComment from "./Comment";
import useHttp from "../../hooks/use-http";
import { commentsActions } from "../../store/comments";
import AddComment from "./AddComment";
import LoginModal from "../SignUp&Login/LoginModal";
import SignupModal from "../SignUp&Login/SignUpModal";

const ViewComments = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const comments = useSelector((state) => state.comments.comments);
  const likedComments = useSelector((state) => state.auth.likedComments);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);
  const dislikedComments = useSelector((state) => state.auth.dislikedComments);
  const dispatch = useDispatch();
  const { sendRequest: fetchComments } = useHttp();
  useEffect(() => {
    const commentsHandler = (data) => {
      const likedcomments = likedComments ? likedComments : [];
      const dislikedcomments = dislikedComments ? dislikedComments : [];
      const comments = data.map((comment) => {
        return {
          isLiked: likedcomments.includes(comment.id) ? true : false,
          isDisliked: dislikedcomments.includes(comment.id) ? true : false,
          id: comment.id,
          name: comment.name,
          content: comment.comment,
          createdAt: comment.created_at,
          authorId: comment.user,
          likesCount: comment.likesCount,
          dislikesCount: comment.dislikesCount,
        };
      });
      dispatch(commentsActions.addComments({ comments: comments }));
      return;
    };

    fetchComments(
      {
        url: "http://localhost:8000/api/products/getcomments/" + props.id + "/",
        headers: {
          "Content-Type": "application/json",
        },
      },
      commentsHandler
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchComments]);

  const loginModalHandler = () => {
    setOpenSignupModal((prev) => {
      return false;
    });
    setOpenLoginModal((prev) => {
      return !prev;
    });
  };

  const signupModalHandler = () => {
    setOpenLoginModal((prev) => {
      return false;
    });
    setOpenSignupModal((prev) => {
      return !prev;
    });
  };

  const CommentsModalContent = (
    <Fragment>
      <div className="p-2 dark:text-white">
        <LoginModal
          open={openLoginModal}
          handleClose={loginModalHandler}
          signUpHandler={signupModalHandler}
        />

        <SignupModal
          open={openSignupModal}
          handleClose={signupModalHandler}
          loginHandler={loginModalHandler}
        />
        <div className="flex flex-wrap justify-center">
          <span className="mr-auto">
            Comments {comments && comments.length}
          </span>
          <div className="flex flex-wrap justify-center items-center">
            <OptionsMenu className="cursor-pointer" />
            <CloseIcon
              onClick={props.onClick}
              className="cursor-pointer ml-4"
            />
          </div>
        </div>
        {!isLoggedIn && (
          <div className="flex flex-wrap justify-center mt-4">
            <button
              onClick={loginModalHandler}
              className="p-2 foont-bold text-center text-white bg-blue-500 hover:bg-blue-600 rounded-md px-4"
            >
              Log In to add a comment
            </button>
          </div>
        )}
        {isLoggedIn && <AddComment postid={props.id} />}
        <div className="mt-8">
          {comments &&
            comments.map((comment) => {
              return (
                <SingleComment
                  name={comment.name}
                  content={comment.content}
                  created_at={comment.createdAt}
                  likes={comment.likesCount}
                  dislikes={comment.dislikesCount}
                  id={comment.id}
                  isLiked={comment.isLiked}
                  isDisliked={comment.isDisliked}
                  authorId={comment.authorId}
                  postid={props.id}
                />
              );
            })}
        </div>
      </div>
    </Fragment>
  );

  return (
    <CommentsModal onClose={props.onClick}>
      {CommentsModalContent}
    </CommentsModal>
  );
};

export default ViewComments;
