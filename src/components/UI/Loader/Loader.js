import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <>
      <div className={classes["lds-ring"]}>
        <div className="dark:border-t-white"></div>
        <div className="dark:border-t-white"></div>
        <div className="dark:border-t-white"></div>
        <div className="dark:border-t-white"></div>
      </div>
    </>
  );
};

export default Loader;
