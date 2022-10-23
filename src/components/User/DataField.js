import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import EditField from "./EditField";

const DataField = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const editHandler = () => {
    setIsEditing(true);
  };
  const closeEdit = () => {
    setIsEditing(false);
  };
  return (
    <>
      {!isEditing && (
        <div className="mt-2 group">
          <div className="flex flex-wrap">
            <h1 className="font-bold mr-auto">{props.title}</h1>
            <span className="invisible group-hover:visible cursor-pointer">
              <EditIcon fontSize="small" onClick={editHandler} />
            </span>
          </div>
          <span>{props.value}</span>
        </div>
      )}
      {isEditing && (
        <EditField cross={closeEdit} title={props.title} value={props.value} />
      )}
    </>
  );
};

export default DataField;
