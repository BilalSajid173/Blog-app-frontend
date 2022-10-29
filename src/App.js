// import logo from './logo.svg';
import "./App.css";
import Mainpage from "./pages/Homepage";
import { ToastContainer } from "react-toastify";
import { Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/UI/Scroll/ScrollToTop";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import OtherProfile from "./pages/OtherProfile";
import SinglePost from "./pages/SinglePost";
import SearchResult from "./pages/SearchPage";
function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <>
      <ScrollToTop>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/all?page=1&sort=latest" replace />}
          />
          <Route path="/all" element={<Mainpage />} />
          {isLoggedIn && <Route path="/profile" element={<Profile />}></Route>}
          {!isLoggedIn && <Route path="/profile" element={<Navigate to="/" replace />} />}
          <Route path="/userprofile/:userId" element={<OtherProfile />} />
          <Route path="/post/:postId" element={<SinglePost />} />
          <Route path="/search" element={<SearchResult />} />
        </Routes>
        <ToastContainer />
      </ScrollToTop>
    </>
  );
}

export default App;

/* <div className="App">
<header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <p>
    Edit <code>src/App.js</code> and save to reload.
  </p>
  <a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn React
  </a>
</header>
</div> */
