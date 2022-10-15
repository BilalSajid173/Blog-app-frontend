import Button from "../UI/Button/Button";
import { useSearchParams } from "react-router-dom";

const CategoryPicker = () => {
  const [searchParams] = useSearchParams();
  const sortingOrderHandler = () => {
    console.log(
      searchParams.get("tag"),
      searchParams.get("sort"),
      searchParams.get("page")
    );
  };
  return (
    <div className="mb-5">
      <Button
        onClick={sortingOrderHandler}
        className="p-1 md:p-3 py-2 bg-blue-300 dark:bg-white rounded-sm font-bold mr-1 md:mr-2 hover:bg-gray-200 mb-1"
      >
        Latest
      </Button>
      <Button className="p-1 md:p-3 py-2 bg-blue-300 dark:bg-white rounded-sm font-bold mr-1 md:mr-2  hover:bg-gray-200 mb-1">
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
