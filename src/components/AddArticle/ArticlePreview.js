import image from "../../Images/userimg.png";

const ArticlePreview = (props) => {
  return (
    <div className="border border-gray-300 dark:border-gray-500 flex flex-col p-3 bg-white dark:bg-[#07244C] dark:text-white my-3 first:mt-0 rounded-sm">
      <div className="flex flex-wrap justify-center mb-2">
        <div className="rounded-full h-16 w-16 flex flex-wrap bg-gray-500 dark:bg-white">
          <img src={image} className="" alt="img"></img>
        </div>
        <div className="ml-2 mr-auto flex flex-wrap flex-col items-start justify-start">
          <h2 className="font-bold">Bilal Sajid</h2>
          <span>Today</span>
        </div>
        <div>
          <span>
            <i class="fa-regular fa-star"></i>
            {/* <i class="fa-solid fa-star"></i> */}
          </span>
        </div>
      </div>
      <div className="">
        <h1 className="text-2xl font-bold mb-2">{props.title}</h1>
        <div className="flex flex-wrap mt-3 mb-3">
          {props.previewSource ? (
            <img
              className="w-full h-48"
              src={props.previewSource}
              alt="preview_img"
            ></img>
          ) : (
            "No Image Selected"
          )}
        </div>
        <div>
          {props.paragraphs.map((para) => {
            let heading = "";
            if (para[0] === "{") {
              heading = para.split("}")[0].substring(1);
              para = para.split("}")[1];
            }
            return (
              <>
                {heading !== "" && <h2 className="font-semibold">{heading}</h2>}
                <p className="mb-2">{para}</p>
              </>
            );
          })}
        </div>
        <div className="flex flex-wrap mt-2">
          {props.tags.map((tag) => {
            return (
              <div className="transition-all cursor-pointer rounded-sm w-fit p-1 mx-2 hover:bg-red-200 first:ml-0 dark:hover:text-black">
                <span>#{tag}</span>
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap mt-3">
          <div className="flex flex-wrap transition-all cursor-pointer rounded-sm w-fit mx-2 ml-0  dark:hover:text-black">
            <span className="p-1 px-2 border border-rose-400 rounded-sm  hover:bg-gray-100">
              <i class="fas mr-2 fa-light fa-message"></i> {props.comments}{" "}
              comments
            </span>
          </div>
          <div className="flex flex-wrap transition-all cursor-pointer rounded-sm w-fit mx-2  dark:hover:text-black">
            <span className="p-1 px-2 border border-rose-400 rounded-sm  hover:bg-gray-100">
              <i class="mr-2 fa-solid fa-heart"></i> {props.likes} likes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ArticlePreview