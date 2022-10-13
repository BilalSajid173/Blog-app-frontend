const Addtags = (props) => {
  return (
    <>
      <button
        disabled={props.enteredTag === ""}
        type="button"
        className="rounded-sm w-[24%] ml-[1%] p-2 bg-blue-400 hover:bg-blue-500 disabled:hover:bg-blue-400 disabled:opacity-70 disabled:cursor-not-allowed dark:bg-slate-600  dark:hover:bg-slate-700"
        onClick={props.addTagHandler}
      >
        Add
      </button>
      <div className="flex flex-wrap mt-1">
        {props.tags.map((tag) => {
          return (
            <div className="rounded flex justify-center flex-wrap p-2 bg-red-200 m-1 ml-0 dark:bg-neutral-400 dark:text-black">
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
