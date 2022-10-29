import Button from "../UI/Button/Button";
import { useSearchParams, useNavigate } from "react-router-dom";

const CategoryPicker = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sortingOrderHandler = (sortingOrder) => {
    console.log(searchParams.get("sort"), searchParams.get("page"));
    const tag = searchParams.get("tag");
    console.log(tag);
    if (tag) navigate(`/all?page=1&sort=${sortingOrder}&tag=${tag}`);
    else navigate(`/all?page=1&sort=${sortingOrder}`);
  };
  return (
    <div className="mb-5">
      <Button
        disabled={searchParams.get("sort") === "latest"}
        onClick={sortingOrderHandler.bind(null, "latest")}
        className="p-1 md:p-3 py-2 bg-blue-500 text-white disabled:text-black  rounded-sm font-bold mr-1 md:mr-2 hover:bg-blue-600  mb-1 disabled:bg-gray-200 disabled:hover:bg-gray-200"
      >
        Latest
      </Button>
      <Button
        disabled={searchParams.get("sort") === "toprated"}
        onClick={sortingOrderHandler.bind(null, "toprated")}
        className="p-1 md:p-3 py-2 bg-blue-500 text-white disabled:text-black  rounded-sm font-bold mr-1 md:mr-2  hover:bg-blue-600  mb-1 disabled:bg-gray-200 disabled:hover:bg-gray-200"
      >
        Top Rated
      </Button>
      {/* <select
        className="p-1 py-2 cursor-pointer rounded-sm md:p-3 border-0 outline-none bg-blue-300 dark:bg-white font-bold hover:bg-gray-200" */}
      {/* // value={enteredCategory}
        // onChange={categoryChangeHandler} */}
      {/* >
        <option selected>--None--</option>
        <option value="Web Development">Web Development</option>
        <option value="Android Development">Android Development</option>
        <option value="Technology">Technology</option>
        <option value="ML/AI">ML/AI</option>
        <option value="Cloud Computing">Cloud Computing</option>
        <option value="BlockChain">BlockChain</option>
      </select> */}
    </div>
  );
};

export default CategoryPicker;
