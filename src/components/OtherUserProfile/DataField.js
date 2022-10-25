const DataField = (props) => {
  return (
    <>
      {
        <div className="mt-2 group">
          <div className="flex flex-wrap">
            <h1 className="font-bold mr-auto">{props.title}</h1>
          </div>
          <span>{props.value}</span>
        </div>
      }
    </>
  );
};

export default DataField;
