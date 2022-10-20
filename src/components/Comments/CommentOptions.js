import { useState } from "react";
// import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector, useDispatch } from "react-redux";
import SortIcon from "@mui/icons-material/Sort";
import { commentsActions } from "../../store/comments";

const OptionsMenu = (props) => {
  const isDark = useSelector((state) => state.mode.isDark);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const sortLatest = () => {
    dispatch(commentsActions.sortLatest());
    handleClose();
  };

  const sortTopRated = () => {
    dispatch(commentsActions.sortTopRated());
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
        <SortIcon />
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
        <MenuItem onClick={sortTopRated}>Top Rated</MenuItem>
        <MenuItem onClick={sortLatest}>Newest</MenuItem>
      </Menu>
    </div>
  );
};

export default OptionsMenu;
