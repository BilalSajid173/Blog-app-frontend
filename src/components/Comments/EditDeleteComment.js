import { useState } from "react";
// import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector, useDispatch } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useHttp from "../../hooks/use-http";
import { commentsActions } from "../../store/comments";
import { postsActions } from "../../store/allposts";
import { authActions } from "../../store/auth";
import { savedPostsActions } from "../../store/savedposts";
import { searchedPostsActions } from "../../store/searchposts";
import { userPostsActions } from "../../store/profile";
import { BASE_URL } from "../../lib/apiurl";

const EditDeleteComment = (props) => {
  const isDark = useSelector((state) => state.mode.isDark);
  const { sendRequest: commentDelete } = useHttp();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteResponse = (data) => {
    dispatch(commentsActions.deleteComment({ id: props.commentId }));
    dispatch(postsActions.decreaseCommentsCount({ id: props.postid }));
    dispatch(authActions.decreaseCommentsCount({ id: props.postid }));
    dispatch(savedPostsActions.decreaseCommentsCount({ id: props.postid }));
    dispatch(searchedPostsActions.decreaseCommentsCount({ id: props.postid }));
    dispatch(userPostsActions.decreaseCommentsCount({ id: props.postid }));
    handleClose();
  };

  const commentDeleteHandler = () => {
    commentDelete(
      {
        url: BASE_URL + "api/products/deletecomment/" + props.commentId + "/",
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      },
      deleteResponse
    );
  };

  const editCommentHandler = () => {
    props.onClick();
    handleClose();
  };

  return (
    <div>
      <button
        className=""
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {/* <MoreVertIcon className="text-black" /> */}
        {/* <i class="fa-solid fa-ellipsis-vertical text-2xl"></i> */}
        <MoreVertIcon fontSize="small" />
      </button>
      <Menu
        PaperProps={{
          style: {
            background: isDark ? "#0369a1" : "#fff",
            color: isDark ? "#fff" : "#000",
          },
        }}
        disableScrollLock={true}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        classes={{ menu: "dark:bg-gray-600" }}
      >
        <MenuItem onClick={editCommentHandler}>
          <EditIcon className="mr-2" /> Edit
        </MenuItem>
        <MenuItem onClick={commentDeleteHandler}>
          <DeleteIcon className="mr-2" />
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

export default EditDeleteComment;
