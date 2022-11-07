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
    navigate(`/all?page=1&sort=latest&tag=${tag.substr(1)}`);
  };
  return (
    <div className="flex flex-wrap mt-2">
      {tags.map((tag) => {
        return (
          <div
            key={Math.random()}
            onClick={clickHandler.bind(null, tag)}
            className="transition-all cursor-pointer rounded-md mr-2 mb-2 w-fit p-2 border border-blue-300 hover:bg-blue-200 first:ml-0 dark:hover:text-black"
          >
            <span>{tag}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Tags;
