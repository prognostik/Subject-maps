import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { updateMap as updateMapRecap } from '../redux/recapSlice.tsx';
import { addMapAsync, editMapAsync } from '../redux/rest-api.ts';

import { 
  escape, 
  escapeCode, 
  unescapeCode, 
  addUrl, 
  removeUrl, 
  wrapCode } 
from "../utils/popup.ts";

import KMap from "../data/KMap.ts";
import { MapControlData } from "../../app.d.ts";

// map is passed in the "data" prop
// data = {map: map, type: add/edit }
export default function AddEdit(props: {data: MapControlData, onClose: () => void}) {
  const isAdd = props.data.type === "add";
  const isEdit = props.data.type === "edit";

  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [position, setPosition] = useState("");
  // set default values
  const difficulty = 0; 
  const importance = 1;
  const notabene = false;

  const [textLeft, setTextLeft] = useState("");

  const titleEl = useRef();
  const textEl = useRef();

  const dispatch = useDispatch();

  // React will throw a warning if the value of an input is set to null
  useEffect(() => {
    if (isAdd) {
      titleEl.current.focus();
    }

    if (isEdit) {
      console.log("Editing");

      const map: KMap = props.data.map;

      setName(map.name === null ? "" : map.name);
      setPosition(map.position === null ? "" : map.position);

      let mapText = map.text === null ? "" : map.text; 
        
      if (mapText != "") {
        mapText = unescape(mapText);
        mapText = removeUrl(mapText);

        setText(mapText);
      }            
    }
  }, []);

  function onChangeName(event) {
    setName(event.target.value);
  }

  function onChangePosition(event) {
    setPosition(event.target.value);
  } 

  function onChangeText(event) {
    const newText = event.target.value;

    setText(newText);
    // Function setText doesn't run immediately after it is called
    // Instead it is put in some queue
    // This results in the text variable not being updated immediately after setText() is called
    calcTextLeft(newText);
  }

  function calcTextLeft(newText) {
    const currentTextLeft = 3000 - newText.length;

    if (currentTextLeft < 2000) {
      setTextLeft(currentTextLeft); 
    } else {
      setTextLeft(null);
    }
  }

  function onSave() {
    if (isAdd) {
      onAdd();
    } else {
      onEdit();
    }
  }

  function onAdd() {
    console.log("Adding map");

    let mapName = name.trim();
    
    // don't save data if map name is empty
    if (mapName) {
      let mapText = text.trim();
      let positionValue = position.trim();

      mapName = escape(mapName);

      if (mapText != null && mapText != "") {
        mapText = escape(mapText);
        mapText = escapeCode(mapText);
        mapText = addUrl(mapText)
      }

      if (positionValue === "") {
        positionValue = null;
      }

      let parentId = props.data.map.id;

      let rootId = props.data.map.rootId;
      // root maps don't have a parentId, in this case this param receives
      // a '0' (string with a zero for value)
      if (!rootId) {
        rootId = parentId;
      }

      // *************************
      // заглушка для новых полей
      // *************************

      const isRecap = true;
      const questions = null;

      let map = new KMap(parentId, rootId, isRecap, mapName, importance, difficulty, positionValue, notabene, mapText, questions);

      dispatch(addMapAsync(map, updateMapRecap));

      props.onClose();      
    }
  }

  function onEdit() {
    console.log("Editing map");

    let map = JSON.parse(JSON.stringify(props.data.map));

    map.name = name.trim(); 

    map.name = escape(map.name);
    map.text = text.trim();

    if (map.text != null && map.text != "") {
      map.text = escape(map.text);
      map.text = escapeCode(map.text);
      map.text = addUrl(map.text);
    }

    console.log("Processed text: ", map.text);
    console.log("Processed text length: ", map.text.length);

    // difficulty, importance, notabene, decap     

    map.importance = importance;
    map.difficulty = difficulty;
    map.position = position;
    map.notabene = notabene;

    // *************************
    // заглушка для новых полей
    // *************************    

    map.isRecap = true;
    map.questions = null;

    dispatch(editMapAsync(map, updateMapRecap));

    props.onClose();  
  }

  function wrapBig() {
    wrapCode(textEl.current, "code-big");
    // Need to update the value in React manually
    // because changing textarea'a value programmatically
    // doesn't trigger an onChange event and thus 
    // React is not notified of the change
    setText(textEl.current.value);
  }

  function wrapSmall() {
    wrapCode(textEl.current, "code-small");
    setText(textEl.current.value);
  }

  function wrapB() {
    wrapCode(textEl.current, "b");
    setText(textEl.current.value);
  }

  function wrapConcept() {
    wrapCode(textEl.current, "concept");
    setText(textEl.current.value);
  }

  function wrapTable() {
    wrapCode(textEl.current, "table");
    setText(textEl.current.value);
  }

  function wrapTableColumn() {
    wrapCode(textEl.current, "table-column");
    setText(textEl.current.value);
  }

  function wrapTableRow() {
    wrapCode(textEl.current, "table-row");
    setText(textEl.current.value);
  }

  function wrapCodeSimple() {
    wrapCode(textEl.current, "code-simple");
    setText(textEl.current.value);
  }                


  return (
    <>
      <div className="popup-window-header">
        <span className="popup-window-header-title">{props.data.map.name}</span>
        <span className="popup-window-header-type">{props.data.type === "add" ? "- add child map" : "- edit map"}</span>
      </div>
      <div className="popup-window-body">
        {/* Title and importance */}
        <div className="popup-window-body-settings">
          {/* Name */}
          <div className="popup-window-body-settings-control">
            <input type="text" className="popup-window-body-settings-control-title" 
                              value={name} ref={titleEl} onChange={onChangeName} />
          </div>

          {/* Position */}
          <div className="popup-window-body-settings-control">
            <span className="popup-window-body-settings-label">Position:</span>
            <input type="text" className="popup-window-body-settings-control-position" value={position} onChange={onChangePosition}  />
          </div>        
          {/* Text left */}
          <div className="popup-window-body-settings-control">           
            <span className="popup-window-body-settings-control-textLeft">{textLeft}</span>
          </div>                         
        </div>
        {/* Other settings */}
        {<div className="popup-window-body-settings">
           
        </div> }
        {/* Text */}
        <div className="popup-window-body-block">
          <textarea className="popup-textarea" value={text} onChange={onChangeText} ref={textEl}></textarea>
        </div>
      </div>
      <div className="popup-window-buttons">
        <div>
          <button className="button" onClick={onSave}>Save</button>
        </div>
        <div className="popup-window-buttons-code">
          <button className="button mTextareaControls" onClick={wrapBig}>Code-big</button>
          <button className="button mTextareaControls" onClick={wrapSmall}>Code-small</button>
          <button className="button mTextareaControls" onClick={wrapB}>b</button>
        </div>
      </div>
      <div className="popup-window-buttons mCloseToTop">
        <div></div>        
        <div className="popup-window-buttons-code">
          <button className="button mTextareaControls" onClick={wrapConcept}>Concept</button>
          <button className="button mTextareaControls" onClick={wrapTable}>Table</button>
          <button className="button mTextareaControls" onClick={wrapTableColumn}>Column</button>
          <button className="button mTextareaControls" onClick={wrapTableRow}>Row</button>
          <button className="button mTextareaControls" onClick={wrapCodeSimple}>Code-simple</button>
        </div>
      </div>
              
    </>    
  )
}