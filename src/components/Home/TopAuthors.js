import { Avatar, Tooltip } from "@mui/material";
import { Fragment } from "react";
import image from "../../Images/userimg.png";
import AuthInfo from "./AuthorInfo";
const TopAuths = (props) => {
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
            title={
              <AuthInfo
                name={author.name}
                edu={author.education}
                address={author.address}
                exp={author.exp}
                email={author.email}
              />
            }
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
