import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";

const UserCard = (props) => {
  return (
    <>
      <div className="transition-all duration-300 flex flex-wrap items-center p-2 hover:shadow-sm bg-gray-100 rounded-md mb-2 dark:bg-gray-800 shadow-lg">
        <div className="rounded-full h-16 w-16 mr-2">
          <Image
            className="rounded-full"
            cloudName="dntn0wocu"
            publicId={props.userimgId}
            width="80"
            height="80"
            crop="scale"
          />
        </div>
        <div className="ml-2 mr-auto flex flex-wrap flex-col  items-start justify-start">
          <Link
            to={`/userprofile/${props.id}`}
            className="font-bold text-blue-500"
          >
            {props.name}
          </Link>
          <span>{props.email}</span>
        </div>
      </div>
    </>
  );
};

export default UserCard;
