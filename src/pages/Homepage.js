import React from "react";

import Navbar from "../components/Navigation/navbar";
import Home from "../components/Home/Homepage";
import { useLocation, useNavigate } from "react-router-dom";

const Mainpage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  console.log(search);

  React.useEffect(() => {
    if (search === "") {
      navigate("/all?page=1&sort=latest");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <Home />
    </>
  );
};

export default Mainpage;
