import react from "react";
import reactDom from "react-dom";

const Backdrop = (props) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-20 bg-gray-700 opacity-30"
      onClick={props.onClick}
    ></div>
  );
};

//make it responsive as well by using calc(50% - 2rem)
const ModalOverlay = (props) => {
  return (
    <div className="flex fixed justify-center items-center top-5 left-5 w-11/12 h-5/6 bg-white p-4 z-30 rounded-sm">
      {props.children}
    </div>
  );
};
const EditModal = (props) => {
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

export default EditModal;
