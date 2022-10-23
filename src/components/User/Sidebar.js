import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div
      className={`duration-300 ease-in-out transition-all transform ${
        props.showMenu ? "-translate-x-0" : "-translate-x-full"
      } p-2 py-3 flex flex-col w-[20rem] top-0 left-0 fixed h-screen bg-white z-20 ml-auto dark:bg-gray-700 dark:text-white`}
    >
      <div className="px-2 text-right text-lg">
        <i
          onClick={props.showMenuHandler}
          className="cursor-pointer fa-solid fa-xmark"
        ></i>
      </div>
      {!isLoggedIn && (
        <button
          //   onClick={loginModalHandler}
          className="transition-all duration-300 px-2 py-1 my-1 text-left hover:bg-blue-600 hover:text-white"
        >
          <i class="mr-2 p-2 fa-solid fa-arrow-right-to-bracket"></i> Login
        </button>
      )}
      {!isLoggedIn && (
        <button
          //   onClick={signupModalHandler}
          className="transition-all duration-300 my-1 text-left px-2 py-1 hover:bg-blue-600 hover:text-white"
        >
          <i class="mr-2 p-2 fa-sharp fa-solid fa-circle-plus"></i> Create
          Account
        </button>
      )}
      {isLoggedIn && (
        <Link to="/profile">
          <button className="transition-all duration-300 my-1 text-left px-2 py-1 hover:bg-blue-600 hover:text-white w-full">
            <i className="mr-2 p-2 px-2.5 fa-regular fa-user"></i> Account
          </button>
        </Link>
      )}
      {isLoggedIn && (
        <button
          //   onClick={openNewArticleModal}
          className="transition-all duration-300 my-1 text-left px-2 py-1 hover:bg-blue-600 hover:text-white"
        >
          <i class="mr-2 p-2 px-2.5 fa-solid fa-plus"></i> New Article
        </button>
      )}
      {isLoggedIn && (
        <button
          //   onClick={logoutHandler}
          className="transition-all duration-300 my-1 text-left px-2 py-1 hover:bg-blue-600 hover:text-white"
        >
          <i class="mr-2 p-2 fa-solid fa-arrow-right-from-bracket"></i> Sign Out
        </button>
      )}
      <button className="transition-all duration-300 text-left my-1 px-2 py-1 hover:bg-blue-600 hover:text-white">
        <i class="mr-2 p-2 px-2.5 fa-solid fa-circle-info"></i>About
      </button>
    </div>
  );
};

export default Sidebar;
