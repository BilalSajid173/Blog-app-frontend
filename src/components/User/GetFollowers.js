import { useSelector } from "react-redux";
import EditProfileModal from "../UI/EditProfileModal/EditProfileModal";
import { useState, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import UserCard from "./UserCard";
import Loader from "../UI/Loader/Loader";
import { BASE_URL } from "../../lib/apiurl";

const GetFollowers = (props) => {
  const token = useSelector((state) => state.auth.token);
  const { isLoading, sendRequest: sendEditRequest } = useHttp();
  const user = useSelector((state) => state.auth.user);
  const [followers, setFollowers] = useState(null);

  useEffect(() => {
    const responseHandler = (data) => {
      setFollowers((prev) => {
        return data.map((follower) => {
          return {
            id: follower.user_id,
            name: follower.userData.name,
            userimgId: follower.userData.profilePic
              ? follower.userData.profilePic
              : "chat-app/noynwdkfnsyt33lrsyld",
            email: follower.userData.email,
          };
        });
      });
    };
    sendEditRequest(
      {
        url: BASE_URL + "api/user/getfollowers/" + user.id + "/",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      },
      responseHandler
    );
  }, [sendEditRequest, token, user.id]);

  const FollowersModalContent = (
    <div className="w-full mt-2 dark:text-white p-2 h-full">
      <h1 className="font-bold mb-4 text-2xl dark:text-gray-400 mx-auto">
        Followers
      </h1>
      {isLoading && (
        <div className="flex flex-wrap justify-center">
          <Loader />
        </div>
      )}
      {!isLoading && (
        <div>
          {followers &&
            followers.map((follower) => {
              return (
                <UserCard
                  name={follower.name}
                  email={follower.email}
                  userimgId={follower.userimgId}
                  id={follower.id}
                />
              );
            })}
        </div>
      )}
    </div>
  );

  return (
    <EditProfileModal onClose={props.onClick}>
      {FollowersModalContent}
    </EditProfileModal>
  );
};
export default GetFollowers;
