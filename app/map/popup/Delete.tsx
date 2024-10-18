import { useDispatch } from "react-redux";

import { updateMap } from '../redux/mapSlice.tsx';
import { updateMap as updateMapRecap } from '../redux/recapSlice.tsx';
import { deleteMapAsync } from '../redux/rest-api.ts';

import { MapControlData } from "../../app.d.ts";


// map is passed as "data" prop
export default function Delete({data, onClose, isRecap}:
                  {data: MapControlData, onClose: () => void, isRecap: boolean}) {
  const dispatch = useDispatch();
  const map = data.map;

  function onDelete() {
    console.log("Deleting map");

    const reducer = isRecap ? updateMapRecap : updateMap;

    dispatch(deleteMapAsync(map.id, reducer)); 
    onClose();
  }

  return (
    <>
      <div className="popup-window-header">
        <span className="popup-window-header-title">{map.name}</span>
      </div>
      <div className="popup-window-body">
        <div className="popup-window-body-delete">
        Delete map <span className="popup-window-body-delete-mapName">{map.name}</span>?
        </div>
      </div>
      <div className="popup-window-buttons">
        <button className="button" onClick={onDelete}>Delete</button>
      </div>
    </>    
  )
}

