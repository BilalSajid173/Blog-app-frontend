import { Fragment, useState } from "react";
import LoginModal from "../SignUp&Login/LoginModal";
import SignupModal from "../SignUp&Login/SignUpModal";
import SearchQueryModal from "./SearchModal";
import AddNewArticle from "../AddArticle/AddArticle";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import { modeActions } from "../../store/darkmode";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LogoutIcon from "@mui/icons-material/Logout";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isDark = useSelector((state) => state.mode.isDark);
  const [showMenu, setShowMenu] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);
  const [openArticleModal, setOpenArticleModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!isDark) {
    document.body.classList.remove("bg-gray-800");
    document.documentElement.classList.remove("dark");
  } else {
    document.body.classList.add("bg-gray-800");
    document.documentElement.classList.add("dark");
  }

  const loginModalHandler = () => {
    setOpenSignupModal((prev) => {
      return false;
    });
    setOpenLoginModal((prev) => {
      return !prev;
    });
    setShowMenu(false);
  };

  const signupModalHandler = () => {
    setOpenLoginModal((prev) => {
      return false;
    });
    setOpenSignupModal((prev) => {
      return !prev;
    });
    setShowMenu(false);
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  const darkModeHandler = () => {
    dispatch(modeActions.toggle());
  };

  const showMenuHandler = () => {
    setShowMenu((prev) => {
      return !prev;
    });
  };

  const closeNewArticleModal = () => {
    setOpenArticleModal((prev) => {
      return !prev;
    });
  };

  const openNewArticleModal = () => {
    setOpenArticleModal((prev) => {
      return !prev;
    });
    setShowMenu(false);
  };

  const searchChangeHandler = (e) => {
    setSearchQuery(e.target.value);
  };

  const searchClickHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;
    navigate(`/search?query=${searchQuery}`);
    setSearchQuery("");
  };

  const searchModalHandler = () => {
    setShowSearchModal((prev) => {
      return !prev;
    });
    setShowMenu(false);
  };

  return (
    <Fragment>
      {openArticleModal && (
        <AddNewArticle onClick={closeNewArticleModal}></AddNewArticle>
      )}
      {showSearchModal && (
        <SearchQueryModal onClick={searchModalHandler}></SearchQueryModal>
      )}
      <LoginModal
        open={openLoginModal}
        handleClose={loginModalHandler}
        signUpHandler={signupModalHandler}
      />
      <SignupModal
        open={openSignupModal}
        handleClose={signupModalHandler}
        loginHandler={loginModalHandler}
      />
      <div className="sticky top-0 z-10 flex flex-wrap items-center p-2 pl-4 pr-4 sm:pl-8 sm:pr-8 lg:pl-12 lg:pr-12 bg-white shadow-lg dark:bg-gray-900">
        <div className="w-fit font-serif text-3xl font-black mr-4 text-gray-700 dark:text-white">
          BLOGIFY
        </div>
        <div className="hidden md:flex w-3/12 p-1 pl-2 pr-2 border border-gray-300 rounded mr-auto dark:border-gray-800">
          <form className="w-full flex flex-wrap flex-row justify-between">
            <input
              onChange={searchChangeHandler}
              className="w-11/12 pl-1 rounded focus:border-none focus:outline-none dark:bg-gray-900 dark:text-white"
              placeholder="Search..."
              value={searchQuery}
            />
            <button
              onClick={searchClickHandler}
              type="submit"
              className="w-1/12"
            >
              <i className="dark:text-white fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
        <div className="hidden md:flex w-fit flex-wrap justify-center align-middle text-gray-700 dark:text-white">
          {isLoggedIn && (
            <button
              onClick={openNewArticleModal}
              className="transition-all duration-300 px-2 py-1 mr-2 rounded-sm hover:bg-blue-700 hover:text-white"
            >
              New Article
            </button>
          )}
          <button onClick={darkModeHandler} className="mr-2">
            {!isDark && <LightModeIcon />}
            {isDark && <DarkModeIcon />}
          </button>
          <Link to="/">
            <button className="transition-all duration-300 px-2 py-1">
              <HomeIcon />
            </button>
          </Link>
          {!isLoggedIn && (
            <button
              onClick={loginModalHandler}
              className="transition-all duration-300 rounded-sm mr-2 px-2 py-1 hover:bg-blue-700 hover:text-white"
            >
              Login
            </button>
          )}
          {!isLoggedIn && (
            <button
              onClick={signupModalHandler}
              className="transition-all duration-300 px-2 py-1 rounded-sm border border-blue-700 hover:bg-blue-700 hover:text-white"
            >
              Create Account
            </button>
          )}
          {isLoggedIn && (
            <Link to={`/profile`}>
              <button className="py-1 px-2">
                <AccountCircleIcon />
              </button>
            </Link>
          )}
        </div>
        <div className="md:hidden flex w-fit flex-wrap ml-auto justify-center align-middle  text-gray-700 dark:text-white">
          <button onClick={darkModeHandler} className="p-1">
            {!isDark && <LightModeIcon />}
            {isDark && <DarkModeIcon />}
          </button>
          <Link to="/">
            <button className="transition-all duration-300 px-2 mr-2 py-1">
              <HomeIcon />
            </button>
          </Link>
          <button onClick={showMenuHandler}>
            <MenuIcon />
          </button>
        </div>
      </div>
      {showMenu && (
        <div
          onClick={showMenuHandler}
          className="fixed top-0 left-0 w-full h-screen z-10 bg-gray-900 opacity-50"
        ></div>
      )}
      <div
        className={`duration-300 ease-in-out transition-all transform ${
          showMenu ? "translate-x-0" : "translate-x-full"
        } py-3 flex flex-col w-9/12 top-0 right-0 fixed h-screen bg-white z-20 ml-auto dark:bg-gray-800 text-gray-700 dark:text-white`}
      >
        <div className="px-2 text-right text-lg">
          <CloseIcon onClick={showMenuHandler} />
        </div>
        {!isLoggedIn && (
          <button
            onClick={loginModalHandler}
            className="transition-all duration-300 px-2 py-1 my-1 text-left hover:bg-blue-600 hover:text-white"
          >
            <LoginIcon className="mr-2" /> Login
          </button>
        )}
        {!isLoggedIn && (
          <button
            onClick={signupModalHandler}
            className="transition-all duration-300 my-1 text-left px-2 py-1 hover:bg-blue-600 hover:text-white"
          >
            <AddBoxIcon className="mr-2" /> Create Account
          </button>
        )}
        {isLoggedIn && (
          <Link to={`/profile`}>
            <button className="transition-all duration-300 my-1 text-left px-2 py-1 hover:bg-blue-600 hover:text-white w-full">
              <AccountCircleIcon className="mr-2" /> Account
            </button>
          </Link>
        )}
        {isLoggedIn && (
          <button
            onClick={openNewArticleModal}
            className="transition-all duration-300 my-1 text-left px-2 py-1 hover:bg-blue-600 hover:text-white"
          >
            <AddBoxIcon className="mr-2" /> New Article
          </button>
        )}
        {
          <button
            onClick={searchModalHandler}
            className="transition-all duration-300 my-1 text-left px-2 py-1 hover:bg-blue-600 hover:text-white"
          >
            <SearchIcon className="mr-2" /> Search
          </button>
        }
        {isLoggedIn && (
          <button
            onClick={logoutHandler}
            className="transition-all duration-300 my-1 text-left px-2 py-1 hover:bg-blue-600 hover:text-white"
          >
            <LogoutIcon className="mr-2" /> Sign Out
          </button>
        )}
      </div>
    </Fragment>
  );
};

export default Navbar;
