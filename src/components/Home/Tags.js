import { useNavigate } from "react-router-dom";

const tags = [
  "#javascript",
  "#mongodb",
  "#nodejs",
  "#nextjs",
  "#typescript",
  "#Django",
  "#Python",
];

const Tags = () => {
  const navigate = useNavigate();

  const clickHandler = (tag) => {
    navigate(`/?tag=${tag.substr(1)}?page_no=1?sort=latest`);
  };
  return (
    <div className="flex flex-wrap mt-2">
      {tags.map((tag) => {
        return (
          <div
            onClick={clickHandler.bind(null, tag)}
            className="transition-all cursor-pointer rounded-sm w-fit p-2 hover:bg-blue-200 first:ml-0 dark:hover:text-black"
          >
            <span>{tag}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Tags;
