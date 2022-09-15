import { Fragment, useContext, useState } from "react";
import LoginModal from "../SignUp&Login/LoginModal";
import DarkContext from "../../store/darkmode-context";
const Navbar = () => {
  const Darkctx = useContext(DarkContext);
  const [isLogin, setIsLogin] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const loginHandler = () => {
    setOpenLoginModal((prev) => {
      return !prev;
    });
    setIsLogin((prev) => {
      return !prev;
    });
  };

  const LoginCloseHandler = () => {
    setOpenLoginModal((prev) => {
      return !prev;
    });
  };

  const logoutHandler = () => {
    setIsLogin((prev) => {
      return !prev;
    });
  };

  const darkModeHandler = () => {
    Darkctx.changeMode();
    setIsDark((prev) => {
      if (prev) {
        document.body.classList.remove("bg-gray-800");
        document.documentElement.classList.remove("dark");
      } else {
        document.body.classList.add("bg-gray-800");
        document.documentElement.classList.add("dark");
      }
      return !prev;
    });
  };

  const showMenuHandler = () => {
    setShowMenu((prev) => {
      return !prev;
    });
  };
  return (
    <Fragment>
      <LoginModal open={openLoginModal} handleClose={LoginCloseHandler} />
      <div className="flex flex-wrap items-center p-2 pl-6 pr-6 sm:pl-8 sm:pr-8 lg:pl-12 lg:pr-12 bg-white border-b border-b-gray-200 shadow dark:bg-gray-900 dark:border-none dark:shadow-slate-600 dark:shadow-sm">
        <div className="w-fit font-serif text-3xl font-black mr-4 dark:text-white">
          BLOGIFY
        </div>
        <div className="hidden md:flex w-3/12 p-1 pl-2 pr-2 border border-gray-400 rounded mr-auto dark:border-gray-700">
          <form className="w-full flex flex-wrap flex-row justify-between">
            <input
              className="w-11/12 pl-1 rounded focus:border-none focus:outline-none dark:bg-gray-900 dark:text-white"
              placeholder="Search..."
            />
            <button className="w-1/12" type="submit">
              <i className="dark:text-white fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
        <div className="hidden md:flex w-fit px-2 flex-wrap justify-center align-middle dark:text-white">
          <button onClick={darkModeHandler} className="mr-4">
            {!isDark && <i className="fa-solid fa-sun"></i>}
            {isDark && <i className="fa-regular fa-moon dark:text-white"></i>}
          </button>
          <button className="transition-all duration-300 px-2 py-1 hover:bg-blue-600 hover:text-white">
            About
          </button>
          {!isLogin && (
            <button
              onClick={loginHandler}
              className="transition-all duration-300 mr-2 px-2 py-1 hover:bg-blue-600 hover:text-white"
            >
              Login
            </button>
          )}
          {!isLogin && (
            <button className="transition-all duration-300 px-2 py-1 border border-blue-700 hover:bg-blue-600 hover:text-gray-100">
              Create Account
            </button>
          )}
          {isLogin && (
            <button className="transition-all duration-300 px-2 py-1 hover:bg-blue-600 hover:text-white">
              New
            </button>
          )}
          {isLogin && (
            <button
              onClick={logoutHandler}
              className="transition-all duration-300 mr-2 px-2 py-1 hover:bg-blue-600 hover:text-white"
            >
              Sign Out
            </button>
          )}
          {isLogin && (
            <button className="p-1.5 px-3 bg-slate-300 rounded-3xl">
              <i className="dark:text-black fa-regular fa-user"></i>
            </button>
          )}
        </div>
        <div className="md:hidden flex w-fit flex-wrap ml-auto justify-center align-middle dark:text-white">
          <button onClick={darkModeHandler}>
            {!isDark && <i className="p-1 mr-4 fa-solid fa-sun"></i>}
            {isDark && (
              <i className="p-1 mr-4 fa-regular fa-moon dark:text-white"></i>
            )}
          </button>
          <button onClick={showMenuHandler}>
            <i className="p-1 fa-sharp fa-solid fa-bars"></i>
          </button>
        </div>
      </div>
      {showMenu && (
        <div
          onClick={showMenuHandler}
          className="fixed top-0 left-0 w-full h-screen z-20 bg-gray-500 opacity-50"
        ></div>
      )}
      <div
        className={`duration-300 ease-in-out transition-all transform ${
          showMenu ? "translate-x-0" : "translate-x-full"
        } p-2 py-3 flex flex-col w-9/12 top-0 right-0 fixed h-screen bg-white z-40 ml-auto dark:bg-gray-700 dark:text-white`}
      >
        <div className="px-2 text-right text-lg">
          <i
            onClick={showMenuHandler}
            className="cursor-pointer fa-solid fa-xmark"
          ></i>
        </div>
        {!isLogin && (
          <button
            onClick={loginHandler}
            className="transition-all duration-300 px-2 py-1 my-1 text-left hover:bg-blue-600 hover:text-white"
          >
            <i class="mr-2 p-2 fa-solid fa-arrow-right-to-bracket"></i> Login
          </button>
        )}
        {!isLogin && (
          <button className="transition-all duration-300 my-1 text-left px-2 py-1 hover:bg-blue-600 hover:text-white">
            <i class="mr-2 p-2 fa-sharp fa-solid fa-circle-plus"></i> Create
            Account
          </button>
        )}
        {isLogin && (
          <button className="transition-all duration-300 my-1 text-left px-2 py-1 hover:bg-blue-600 hover:text-white">
            <i className="mr-2 p-2 px-2.5 fa-regular fa-user"></i> Account
          </button>
        )}
        {isLogin && (
          <button className="transition-all duration-300 my-1 text-left px-2 py-1 hover:bg-blue-600 hover:text-white">
            <i class="mr-2 p-2 px-2.5 fa-solid fa-plus"></i> New Article
          </button>
        )}
        {isLogin && (
          <button
            onClick={logoutHandler}
            className="transition-all duration-300 my-1 text-left px-2 py-1 hover:bg-blue-600 hover:text-white"
          >
            <i class="mr-2 p-2 fa-solid fa-arrow-right-from-bracket"></i> Sign
            Out
          </button>
        )}
        <button className="transition-all duration-300 text-left my-1 px-2 py-1 hover:bg-blue-600 hover:text-white">
          <i class="mr-2 p-2 px-2.5 fa-solid fa-circle-info"></i>About
        </button>
      </div>
    </Fragment>
  );
};

export default Navbar;
