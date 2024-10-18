import { useState } from "react";

import Popup from "../popup/Popup.tsx";
import EditMap from "./map/EditMap.tsx";
import DeleteMap from "./map/DeleteMap.tsx";
import { KMap } from "../app.d.ts";

export default function TopicMap(props: {map: KMap}) {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const deleteData = {
    map: props.map,
    type: "delete"
  };

  const editData = {
    map: props.map,
    type: "edit"
  };  

  console.log("TopicMap");

  function onShowEdit() {
    console.log("onShowEdit");

    setShowEdit(true);
  }

  function onShowDelete() {
    console.log("onShowDelete");

    setShowDelete(true);
  }

  function onCloseEdit() {
    setShowEdit(false);
  }

  function onCloseDelete() {
    setShowDelete(false);
  }       

  return (
    <div className="topicPageMap">
      <div className="topicPageMap-body">
        <a className="topicPageMap-body-map" href={"/map/" + props.map.id}>{props.map.name}</a>
        {props.map.isPublic ? <span className="topicPageMap-body-map-public"></span> : ""}
      </div>
      <div className="topicPageMap-menu">
        <span className="topicPageMap-menu-control" onClick={onShowEdit}>Edit</span>
        <Popup show={showEdit} onClose={onCloseEdit} contents={EditMap} data={editData} cssClass="mTopicPage" />

        <span className="topicPageMap-menu-control" onClick={onShowDelete}>Delete</span>
        <Popup show={showDelete} onClose={onCloseDelete} contents={DeleteMap} data={deleteData} cssClass="mTopicPage" />

      </div>
    </div>
  )
}