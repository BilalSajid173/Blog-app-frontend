import { Tooltip } from "@mui/material";
import { Fragment, useEffect } from "react";
import AuthInfo from "./AuthorInfo";
import useHttp from "../../hooks/use-http";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/topusers";
import { BASE_URL } from "../../lib/apiurl";
import { Image } from "cloudinary-react";

const TopAuths = (props) => {
  const { sendRequest: fetchUsers } = useHttp();
  const authors = useSelector((state) => state.users.topusers);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const compareFn = (a, b) => {
      var x = a.followers.length + a.products.reduce(getSum, 0);
      var y = b.followers.length + b.products.reduce(getSum, 0);
      return y - x;
    };

    const getSum = (total, itr) => {
      return total + itr.commentCount + itr.likesCount;
    };
    const fetchUsersHandler = (data) => {
      data.sort(compareFn);
      const writers = data.slice(0, 3).map((writer) => {
        return {
          name: writer.name,
          education: writer.education,
          address: writer.address,
          email: writer.email,
          exp: writer.experience,
          userImgId: writer.profilePic,
          fb: writer.facebook,
          twitter: writer.twitter,
          linkedIn: writer.linkedIn,
          id: writer.id,
        };
      });
      dispatch(userActions.savetopusers({ topusers: writers }));
    };
    // console.log(authors);
    if (!authors) {
      fetchUsers(
        {
          url: BASE_URL + "api/user/all/",
          headers: {
            "Content-Type": "application/json",
          },
        },
        fetchUsersHandler
      );
    }
  }, [fetchUsers, dispatch, authors]);
  return (
    <Fragment>
      {authors &&
        authors.map((author) => {
          return (
            <Tooltip
              key={author.id}
              componentsProps={{
                tooltip: {
                  sx: {
                    padding: "0",
                    bgcolor: "#A5F1E9",
                    minWidth: "25rem",
                    borderRadius: "50px",
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
                  facebook={author.fb}
                  twitter={author.twitter}
                  linkedIn={author.linkedIn}
                  userImgId={author.userImgId}
                />
              }
              classes={{ tooltip: "dark:bg-gray-600" }}
              placement="left"
            >
              <Link
                to={`${
                  user && user.id === author.id
                    ? "/profile"
                    : `/userprofile/${author.id}`
                }`}
              >
                <div className="cursor-pointer flex flex-wrap items-center rounded-sm p-2 my-1 bg-slate-200 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500">
                  {/* <Avatar className="mr-2 bg-white" src={author.userImgId} /> */}
                  <div className="rounded-full h-12 w-12 mr-2">
                    {/* <img src={image} className="" alt="img"></img> */}
                    <Image
                      className="rounded-full"
                      cloudName="dntn0wocu"
                      publicId={author.userImgId}
                      width="50"
                      height="50"
                      crop="scale"
                    />
                  </div>

                  <h2>{author.name}</h2>
                </div>
              </Link>
            </Tooltip>
          );
        })}
    </Fragment>
  );
};

export default TopAuths;
