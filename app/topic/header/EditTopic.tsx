import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { editTopicAsync } from '../topicSlice.tsx';
import { Topic } from "../../app.d.ts";

export default function EditTopic(props: {data: any, onClose: () => void}) {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.data.topic.name != null) {
      setName(props.data.topic.name);
    }
    
  }, []);

  function onChangeName(event) {
    setName(event.target.value);
  }

  function onSubmit(event) {
    event.preventDefault();

    console.log("onsubmit");

    dispatch(editTopicAsync(name, props.data.topic.id));
    props.onClose();
  }

  return (
    <>
      <div className="popup-window-header">
        <span className="popup-window-header-title">{props.data.topic.name}</span>
      </div>
      <div className="popup-window-body">
        <form onSubmit={onSubmit}>
          <div className="form-block">
            <input type="text" className="form-text" value={name} onChange={onChangeName} />
          </div>
          <div className="form-block">
            <input type="submit" className="button" value="Save" />
            <input type="button" className="button" value="Cancel" onClick={props.onClose} />
          </div>
        </form>
      </div>
      <div className="popup-window-buttons">
      </div>
    </>  
  )
}