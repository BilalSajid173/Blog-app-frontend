import React, { Fragment, useEffect, useState } from "react";
import AddArticleModal from "../UI/AddArticleModal/AddArticleModal";
// import useInput from "../../hooks/use-input";
// import AuthContext from "../../store/auth-context";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import useInput from "../../hooks/use-input";
import image from "../../Images/userimg.png";

const AddNewArticle = (props) => {
  const [tags, setTags] = useState([]);
  const [imageName, setImageName] = useState("No Image Selected");
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [paragraphs, setParagraphs] = useState([""]);
  const [showPreview, setShowPreview] = useState(false);
  const {
    value: enteredTitle,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    onBlurHandler: titleBlurHandler,
    isValid: titleIsValid,
    reset: resetTitle,
  } = useInput((value) => value.trim().length >= 20);

  const {
    value: enteredContent,
    hasError: contentHasError,
    valueChangeHandler: contentChangeHandler,
    onBlurHandler: contentBlurHandler,
    isValid: contentIsValid,
    reset: resetContent,
  } = useInput((value) => value.trim().length >= 20);

  //wont need to verify the category thing
  const {
    value: enteredCategory,
    //hasError: categoryHasError,
    valueChangeHandler: categoryChangeHandler,
    //onBlurHandler: categoryBlurHandler,
    //isValid: categoryIsValid,
    //reset: resetCategory,
  } = useInput((value) => value.trim() !== "");

  //disable button
  const {
    value: enteredTag,
    //hasError: tagHasError,
    valueChangeHandler: tagChangeHandler,
    //onBlurHandler: tagBlurHandler,
    //isValid: contentIsValid,
    reset: resetTag,
  } = useInput((value) => value.trim() !== "");

  const addTagHandler = () => {
    const tag = enteredTag;
    resetTag();
    if (tags.length === 5) {
      //show alert thing
      return;
    }
    setTags((prev) => {
      return prev.concat(tag);
    });
  };
  const removeTagHandler = (tag) => {
    setTags((prev) => {
      return prev.filter((curtag) => curtag !== tag);
    });
  };

  useEffect(() => {
    const setParaTimer = setTimeout(() => {
      setParagraphs((prev) => {
        console.log(prev);
        const newPars = enteredContent.split("\n");
        prev = newPars.map((par) => {
          return par.trim();
        });
        return prev;
      });
    }, 2000);

    return () => {
      clearInterval(setParaTimer);
    };
  }, [enteredContent]);

  const showPreviewHandler = () => {
    console.log(enteredContent);
    setShowPreview((prev) => {
      return !prev;
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log(enteredTitle, enteredCategory, enteredContent, tags);
  };

  const fileInputHandler = (e) => {
    const file = e.target.files[0];
    //check for image
    //console.log(file);
    const type = file.type.split("/");
    //console.log(type[1]);
    //show a choose image alert
    if (
      type[1] !== "jpeg" &&
      type[1] !== "jpg" &&
      type[1] !== "png" &&
      type[1] !== "webp"
    )
      return;
    setImageName(file.name);
    previewFile(file);
    //console.log(e.target.value);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      //console.log(reader.result);
      setPreviewSource(reader.result);
    };
  };

  const NewArticleFormContent = (
    <Fragment>
      <div className="p-2 sm:px-6 dark:text-white">
        <h1 className="font-bold font-sans text-lg mb-6">CREATE ARTICLE</h1>
        <div>
          <form onSubmit={formSubmitHandler}>
            <div className="w-full">
              <input
                className="rounded-sm p-2 w-full border-0 outline-none dark:bg-gray-800 dark:border dark:border-gray-600"
                placeholder="Enter Title (at least 20 characters)"
                type="text"
                id="title"
                autoComplete="off"
                required
                value={enteredTitle}
                onChange={titleChangeHandler}
                onBlur={titleBlurHandler}
              />
              <textarea
                rows="12"
                name="content"
                id="content"
                className="rounded-sm p-2 my-1 w-full resize-none border-0 outline-none dark:bg-gray-800 dark:border dark:border-gray-600 scrollbar"
                placeholder="Whats this about? (enclose subheadings in {}. Each subheading should be after a newline character)"
                required
                value={enteredContent}
                onChange={contentChangeHandler}
                onBlur={contentBlurHandler}
              />
              <select
                className="rounded-sm p-2 w-full border-0 outline-none dark:bg-gray-800 dark:border dark:border-gray-600"
                // value={enteredCategory}
                onChange={categoryChangeHandler}
                // onBlur={categoryBlurHandler}
              >
                <option disabled selected hidden>
                  Choose A Category for your article
                </option>
                <option value="Web Development">Web Development</option>
                <option value="Android Development">Android Development</option>
                <option value="Technology">Technology</option>
                <option value="Web Development">Web Development</option>
                <option value="Android Development">Android Development</option>
                <option value="Technology">Technology</option>
              </select>
              <div className="rounded-sm my-1 w-full border-0 outline-none">
                <input
                  className="rounded-sm p-2 w-9/12 border-0 outline-none  dark:bg-gray-800 dark:border dark:border-gray-600"
                  placeholder="Add Tags (max 5)"
                  type="text"
                  value={enteredTag}
                  onChange={tagChangeHandler}
                ></input>
                <button
                  disabled={enteredTag === ""}
                  type="button"
                  className="rounded-sm w-[24%] ml-[1%] p-2 bg-blue-400 hover:bg-blue-500 disabled:hover:bg-blue-400 disabled:opacity-70 disabled:cursor-not-allowed dark:bg-slate-600  dark:hover:bg-slate-700"
                  onClick={addTagHandler}
                >
                  Add
                </button>
                <div className="flex flex-wrap mt-1">
                  {tags.map((tag) => {
                    return (
                      <div className="rounded flex justify-center flex-wrap p-2 bg-red-200 m-1 ml-0 dark:bg-neutral-400 dark:text-black">
                        <span className="mr-2">{tag}</span>
                        <i
                          onClick={removeTagHandler.bind(null, tag)}
                          className="pt-1 fa-solid fa-xmark cursor-pointer"
                        ></i>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center my-2">
              <input
                id="imagepick"
                type="file"
                hidden
                onChange={fileInputHandler}
              ></input>
              <label
                for="imagepick"
                className="p-1 px-3 bg-blue-400 cursor-pointer rounded-sm hover:bg-blue-500 mr-3 dark:bg-slate-600  dark:hover:bg-slate-700"
                type="button"
              >
                Choose Image
              </label>
              <span>{imageName}</span>
            </div>
            <button
              className="p-1 px-3 my-3 bg-blue-400 cursor-pointer rounded-sm w-full hover:bg-blue-500 dark:bg-slate-600 dark:hover:bg-slate-700"
              type="submit"
            >
              Submit
            </button>
          </form>
          {/* <h1 className="font-bold text-2xl">Preview</h1> */}
          <button
            onClick={showPreviewHandler}
            className="p-2 bg-blue-300 rounded-sm font-semibold hover:bg-blue-400 dark:bg-gray-600  dark:hover:bg-slate-700"
          >
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
          {showPreview && (
            <div className="border border-gray-300 dark:border-gray-500 flex flex-col p-3 bg-white dark:bg-[#07244C] dark:text-white my-3 first:mt-0 rounded-sm">
              <div className="flex flex-wrap justify-center mb-2">
                {/*use cloudinary image component for image*/}
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
                <h1 className="text-2xl font-bold mb-2">{enteredTitle}</h1>
                <div className="flex flex-wrap mt-3 mb-3">
                  {previewSource ? (
                    <img
                      className="w-full h-48"
                      src={previewSource}
                      alt="preview_img"
                    ></img>
                  ) : (
                    "No Image Selected"
                  )}
                </div>
                <div>
                  {paragraphs.map((para) => {
                    let heading = "";
                    if (para[0] === "{") {
                      heading = para.split("}")[0].substring(1);
                      para = para.split("}")[1];
                    }
                    return (
                      <>
                        {heading !== "" && (
                          <h2 className="font-semibold">{heading}</h2>
                        )}
                        <p className="mb-2">{para}</p>
                      </>
                    );
                  })}
                </div>
                <div className="flex flex-wrap mt-2">
                  {tags.map((tag) => {
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
                      <i class="fas mr-2 fa-light fa-message"></i>{" "}
                      {props.comments} comments
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
          )}
        </div>
      </div>
    </Fragment>
  );

  return (
    <AddArticleModal onClose={props.onClick}>
      {NewArticleFormContent}
    </AddArticleModal>
  );
};

export default AddNewArticle;
