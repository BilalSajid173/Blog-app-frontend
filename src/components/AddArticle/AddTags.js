const Addtags = (props) => {
  return (
    <>
      <button
        disabled={props.enteredTag === ""}
        type="button"
        className="rounded-md w-[24%] ml-[1%] p-2 border-2 border-blue-600 hover:text-white hover:bg-blue-600 disabled:cursor-not-allowed "
        onClick={props.addTagHandler}
      >
        Add
      </button>
      <div className="flex flex-wrap mt-1">
        {props.tags.map((tag) => {
          return (
            <div className="rounded flex justify-center flex-wrap p-2 bg-gray-300 m-1 ml-0 dark:bg-blue-400 dark:text-black">
              <span className="mr-2">{tag}</span>
              <i
                onClick={props.removeTagHandler.bind(null, tag)}
                className="pt-1 fa-solid fa-xmark cursor-pointer"
              ></i>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Addtags;
