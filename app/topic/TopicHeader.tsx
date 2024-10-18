import React, { useState } from "react";

import Popup from "../popup/Popup.tsx";
import EditTopic from "./header/EditTopic.tsx";
import DeleteTopic from "./header/DeleteTopic.tsx";
import { Topic } from "../app.d.ts";

export default function TopicHeader(props: {topic: Topic}) {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const editData = {
    topic: props.topic,
    type: "edit"
  };

  const deleteData = {
    topic: props.topic,
    type: "delete"
  };  

  console.log("TopicHeader");

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
    <div className="topicPage-header">
      <div className="topicPage-header-title">
         <span className="topicPage-header-text">{props.topic && props.topic.name}</span>
      </div>
      <div className="topicPage-header-menu">
        <span className="topicPage-header-menu-control" onClick={onShowEdit}>Edit</span>
        <Popup show={showEdit} onClose={onCloseEdit} contents={EditTopic} data={editData} cssClass="mTopicPage" />

        <span className="topicPage-header-menu-control" onClick={onShowDelete}>Delete</span>
        <Popup show={showDelete} onClose={onCloseDelete} contents={DeleteTopic} data={deleteData} cssClass="mTopicPage" />
      </div>
    </div>
  )
}