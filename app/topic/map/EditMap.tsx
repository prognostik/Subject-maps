import {useState, useEffect} from "react";
import { useDispatch } from "react-redux";

import { editMapAsync } from '../topicSlice.tsx';
import { KMap } from "../../app.d.ts";

export default function EditMap(props: {data: any, onClose: () => void}) {
  const [name, setName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.data.map.name != null) {
      setName(props.data.map.name);
      setIsPublic(props.data.map.isPublic);
    }
  }, []);

  function onChangeName(event) {
    setName(event.target.value);
  }

  function onChangeIsPublic(event) {
    setIsPublic(!isPublic);
  }  

  function onSubmit(event) {
    event.preventDefault();

    dispatch(editMapAsync(name, isPublic, props.data.map.id));

    props.onClose();
  }

  return (
    <>
      <div className="popup-window-header">
        <span className="popup-window-header-title">{props.data.map.name}</span>
      </div>
      <div className="popup-window-body">
        <form onSubmit={onSubmit}>
          <div className="form-block">
            <input type="text" className="form-text" value={name} onChange={onChangeName} />
          </div>
          <div className="form-block">
            <label>Is public:</label><input type="checkbox" value={isPublic} checked={isPublic} onChange={onChangeIsPublic} />
          </div>          
          <div className="form-block">
            <input type="submit" className="button" value="Save" />
            <input type="button" className="button" value="Cancel" onClick={props.onClose} />
          </div>
        </form>
      </div>
    </>  
  )
}