import {useContext, useState} from "react";

import EnvContext from "../../data/EnvContext.tsx";
import Popup from "../../../popup/Popup.tsx";
import AddEdit from "../../popup/AddEdit.tsx";
import AddEditRecap from "../../popup/AddEditRecap.tsx";
import Delete from "../../popup/Delete.tsx";
import { KMap, MapControlData } from "../../../app.d.ts";

export default function Controls({map, isRecap, isRecapHeader} : 
                        {map: KMap, isRecap?: boolean, isRecapHeader?: boolean}) {
  const env = useContext(EnvContext);
  
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const showAddButton = true; // always show
  const showEditButton = isRecapHeader === true ? false : true;
  const showDeleteButton = map.isRoot || isRecapHeader ? false : true;

  const buttonCSSClass = "mapControls-button" + (isRecap ? " mBig" : "");
  //const buttonCSSClass = "mapControls-button";

  if (env === "user") {
    return null;
  }

  function onShowAdd() {
    setShowAdd(true);
  }

  function onCloseAdd() {
    setShowAdd(false);
  }

  function onShowEdit() {
    setShowEdit(true);
  }

  function onCloseEdit() {
    setShowEdit(false);
  }    

  function onShowDelete() {
    setShowDelete(true);
  }

  function onCloseDelete() {
    setShowDelete(false);
  }

  const addData: MapControlData = {
    map: map,
    type: "add"
  };

  const editData: MapControlData = {
    map: map,
    type: "edit"
  };

  const deleteData: MapControlData = {
    map: map,
    type: "delete"
  }; 

  const addEditComponent = isRecap ? AddEditRecap : AddEdit;

  return (
    <div className="mapControls">

      {showAddButton &&
        <div className="mapControls-buttonWrapper">
          <button className={buttonCSSClass} onClick={onShowAdd}>Add</button>
          <Popup 
            show={showAdd} 
            onClose={onCloseAdd} 
            contents={addEditComponent} 
            data={addData} 
            isRecap={isRecap}
            cssClass="mBig" 
          />
        </div>
      }    

      {showEditButton && 
        <div className="mapControls-buttonWrapper">
          <button className={buttonCSSClass} onClick={onShowEdit}>Edit</button>
          <Popup 
            show={showEdit} 
            onClose={onCloseEdit} 
            contents={addEditComponent} 
            data={editData}
            isRecap={isRecap} 
            cssClass="mBig" 
          />
        </div>
      }

      {showDeleteButton && 
        <div className="mapControls-buttonWrapper">
          <button className={buttonCSSClass} onClick={onShowDelete}>Delete</button>
          <Popup
            show={showDelete} 
            onClose={onCloseDelete} 
            contents={Delete} 
            data={deleteData}
            isRecap={isRecap} 
          />
        </div>
      }
    </div>    
  )
}