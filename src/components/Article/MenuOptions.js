import { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import useHttp from "../../hooks/use-http";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authActions } from "../../store/auth";
import { savedPostsActions } from "../../store/savedposts";
import { searchedPostsActions } from "../../store/searchposts";
import AddNewArticle from "../AddArticle/AddArticle";
import { BASE_URL } from "../../lib/apiurl";

const BasicMenu = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isDark = useSelector((state) => state.mode.isDark);
  const user = useSelector((state) => state.auth.user);
  const savedPosts = useSelector((state) => state.savedPosts.posts);
  const dispatch = useDispatch();
  const [isSaved, setIsSaved] = useState(props.isSaved);
  const { sendRequest: savePost } = useHttp();
  const { sendRequest: deletePost } = useHttp();
  const token = useSelector((state) => state.auth.token);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openArticleModal, setOpenArticleModal] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    setIsSaved(props.isSaved);
  }, [props.isSaved, savedPosts]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const saveResponseHandler = (data) => {
    const like = isSaved;
    dispatch(
      authActions.updateSavedPosts({
        save: like ? false : true,
        id: props.postid,
      })
    );
    dispatch(
      savedPostsActions.deletepost({
        id: props.postid,
      })
    );
    setIsSaved((prevState) => {
      !prevState && toast.success("Post Saved");
      return !prevState;
    });
    handleClose();
  };

  const saveHandler = () => {
    if (!isLoggedIn) {
      toast.error("You must be logged in to save an article!");
      handleClose();
      return;
    }
    savePost(
      {
        url: `${BASE_URL}api/user/${
          isSaved ? `unsavepost/${props.postid}/` : `savepost/${props.postid}/`
        }`,
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
      },
      saveResponseHandler
    );
  };

  const deleteResponseHandler = (data) => {
    dispatch(authActions.deletePost({ id: props.postid }));
    dispatch(savedPostsActions.deletepost({ id: props.postid }));
    dispatch(searchedPostsActions.deletepost({ id: props.postid }));
    handleClose();
  };

  const deleteHandler = () => {
    deletePost(
      {
        url: BASE_URL + "api/products/" + props.postid + "/delete/",
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      },
      deleteResponseHandler
    );
  };

  const closeNewArticleModal = () => {
    setOpenArticleModal((prev) => {
      return !prev;
    });
  };

  const openNewArticleModal = () => {
    setOpenArticleModal((prev) => {
      return !prev;
    });
    handleClose();
  };

  return (
    <div>
      {openArticleModal && (
        <AddNewArticle
          title={props.title}
          content={props.content}
          tags={props.tags}
          onClick={closeNewArticleModal}
          postid={props.postid}
        ></AddNewArticle>
      )}
      <button
        className=""
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {/* <MoreVertIcon className="text-black" /> */}
        <i class="fa-solid fa-ellipsis-vertical text-2xl"></i>
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
        <MenuItem onClick={saveHandler}>
          {!isSaved && <StarBorderIcon className="mr-2" />}
          {isSaved && <StarIcon className="mr-2" />}
          {`${isSaved ? "Saved" : "Save"}`}
        </MenuItem>
        {isLoggedIn && user && user.id === props.authorId && (
          <MenuItem onClick={openNewArticleModal}>
            <EditIcon className="mr-2" /> Edit
          </MenuItem>
        )}
        {isLoggedIn && user && user.id === props.authorId && (
          <MenuItem onClick={deleteHandler}>
            <DeleteIcon className="mr-2" /> Delete
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default BasicMenu;
