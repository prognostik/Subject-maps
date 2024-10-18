import { useDispatch } from "react-redux";

import { deleteTopicAsync } from '../topicSlice.tsx';

export default function DeleteTopic(props: {data: any, onClose: () => void}) {
  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(deleteTopicAsync(props.data.topic.id));
    props.onClose();
  }

  return (
    <>
      <div className="popup-window-header">
        <span className="popup-window-header-title">{props.data.topic.name}</span>
      </div>
      <div className="popup-window-body">
        <div className="popup-window-body-delete">
        Delete topic <span className="popup-window-body-delete-mapName">{props.data.topic.name}</span>?
        </div>
      </div>
      <div className="popup-window-buttons">
        <form onSubmit={onSubmit}>
          <input type="submit" className="button" value="Delete" />
          <input type="button" className="button" value="Cancel" onClick={props.onClose} />
        </form>
      </div>
    </> 
  )
}