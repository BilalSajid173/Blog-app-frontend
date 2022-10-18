import react from "react";
import reactDom from "react-dom";

const Backdrop = (props) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-30 bg-gray-700 opacity-30"
      onClick={props.onClick}
    ></div>
  );
};

const ModalOverlay = (props) => {
  return (
    <div className="overflow-y-auto scrollbar fixed top-14 left-[4%] w-11/12 md:w-[30rem] md:left-[calc(50%-15rem)] h-5/6 bg-gray-200 p-2 sm:p-4 z-40 rounded-sm dark:bg-gray-900">
      {props.children}
    </div>
  );
};
const CommentsModal = (props) => {
  return (
    <react.Fragment>
      {reactDom.createPortal(
        <Backdrop onClick={props.onClose} />,
        document.getElementById("overlays")
      )}
      {reactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById("overlays")
      )}
    </react.Fragment>
  );
};

export default CommentsModal;
