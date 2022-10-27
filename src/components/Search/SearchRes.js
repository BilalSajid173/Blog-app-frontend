import { useLocation } from "react-router-dom";

const SearchRes = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const q = query.get("query");
  console.log(q);
  return;
};
export default SearchRes;
