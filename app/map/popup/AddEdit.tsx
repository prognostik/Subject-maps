import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { updateMap } from '../redux/mapSlice.tsx';
import { addMapAsync, editMapAsync } from '../redux/rest-api.ts';

import { 
  escape, 
  escapeCode, 
  unescapeCode, 
  addUrl, 
  removeUrl, 
  wrapCode, 
  decapitalize } from "../utils/popup.ts";
import KMap from "../data/KMap.ts";
import { MapControlData } from "../../app.d.ts";

// map is passed in the "data" prop
// data = {map: map, type: add/edit }
export default function AddEdit(props: {data: MapControlData, onClose: () => void}) {
  const isAdd = props.data.type === "add";
  const isEdit = props.data.type === "edit"; 

  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [questions, setQuestions] = useState("");
  const [importance, setImportance] = isAdd ? useState(props.data.map.importance) :
                                              useState(1);
  const [difficulty, setDifficulty] = useState(0);
  const [position, setPosition] = useState("");
  const [notabene, setNotabene] = useState(false);

  const [textLeft, setTextLeft] = useState("");
  const [isDecap, setIsDecap] = useState(false);

  const titleEl = useRef();
  const textEl = useRef();
  const questionsEl = useRef();

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
      setImportance(map.importance);
      setDifficulty(map.difficulty);
      setPosition(map.position === null ? "" : map.position);
      setNotabene(map.notabene);

      let mapText = map.text === null ? "" : map.text; 
        
      if (mapText != "") {
        mapText = unescape(mapText);
        mapText = removeUrl(mapText);

        setText(mapText);
      } 

      let mapQuestions = map.questions === null ? "" : map.questions; 
        
      if (mapText != "") {
        mapQuestions = unescape(mapQuestions);

        setQuestions(mapQuestions);
      }           
    }
  }, []);

  function onChangeName(event) {
    setName(event.target.value);
  }

  function onChangeImportance(event) {
    setImportance(event.target.value);
  }

  function onChangeDifficulty(event) {
    setDifficulty(event.target.value);
  } 

  function onChangePosition(event) {
    setPosition(event.target.value);
  } 

  function onChangeNotabene(event) {
    setNotabene(event.target.value);
  }

  function onChangeIsDecap(event) {
    setIsDecap(!isDecap);
  }

  function onChangeText(event) {
    const newText = event.target.value;

    setText(newText);
    // Function setText doesn't run immediately after it is called
    // Instead it is put in some queue
    // This results in the text variable not being updated immediately after setText() is called
    calcTextLeft(newText);
  }

  function onChangeQuestions(event) {
    const newQuestions = event.target.value;

    setQuestions(newQuestions);
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
      let mapQuestions = questions.trim();
      let positionValue = position.trim();

      if (isDecap) {
        mapName = decapitalize(mapName);
      }

      mapName = escape(mapName);

      if (mapText != null && mapText != "") {
        mapText = escape(mapText);
        mapText = escapeCode(mapText);
        mapText = addUrl(mapText)
      }

      mapQuestions = escape(mapQuestions);

      if (mapQuestions != null && mapQuestions != "") {
        mapQuestions = escape(mapQuestions);
        mapQuestions = escapeCode(mapQuestions);
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

      const isRecap = false;

      let map = new KMap(parentId, rootId, isRecap, mapName, importance, difficulty, positionValue, notabene, mapText, mapQuestions);

      console.log(map);

      dispatch(addMapAsync(map, updateMap));

      props.onClose();      
    }
  }

  function onEdit() {
    console.log("Editing map");

    let map = JSON.parse(JSON.stringify(props.data.map));

    map.name = name.trim();

    if (isDecap) {
      map.name = decapitalize(map.name);
    }    

    map.name = escape(map.name);
    map.text = text.trim();

    if (map.text != null && map.text != "") {
      map.text = escape(map.text);
      map.text = escapeCode(map.text);
      map.text = addUrl(map.text);
    }

    map.questions = questions.trim();

    if (map.questionst != null && map.questions != "") {
      map.questions = escape(map.questions);
      map.questions = escapeCode(map.questions);
    }    

    console.log("Processed text: ", map.text);
    console.log("Processed text length: ", map.text.length);

    map.importance = importance;
    map.difficulty = difficulty;
    map.position = position;
    map.notabene = notabene;

    // *************************
    // заглушка для новых полей
    // *************************    

    map.isRecap = false;
    //map.questions = null;
    //
    console.log(map)

    dispatch(editMapAsync(map, updateMap));

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

  return (
    <>
      <div className="popup-window-header">
        <span className="popup-window-header-title">{props.data.map.name}</span>
        <span className="popup-window-header-type">{props.data.type === "add" ? "- add child map" : "- edit map"}</span>
      </div>

      <div className="popup-window-body mAddEdit">

        <div className="popup-window-body-leftColumn">


            {/* Title and importance */}
            <div className="popup-window-body-settings">
              {/* Name */}
              <div className="popup-window-body-settings-control">
                <input type="text" className="popup-window-body-settings-control-title" 
                                  value={name} ref={titleEl} onChange={onChangeName} />
              </div>
              {/* Importance */}
              <div className="popup-window-body-settings-control">
                <select className="popup-window-body-settings-control-importance" value={importance} onChange={onChangeImportance}>
                  <option value={1}>Essential</option>
                  <option value={2}>Important</option>
                  <option value={3}>Good to know</option>
                  <option value={4}>Rare</option>
                </select>
              </div>                
              {/* Decap */}
              <div className="popup-window-body-settings-control">
                <span className="popup-window-body-settings-label">Decap:</span>
                <input type="checkbox" className="popup-window-body-settings-control-decap" value={isDecap} 
                  onChange={onChangeIsDecap}/>
              </div>
              {/* Text left */}
              <div className="popup-window-body-settings-control">           
                <span className="popup-window-body-settings-control-textLeft">{textLeft}</span>
              </div>                              
              
            </div>
            {/* Other settings */}
            {/*<div className="popup-window-body-settings">          

          
            </div> */}
            {/* Text */}
            <div className="popup-window-body-block">
              <textarea className="popup-textarea" value={text} onChange={onChangeText} ref={textEl}></textarea>
            </div>
            {/* Questions */}
            <div className="popup-window-body-block mQuestions">
              <textarea className="popup-textarea mQuestions" value={questions} onChange={onChangeQuestions} ref={questionsEl}></textarea>
            </div>        
        </div>

        <div className="popup-window-body-rightColumn">
          <div>
              {/* Position */}
              <div className="popup-window-body-rightColumn-block">
                <span className="popup-window-body-settings-label">Position:</span>
                <input type="text" className="popup-window-body-settings-control-position" value={position} onChange={onChangePosition}  />
              </div>
              {/* Notabene */}
              <div className="popup-window-body-rightColumn-block">
                <span className="popup-window-body-settings-label">Attention:</span>
                <select className="popup-window-body-settings-control-notabene" value={notabene} onChange={onChangeNotabene}>
                  <option value={false}>False</option>
                  <option value={true}>True</option>
                </select>
              </div>
              {/* Difficulty */}
              <div className="popup-window-body-rightColumn-block">
                <span className="popup-window-body-settings-label">Difficulty:</span>
                <select className="popup-window-body-settings-control-difficulty" value={difficulty} onChange={onChangeDifficulty}>
                  <option value={0}>Regular</option>
                  <option value={1}>Middle</option>
                  <option value={2}>Advanced</option>
                </select>
              </div>
          </div>
          <div>

              <div className="popup-window-body-rightColumn-block">
                <button className="button mMedium" onClick={wrapBig}>Code-big</button>
              </div>

              <div className="popup-window-body-rightColumn-block">
                <button className="button mMedium" onClick={wrapSmall}>Code-small</button>
              </div>
              <div className="popup-window-body-rightColumn-block">
                <button className="button mMedium" onClick={wrapB}>b</button>
              </div>    

          </div>

          <div style={{paddingBottom: "3px"}}>
            <button className="button" onClick={onSave}>Save</button>
          </div>

                                          
        </div>

      </div>

      <div className="popup-window-buttons">
        <div>
          
        </div>
        <div className="popup-window-buttons-code">

        </div>
      </div>





    </>    
  )
}