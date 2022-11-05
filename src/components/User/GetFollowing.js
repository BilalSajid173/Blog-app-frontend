import { useSelector } from "react-redux";
import EditProfileModal from "../UI/EditProfileModal/EditProfileModal";
import { useState, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import UserCard from "./UserCard";
import { BASE_URL } from "../../lib/apiurl";

const GetFollowing = (props) => {
  const token = useSelector((state) => state.auth.token);
  const { sendRequest: sendEditRequest } = useHttp();
  const user = useSelector((state) => state.auth.user);
  const [following, setFollowing] = useState(null);

  useEffect(() => {
    const responseHandler = (data) => {
      setFollowing((prev) => {
        return data.map((follower) => {
          return {
            id: follower.following_user_id,
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
        url: BASE_URL + "api/user/getfollowing/" + user.id + "/",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      },
      responseHandler
    );
  }, [sendEditRequest, token, user.id]);

  const FollowingModalContent = (
    <div className="w-full mt-2 dark:text-white p-2">
      <h1 className="font-bold mb-4 text-2xl dark:text-gray-400 mx-auto">
        Following
      </h1>
      <div>
        {following &&
          following.map((follower) => {
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
    </div>
  );

  return (
    <EditProfileModal onClose={props.onClick}>
      {FollowingModalContent}
    </EditProfileModal>
  );
};
export default GetFollowing;
