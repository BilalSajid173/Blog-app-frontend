// import logo from './logo.svg';
import "./App.css";
import Mainpage from "./pages/Homepage";
import { ToastContainer } from "react-toastify";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/all?page=1&theme=black" replace />}
        />
        <Route path="/all" element={<Mainpage />} />
      </Routes>
      <ToastContainer />
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
