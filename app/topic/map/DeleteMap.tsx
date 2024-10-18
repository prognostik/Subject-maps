import { useDispatch } from "react-redux";

import { deleteMapAsync } from '../topicSlice.tsx';
import { KMap } from "../../app.d.ts";


export default function DeleteMap(props: {data: any, onClose: () => void}) {
  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(deleteMapAsync(props.data.map.id));

    props.onClose();
  }

  return (
    <>
      <div className="popup-window-header">
        <span className="popup-window-header-title">{props.data.map.name}</span>
      </div>
      <div className="popup-window-body">
        <div className="popup-window-body-delete">
        Delete map <span className="popup-window-body-delete-mapName">{props.data.map.name}</span>?
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