import classes from "./UserProfile.module.css";
import { useSelector } from "react-redux";
import LeftCard from "./LeftCard";
import DataField from "./DataField";

const UserProfile = (props) => {
  const isDark = useSelector((state) => state.mode.isDark);
  return (
    <>
      <div className="flex flex-wrap justify-center px-4 py-10 sm:p-10 ">
        <LeftCard />
        <div className="w-full md:w-10/12 lg:w-7/12 lg:ml-6 bg-gray-200 dark:bg-gray-900 rounded-md p-4 sm:p-6 py-8 dark:text-white shadow-lg">
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
                <DataField title="Email" value="bsajid173@gmail.com" />
                <DataField title="Address" value="Where Do you live?" />
                <DataField title="Age" value="How old are you?" />
              </div>
              <div className="p-4 w-full mt-4 md:mt-0 md:w-[48%] rounded-md dark:bg-[#201d36] shadow-lg bg-gray-300">
                <DataField title="Education" value="Jamia Millia Islamia" />
                <DataField title="Number" value="Add a number." />
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
