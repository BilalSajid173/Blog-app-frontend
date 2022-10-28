import React, { Fragment, useEffect, useState } from "react";
import AddArticleModal from "../UI/AddArticleModal/AddArticleModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useInput from "../../hooks/use-input";
import useHttp from "../../hooks/use-http";
import useCloudinary from "../../helpers/use-cloudinary";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../UI/Loader/Loader1";
import ArticlePreview from "./ArticlePreview";
import Addtags from "./AddTags";
import { postsActions } from "../../store/allposts";
import { authActions } from "../../store/auth";
import { searchedPostsActions } from "../../store/searchposts";
import { savedPostsActions } from "../../store/savedposts";

const AddNewArticle = (props) => {
  const [tags, setTags] = useState(props.tags || []);
  const [imageName, setImageName] = useState("No Image Selected");
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [paragraphs, setParagraphs] = useState([""]);
  const [showPreview, setShowPreview] = useState(false);
  const { isLoading, sendRequest: createPost } = useHttp();
  const { isLoading: imageLoading, sendRequest: imageUpload } = useCloudinary();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const {
    value: enteredTitle,
    valueChangeHandler: titleChangeHandler,
    onBlurHandler: titleBlurHandler,
    isValid: titleIsValid,
    setEnteredValue: setInitialTitle,
  } = useInput((value) => value.trim().length >= 20);

  const {
    value: enteredContent,
    valueChangeHandler: contentChangeHandler,
    onBlurHandler: contentBlurHandler,
    isValid: contentIsValid,
    setEnteredValue: setInitialContent,
  } = useInput((value) => value.trim().length >= 100);

  const { value: enteredCategory, valueChangeHandler: categoryChangeHandler } =
    useInput((value) => value.trim() !== "");

  const {
    value: enteredTag,
    valueChangeHandler: tagChangeHandler,
    reset: resetTag,
  } = useInput((value) => value.trim() !== "");

  const addTagHandler = () => {
    const tag = enteredTag;
    resetTag();
    if (tags.length === 5) {
      toast.info("No more than 5 tags");
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
    setInitialTitle(props.title || "");
    setInitialContent(props.content || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const setParaTimer = setTimeout(() => {
      setParagraphs((prev) => {
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
    setShowPreview((prev) => {
      return !prev;
    });
  };

  const postCreationHandler = (data) => {
    toast.success("Article Created Successfully");
    dispatch(
      postsActions.updatepost({
        id: props.postid,
        content: enteredContent,
        title: enteredTitle,
        tags: tags,
      })
    );
    dispatch(
      authActions.updatePost({
        id: props.postid,
        content: enteredContent,
        title: enteredTitle,
        tags: tags,
      })
    );
    dispatch(
      savedPostsActions.updatePost({
        id: props.postid,
        content: enteredContent,
        title: enteredTitle,
        tags: tags,
      })
    );
    dispatch(
      searchedPostsActions.updatePost({
        id: props.postid,
        content: enteredContent,
        title: enteredTitle,
        tags: tags,
      })
    );
    props.onClick();
  };

  const uploadHandler = (data) => {
    const url =
      "http://localhost:8000/api/products/" +
      (props.postid ? props.postid + "/update/" : "");
    createPost(
      {
        url: url,
        method: props.postid ? "PUT" : "POST",
        body: {
          title: enteredTitle,
          content: enteredContent,
          category: enteredCategory,
          imageId: data,
          tags: tags.join(", "),
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      },
      postCreationHandler
    );
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!titleIsValid || !contentIsValid) {
      toast.error("Title or content is not valid!");
      return;
    }
    if (!enteredCategory) {
      toast.error("Please select a category for your article!");
      return;
    }
    if (!previewSource) {
      toast.error("Please select an image for your article!");
      return;
    }

    const data = new FormData();
    data.append("file", previewSource);
    data.append("upload_preset", "blogapppreset");

    imageUpload(
      {
        url: "https://api.cloudinary.com/v1_1/dntn0wocu/image/upload",
        method: "POST",
        body: data,
      },
      uploadHandler
    );
  };

  const fileInputHandler = (e) => {
    const file = e.target.files[0];
    const type = file.type.split("/");
    if (
      type[1] !== "jpeg" &&
      type[1] !== "jpg" &&
      type[1] !== "png" &&
      type[1] !== "webp"
    ) {
      toast.error("Selected File is not an image.");
      return;
    }
    setImageName(file.name);
    previewFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const NewArticleFormContent = (
    <Fragment>
      <div className="p-2 sm:px-6 dark:text-white">
        <h1 className="font-bold font-sans text-lg mb-6 mt-2">
          CREATE ARTICLE
        </h1>
        <div>
          <form onSubmit={formSubmitHandler}>
            <div className="w-full">
              <input
                className="transition-all duration-200 bg-gray-200 border-gray-400 rounded-sm p-2 w-full border-2 outline-none dark:bg-gray-900 mb-2 dark:border-gray-800"
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
                className="rounded-sm p-2 mb-2 w-full bg-gray-200 border-gray-400 resize-none border-2 dark:border-gray-800 outline-none dark:bg-gray-900 scrollbar"
                placeholder="Whats this about? (min. 100 characters, enclose subheadings in {})"
                required
                value={props.content || enteredContent}
                onChange={contentChangeHandler}
                onBlur={contentBlurHandler}
              />
              <select
                className="rounded-sm p-2 w-full border-2 bg-gray-200 border-gray-400 dark:border-gray-800 outline-none dark:bg-gray-900 mb-2"
                onChange={categoryChangeHandler}
              >
                <option disabled selected hidden>
                  Choose A Category for your article
                </option>
                <option value="Web Development">Web Development</option>
                <option value="Android Development">Android Development</option>
                <option value="Technology">Technology</option>
                <option value="ML/AI">ML/AI</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="BlockChain">BlockChain</option>
              </select>
              <div className="rounded-sm my-1 w-full border-0 outline-none">
                <input
                  className="rounded-sm p-2 w-9/12 border-2 bg-gray-200 border-gray-400 dark:border-gray-800 outline-none  dark:bg-gray-900"
                  placeholder="Add Tags (max 5)"
                  type="text"
                  value={enteredTag}
                  onChange={tagChangeHandler}
                ></input>
                <Addtags
                  enteredTag={enteredTag}
                  tags={tags}
                  addTagHandler={addTagHandler}
                  removeTagHandler={removeTagHandler}
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center my-2">
              <input
                id="imagepick"
                type="file"
                hidden
                onChange={fileInputHandler}
                value={fileInputState}
              ></input>
              <label
                htmlFor="imagepick"
                className="p-2 px-3 border-2 border-blue-600 hover:text-white hover:bg-blue-600 cursor-pointer rounded-md mr-3"
                type="button"
              >
                Choose Image
              </label>
              <span>{imageName}</span>
            </div>
            <div className="relative flex justify-center items-center">
              {(isLoading || imageLoading) && (
                <div className="w-full flex justify-center absolute">
                  <Loader />
                </div>
              )}
              <button
                className="p-2 px-3 my-3 border-2 border-blue-600 hover:text-white hover:bg-blue-600 cursor-pointer rounded-md w-full"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
          <button
            onClick={showPreviewHandler}
            className="p-2 border-2 border-blue-600 hover:bg-blue-600 hover:text-white rounded-md font-semibold"
          >
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
          {showPreview && (
            <ArticlePreview
              title={enteredTitle}
              paragraphs={paragraphs}
              previewSource={previewSource}
              tags={tags}
            />
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
