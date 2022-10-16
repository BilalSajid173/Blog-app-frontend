// import * as React from "react";
// import classes from "./Paginator.module.css";
// import { useSelector } from "react-redux";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { useEffect } from "react";

// const Paginate = () => {
//   const [searchParams] = useSearchParams();
//   const [currentPage, setCurrentPage] = React.useState(searchParams.get("page"));
//   const navigate = useNavigate();
//   const totalPosts = useSelector((state) => state.posts.totalPosts);

//   useEffect(() => {
//     console.log(searchParams.get("page"));
//   }, [searchParams]);
//   let maxPages = totalPosts / 5;
//   let items = [];
//   let leftSide = currentPage - 2;
//   if (leftSide <= 0) leftSide = 1;
//   let rightSide = currentPage + 2;
//   if (rightSide > maxPages) rightSide = maxPages;
//   if (leftSide === 1) rightSide = 5;
//   if (rightSide === maxPages) leftSide = maxPages - 4;

//   for (let number = leftSide; number <= rightSide; number++) {
//     items.push(
//       <div
//         key={number}
//         className={
//           number === currentPage
//             ? `${classes["round-effect"]} ${classes.active}`
//             : classes["round-effect"]
//         }
//         onClick={() => {
//           navigate(`/all?page=${number}&sort=${searchParams.get("sort")}`);
//           setCurrentPage(number);
//         }}
//       >
//         {number}
//       </div>
//     );
//   }
//   const nextPage = () => {
//     if (currentPage < maxPages) {
//       navigate(`/all?page=${currentPage + 1}&sort=${searchParams.get("sort")}`);
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       navigate(`/all?page=${currentPage - 1}&sort=${searchParams.get("sort")}`);
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const paginationRender = (
//     <div className={classes["flex-container"]}>
//       <div className={classes["paginate-ctn"]}>
//         <div className={classes["round-effect"]} onClick={prevPage}>
//           {" "}
//           &lsaquo;{" "}
//         </div>
//         {items}
//         <div className={classes["round-effect"]} onClick={nextPage}>
//           {" "}
//           &rsaquo;{" "}
//         </div>
//       </div>
//     </div>
//   );
//   return paginationRender;
// };

// export default Paginate;

import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useSelector } from "react-redux";

const Content = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  const totalPosts = useSelector((state) => state.posts.totalPosts);
  const tag = query.get("tag");
  const sort = query.get("sort");
  let renderStuff
  if (tag) {
    renderStuff = (
      <Pagination
        page={page}
        count={totalPosts / 5}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/all?${
              item.page === 1
                ? `page=1&sort=${sort}&tag=${tag}`
                : `page=${item.page}&sort=${sort}&tag=${tag}`
            }`}
            {...item}
          />
        )}
      />
    );
  } else {
    renderStuff = <Pagination
      page={page}
      count={totalPosts / 5}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`/all?${
            item.page === 1
              ? "page=1&sort=latest"
              : `page=${item.page}&sort=latest`
          }`}
          {...item}
        />
      )}
    />;
  }
  return renderStuff
};

export default Content;
