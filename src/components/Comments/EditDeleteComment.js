import { useState } from "react";
// import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const EditDeleteComment = (props) => {
  const isDark = useSelector((state) => state.mode.isDark);
  const [anchorEl, setAnchorEl] = useState(null);
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
        <MenuItem onClick={handleClose}>
          <EditIcon className="mr-2" /> Edit
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <DeleteIcon className="mr-2" />
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

export default EditDeleteComment;
