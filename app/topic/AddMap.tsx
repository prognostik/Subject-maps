import { useState } from "react";
import { useDispatch } from "react-redux";

import { addRootMapAsync } from './topicSlice.tsx';

export default function AddMap(props) {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  function onChangeName(event) {
    setName(event.target.value);
  }

  function onSubmit(event) {
    event.preventDefault();

    dispatch(addRootMapAsync(name, props.topicId));

    setName("");
  }  

  return (
    <form className="form mAdd" onSubmit={onSubmit}>
      <div className="form-block">
        <input type="text" className="form-text" placeholder="New map" value={name} onChange={onChangeName} />
      </div>
      <div className="form-block">
        <input type="submit" className="button form-button" value="Add" />
      </div>
    </form>
  )
}