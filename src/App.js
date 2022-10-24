// import logo from './logo.svg';
import "./App.css";
import Mainpage from "./pages/Homepage";
import { ToastContainer } from "react-toastify";
import { Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/UI/Scroll/ScrollToTop";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
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
          {<Route path="/profile/:userId" element={<Profile />}></Route>}
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
