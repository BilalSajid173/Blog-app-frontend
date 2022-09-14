import { Avatar, Tooltip } from "@mui/material";
import { Fragment } from "react";
import image from "../../Images/userimg.png";
import AuthInfo from "./AuthorInfo";
// import makeStyles from "@mui/core/styles";
// const useStyles = makeStyles((theme) => ({
//   customWidth: {
//     maxWidth: 500,
//   },
// }));
const TopAuths = (props) => {
  //   const classes = useStyles();
  return (
    <Fragment>
      {props.authors.map((author) => {
        return (
          <Tooltip
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "#A5F1E9",
                  minWidth: "25rem",
                },
              },
            }}
            title={<AuthInfo />}
            classes={{ tooltip: "dark:bg-gray-600" }}
            placement="left"
          >
            <div className="cursor-pointer flex flex-wrap items-center rounded-sm p-2 my-1 bg-slate-200 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500">
              <Avatar className="mr-2 bg-white" src={image} />
              <h2>{author.name}</h2>
            </div>
          </Tooltip>
        );
      })}
    </Fragment>
  );
};

export default TopAuths;
