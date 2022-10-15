import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaginationRounded = () => {
  const totalPosts = useSelector((state) => state.posts.totalPosts);
  const [page, setPage] = React.useState(1);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const handleChange = (event, value) => {
    const tag = searchParams.get("tag");
    setPage(value);
    if (tag)
      navigate(
        `/all?page=${value}&sort=${searchParams.get("sort")}&tag=${tag}`
      );
    else {
      navigate(`/all?page=${value}&sort=${searchParams.get("sort")}`);
    }
  };
  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPosts / 20}
        variant="outlined"
        shape="rounded"
        size="large"
        onChange={handleChange}
        page={page}
      />
    </Stack>
  );
};

export default PaginationRounded;
