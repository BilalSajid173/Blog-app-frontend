import classes from "./UserProfile.module.css";
import { useSelector } from "react-redux";
import LeftCard from "./LeftCard";

const UserProfile = (props) => {
  const isDark = useSelector((state) => state.mode.isDark);
  return (
    <>
      <div className="flex flex-wrap justify-center px-4 py-10 sm:p-10 ">
        <LeftCard />
        <div className="w-full md:w-10/12 lg:w-7/12 md:ml-6 bg-gray-200 dark:bg-gray-900 rounded-md p-4 sm:p-6 py-8 dark:text-white shadow-lg">
          <div className="dark:text-gray-400">
            <div
              className={`${
                isDark
                  ? classes["top-div-gradient"]
                  : classes["top-div-gradient-light"]
              } p-4 mb-2 rounded-md dark:bg-[#201d36] shadow-lg bg-blue-300`}
            >
              <h1 className="font-bold text-lg">BIO</h1>
              <p className="pt-1 font-semibold font-['Nunito Sans']">
                Tell others about yourself!
              </p>

              <h1 className="font-bold text-lg mt-4">Experience</h1>
              <p className="pt-1 font-semibold font-['Nunito Sans']">
                What is your experience??
              </p>
            </div>
            <div className="flex flex-wrap mt-2 pt-2 justify-between">
              <div className=" only:grow p-4 w-full md:w-[48%] dark:bg-[#201d36] rounded-md shadow-lg bg-gray-300">
                <div className="mt-2">
                  <h1 className="font-bold">Email</h1>
                  <span>bsajid173@gmail.com</span>
                </div>
                <div className="mt-2">
                  <h1 className="font-bold">Address</h1>
                  <span>Where do you live?</span>
                </div>
                <div className="mt-2">
                  <h1 className="font-bold">Age</h1>
                  <span>How old are you?</span>
                </div>
              </div>
              <div className="p-4 w-full mt-4 md:mt-0 md:w-[48%] rounded-md dark:bg-[#201d36] shadow-lg bg-gray-300">
                <div className="mt-2">
                  <h1 className="font-bold">Education</h1>
                  <span>Jamia Millia Islamia</span>
                </div>
                <div className="mt-2">
                  <h1 className="font-bold">Number</h1>
                  <span>Add a number!</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap justify-center">
            <h1 className="font-bold text-2xl">Your Posts</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
