import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setDisplayImportance, setDisplayLevels } from '../../redux/settingsSlice.tsx';
import { MapDisplaySettings } from "../../../app.d.ts";

export default function Settings(props) {
  const dispatch = useDispatch();
  const settings: MapDisplaySettings = useSelector((state) => state.settings.value);

  const [importance, setImportance] = useState(settings.displayImportance);
  const [level, setLevel] = useState(settings.displayLevels);

  // Had to add setting internal properties with useState()
  // and explicitly setting them with useEffect().
  // Otherwise, after changing default values, opening lower-level map
  // and navigating back with the back button,
  // both selects didn't go back to defaults, they displayed 
  // updated settings.
  // Adding "selected" attribute didn't help.
  useEffect(() => {
    setImportance(4);
    setLevel(2);
  }, []);

  function onChangeImportance(event) {
    setImportance(event.target.value);

    dispatch(setDisplayImportance(event.target.value));
  }

  function onChangeLevels(event) {
    setLevel(event.target.value);

    dispatch(setDisplayLevels(event.target.value));
  }  
 
  return (
    <div className="settings">
      <div className="settings-wrapper">
        <div className="settings-importance">
          <span className="settings-importance-label">
            Importance:
          </span>
          <select className="settings-importance-select" value={importance} onChange={onChangeImportance}>
            <option value={4}>All</option>
            <option value={3}>Essential, Important, Good to know</option>
            <option value={2}>Essential, Important</option>
            <option value={1}>Essential</option>
          </select>
        </div>
        <div className="settings-levels">
          <span className="settings-levels-label">
            Levels:
          </span>
          <select className="settings-levels-select" value={level} onChange={onChangeLevels}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={100}>All</option>
          </select>
        </div>
      </div>
    </div>
  )
}