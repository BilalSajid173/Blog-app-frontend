import * as React from "react";
// import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import StarIcon from '@mui/icons-material/Star';
import { useSelector } from "react-redux";

const BasicMenu = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isDark = useSelector((state) => state.mode.isDark);
  const user = useSelector((state) => state.auth.user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        <MenuItem onClick={handleClose}>
          <StarBorderIcon className="mr-2" /> Save
        </MenuItem>
        {isLoggedIn && user && user.id === props.authorId && (
          <MenuItem onClick={handleClose}>
            <EditIcon className="mr-2" /> Edit
          </MenuItem>
        )}
        {isLoggedIn && user && user.id === props.authorId && (
          <MenuItem onClick={handleClose}>
            <DeleteIcon className="mr-2" /> Delete
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default BasicMenu;
