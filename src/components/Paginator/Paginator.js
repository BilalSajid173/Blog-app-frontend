import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useSelector } from "react-redux";
import "./Paginator.css";

const Content = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  const totalPosts = useSelector((state) => state.posts.totalPosts);
  const tag = query.get("tag");
  const sort = query.get("sort")
  let renderStuff;
  renderStuff = (
    <Pagination
      page={page}
      count={totalPosts / 5}
      size="large"
      renderItem={(item) => (
        <PaginationItem
          sx={{
            boxShadow: 5,
          }}
          component={Link}
          to={`/all?${
            item.page === 1
              ? `page=1&sort=${sort}${tag ? `&tag=${tag}` : ""}`
              : `page=${item.page}&sort=${sort}${tag ? `&tag=${tag}` : ""}`
          }`}
          {...item}
        />
      )}
    />
  );
  return renderStuff;
};

export default Content;
