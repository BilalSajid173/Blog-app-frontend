import React, { Fragment } from "react";
import { useState } from "react";
import ImageModal from "../UI/ProfileImageModal/ProfileImageModal";
import useCloudinary from "../../helpers/use-cloudinary";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import useHttp from "../../hooks/use-http";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../lib/apiurl";

// Blog-app/x7oeq7chbxpyp6zmhnkj -- dummy image id

const EditImage = (props) => {
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const { sendRequest: imageUpload } = useCloudinary();
  const { sendRequest: imageUploadToBackend } = useHttp();

  const uploadSuccessHandler = (data) => {
    dispatch(authActions.updateUser({ user: data }));
    props.onClick();
  };

  const uploadResponseHandler = (data) => {
    imageUploadToBackend(
      {
        url: BASE_URL + "api/user/editprofile/",
        method: "PUT",
        body: {
          profilePic: data,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      },
      uploadSuccessHandler
    );
  };

  const imageUploadHandler = () => {
    const data = new FormData();
    data.append("file", previewSource);
    data.append("upload_preset", "blogapppreset");

    imageUpload(
      {
        url: "https://api.cloudinary.com/v1_1/dntn0wocu/image/upload",
        method: "POST",
        body: data,
      },
      uploadResponseHandler
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

  const EditImageModalContent = (
    <Fragment>
      <div className="p-2 dark:text-white flex flex-wrap justify-center h-full">
        <div className="flex flex-col justify-center items-center my-2 w-full h-full">
          <input
            id="imagepick"
            type="file"
            hidden
            onChange={fileInputHandler}
            value={fileInputState}
          ></input>
          <label
            htmlFor="imagepick"
            className="p-2 px-6 mr-2 hover:text-white border-2 border-blue-500 rounded-md hover:bg-blue-500"
            type="button"
          >
            Choose Image
          </label>
          <div className="flex flex-wrap mt-3 mb-6">
            {previewSource ? (
              <img
                className="w-36 rounded-full h-36"
                src={previewSource}
                alt="preview_img"
              ></img>
            ) : (
              "No Image Selected"
            )}
          </div>
          {previewSource && (
            <div className="p-2 flex flex-wrap justify-center">
              <button
                onClick={imageUploadHandler}
                className="p-2 px-6 mr-2 hover:text-white border-2 border-blue-500 rounded-md hover:bg-blue-500"
              >
                Upload
              </button>
              <button
                onClick={props.onClick}
                className="p-2 px-6 border-2 hover:text-white border-blue-500 rounded-md hover:bg-blue-500"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );

  return (
    <ImageModal onClose={props.onClick}>{EditImageModalContent}</ImageModal>
  );
};

export default EditImage;
